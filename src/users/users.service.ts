import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Like, Repository } from 'typeorm';
import * as crypto from 'crypto';
import { Friend } from 'src/friends/entities/friend.entity';
import { Post } from 'src/posts/entities/post.entity';
import { Request } from 'src/requests/entities/request.entity';

interface DictWhereConditionForFriends{
  // id: number,
  // friendId: number
  [id: string] : number,
  // [friendId: string] : number
}
@Injectable()
export class UsersService {

  constructor(
  @Inject('USER_REPOSITORY')
    private usersRepository: Repository<User>,
  ) {}

    algorithm = 'aes-256-cbc';
    key = crypto.randomBytes(32);
    iv = crypto.randomBytes(16);

encrypt(text: string): string {
    const cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);
    let encrypted = cipher.update(text, 'utf-8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

decrypt(encryptedText: string): string {
    const decipher = crypto.createDecipheriv(this.algorithm, this.key, this.iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    return decrypted;
}

  // async findAll(): Promise<User[]> {
  //   return this.userRepository.find();
  // }
  async create(createUserDto: CreateUserDto) {
    createUserDto.password = this.encrypt(createUserDto.password)
    // const user = new User({...createUserDto})
    const user = this.usersRepository.create({...createUserDto, posts: [], friends: [], requests: []})
    // const friends = new Friend({
    //   user: user
    // })
    
    const post = new Post({
      user: user
    })
    const request = new Request({
      toUser: user
    })
    const finalUser = this.usersRepository.create({...user, posts: [...user.posts, post],
      friends: [...user.friends], requests: [...user.requests, request]})
    
    return await this.usersRepository.save(finalUser);
  }

  async findAll() {
    return await this.usersRepository.find({relations: {friends: {users: true}}})//{relations: {posts: true, friends: true, requests: true }}
  }

  async findOne(id: number) {
    return await this.usersRepository.findOne({ where: {id}, relations: {friends: true }});  //,posts: true,  relations: {posts: true}}
  }

  async findUser(email: string, password: string) { //log
    return await this.usersRepository.findOne({ where: {email: email, password: password},
       relations: {friends: {users: true}},
       select: {friends: true }});//requests: {id: true, fromUser: {id: true}} 
  }


  async findUsersWithStartingNameOrSurname(startingString: string){
    const lowerLetters: string =  startingString.slice(1).toLowerCase().trim()
    const newSubstring: string = startingString.charAt(0).toUpperCase() + lowerLetters
    return await this.usersRepository.find({
      where: [
        {
          name: Like(`%${newSubstring}%`),
        },
        {
          surname: Like(`%${newSubstring}%`)
        }
      ],
      take: 10,
    })
  }

  async findAllRequestsForUserAndFromUsers(userId: number) {
    // const allRequests = await this.usersRepository.findOne({relations: {requests: true},
    //    where: {requests: {toUser: {id: userId } }, id: userId}});

    // let fromUserIds: number[] = allRequests.requests.map(req => req.fromUserId)
    // let dictWhereCondition: DictWhereConditionForFriends[] = []

    // fromUserIds.map(idFrom => dictWhereCondition.push({id: idFrom}))
    // //treba mi where request.toUser.id == userId
    
    // return await this.usersRepository.find({where: dictWhereCondition,
    //    relations: {requests: true, friends: true},
    //    select: {id: true, name: true, surname: true, picture: true, selectedSports: true,
    //      friends: {friendId: true}, requests},   })  //, requests: {id: true, toUser: {id: true}} mi ne treba
    //   //   return await this.usersRepository.find({where: {id: userId},
    //   //  relations: {requests: true, friends: true},
    //   //  select: {friends: {friendId: true}, requests: {id: true, toUser: {id: true},
    //   //     fromUser: {id: true, name: true, surname: true, picture: true, selectedSports: true, friends: {friendId: true}}}} })
  }


  // async findAllUserFriends(userId: number) {  //userd/friennd
  //   const user = await this.findOne(userId)
  //   const friendsIds: number[] = []
  //   user.friends.map(friend => friendsIds.push(friend.friendId) )
  //   let dictWhereCondition : DictWhereConditionForFriends[] = []
  //   friendsIds.map(friendId => dictWhereCondition.push({id: friendId }))
    
  //   return await this.usersRepository.find({ where: dictWhereCondition,
  //      relations: {friends: true},
  //       select: {id: true, name: true, surname: true, picture: true, selectedSports: true,
  //          friends: {friendId: true} }});  //this.decrypt(
  // }


  // async findUserFriends(userId: number) {
  //   return await this.usersRepository.find({ where: {id: userId},
  //      relations: {friends: true},
  //       select: {id: true, name: true, surname: true, picture: true, selectedSports: true, friends: {friendId: true} }});  //this.decrypt(
  // }
  // async findPostForUser(userid: number) {
  //   return await this.usersRepository.findOne({relations: {posts: true, friends: true}, where: {}});  
  // }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    if(!user){
      throw new NotFoundException();
    }
    Object.assign(user, updateUserDto)
    return await this.usersRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if(!user){
      throw new NotFoundException();
    }
    return await this.usersRepository.remove(user);
  }
}
