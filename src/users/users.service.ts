import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Like, Repository } from 'typeorm';
import * as crypto from 'crypto';
import { Friend } from 'src/friends/entities/friend.entity';
import { Post } from 'src/posts/entities/post.entity';
import { Request } from 'src/requests/entities/request.entity';
import { FriendsService } from 'src/friends/friends.service';
import { SearchUserDto } from './dto/search-user.dto';

export interface DictWhereConditionForFriends{
  [id: string] : number
}
@Injectable()
export class UsersService {

  
  constructor(
  @Inject('USER_REPOSITORY')
    private usersRepository: Repository<User>,
    @Inject(FriendsService) private friendsService: FriendsService
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

  async create(createUserDto: CreateUserDto) {
    createUserDto.password = this.encrypt(createUserDto.password)
    const user = await this.usersRepository.create({...createUserDto, posts: [], requests: [], friendships: []})
    const post = new Post({
      user: user
    })
    const request = new Request({
      toUser: user
    })
    const finalUser = this.usersRepository.create({...user, posts: [...user.posts, post], requests: [...user.requests, request], friendships: []})
    const save = await this.usersRepository.save(finalUser)
    await this.friendsService.create({friendId: save.id})
    return save;
  }

  async findOne(id: number) {
    return await this.usersRepository.findOne({ where: {id}, relations: {posts: true }});  
  }
  async findUserByid(id: number) {
    return await this.usersRepository.findOne({ where: {id},
       relations: {friendships: {friend: true}, requests: {fromUser: true}},
      select: {requests: true}});  
  }

  async findOneWithFriends(id: number) {
    return await this.usersRepository.findOne({ where: {id}, relations: {posts: true}});  
  }

  async findUser(email: string, password: string) { 
    return await this.usersRepository.findOne({ where: {email: email, password: password,
       friendships: {user: {email: email, password: password}}}, relations: {friendships: {friend: true}}});
  }

  async findUserFriendsAndTheirFriendsIds(friendsIds: SearchUserDto[]) { 
    return await this.usersRepository.find({ where: {
      friendships: {user: friendsIds}}, relations: {friendships: {friend: true}},
    select: {id: true, name: true, surname: true, picture: true, selectedSports: true, friendships: {id: true, friend: {id: true}}}});
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

  async update(updateUserDto: UpdateUserDto) {
    const user = await this.findOne(updateUserDto.id);
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
