import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFriendDto } from './dto/create-friend.dto';
import { UpdateFriendDto } from './dto/update-friend.dto';
import { Repository } from 'typeorm';
import { Friend } from './entities/friend.entity';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class FriendsService {
  constructor(
    @Inject('FRIEND_REPOSITORY')
      private friendsRepository: Repository<Friend>, private usersService: UsersService
    ) {}


  async create(createFriendDto: CreateFriendDto) {
    const user: User = await this.usersService.findOne(createFriendDto.userId)
    if(!user)
      throw NotFoundException
    const friend: User = await this.usersService.findOne(createFriendDto.friendId)
    if(!friend)
      throw NotFoundException
    const friendship = new Friend({})
    friendship.users = [user, friend]
    return await this.friendsRepository.save(friendship)
    // let friendEntity = await this.getFriendEntity(createFriendDto.friendId)
    // // console.log('friend entity')
    // // console.log(friendEntity)
    // if(!friendEntity){
    //   // console.log('friend entity inside')
    //   friendEntity = await this.getFriendEntity(createFriendDto.userId)
    //   if(!friendEntity){
    //     friendEntity = new Friend(friend)
    //     friendEntity = await this.friendsRepository.create(friendEntity)
    //     friendEntity.users = [user]
    //     await this.friendsRepository.save(friendEntity)
    //     friendEntity = new Friend(user)
    //     friendEntity = await this.friendsRepository.create(friendEntity)
    //     friendEntity.users = [friend]
    //     return await this.friendsRepository.save(friendEntity)
    //   }
    //   else{
    //     friendEntity = await this.getFriendEntity(createFriendDto.friendId)
    //     friendEntity = new Friend(friend)
    //     friendEntity = await this.friendsRepository.create(friendEntity)
    //     friendEntity.users = [user]
    //     await this.friendsRepository.save(friendEntity)
    //     friendEntity = new Friend(user)
    //     friendEntity = await this.friendsRepository.create(friendEntity)
    //     friendEntity.users = [friend]
    //     return await this.friendsRepository.save(friendEntity)
    //   }

    // }
    // let newFriendEntity: User[] = []
    // let userfriendEntity = await this.getFriendEntity(createFriendDto.userId)
    // userfriendEntity.users.push(friend)
    // await this.friendsRepository.save(userfriendEntity)
    // friendEntity.users.push(user)
    // // if(friendEntity.users.length > 0){
    //   // newFriendEntity = friendEntity.users.map(user => user)
      
    //   // newFriendEntity.push(friend)
    //   // newFriendEntity.push(user)
    // // }
    // // else{
    // //   newFriendEntity.push(friend)
    // //   newFriendEntity.push(user)
    // // }
    
    // return this.friendsRepository.save(friendEntity)
    //USERA DA UBACIM U TJ USERS IZ FRIEND ENTITY
    //FRIEND DA UBACIM U FRIENDS IZ USERS ENTITY
    
  }

  async getFriendEntity(id: number){
    return await this.friendsRepository.findOne({where: {users: {id: id}}, relations: {users: true}})
  }

  async findUsersOfFriends(userId: number) {
    return await this.friendsRepository.find({where: {users: {id: userId}}});
  }
  async findAll() {
    return await this.friendsRepository.find();
  }



  async update(updateFriendDto: UpdateFriendDto) {  //add friend  userId: number, 

  }

  async remove(userId: number, friendId: number) {

  }
}
