import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFriendDto } from './dto/create-friend.dto';
import { UpdateFriendDto } from './dto/update-friend.dto';
import { Repository } from 'typeorm';
import { Friend } from './entities/friend.entity';
import { User } from 'src/users/entities/user.entity';
// import { UsersService } from 'src/users/users.service';

@Injectable()
export class FriendsService {
  constructor(
    @Inject('FRIEND_REPOSITORY')
      private friendsRepository: Repository<Friend>
    ) {}


  async create(createFriendDto: CreateFriendDto) {
    // const user: User = await this.usersService.findOneWithFriends(createFriendDto.userId)
    // if(!user)
    //   throw NotFoundException
    // const friend: User = await this.usersService.findOneWithFriends(createFriendDto.friendId)
    // if(!friend)
    //   throw NotFoundException

    // let friendEntity: Friend = await this.getFriendEntity(createFriendDto.friendId)
    let friendEntity = new Friend()
    friendEntity.id = createFriendDto.friendId
    friendEntity.friendships = []
    // friendEntity.users = [user]
    friendEntity = this.friendsRepository.create(friendEntity)
    return await this.friendsRepository.save(friendEntity)
    // friendEntity = new Friend()
    // friendEntity.id = user.id
    // friendEntity.users = [friend]
    // friendEntity = await this.friendsRepository.create(friendEntity)
    // return this.friendsRepository.save(friendEntity)
    // if(!friendEntity){
      // friendEntity = new Friend()
      // friendEntity.id = friend.id
      // friendEntity.users = [user]
      // friendEntity = await this.friendsRepository.create(friendEntity)
      // await this.friendsRepository.save(friendEntity)
      // friendEntity = new Friend()
      // friendEntity.id = user.id
      // friendEntity.users = [friend]
      // friendEntity = await this.friendsRepository.create(friendEntity)
      // return this.friendsRepository.save(friendEntity)
    // }
    // let newFriendEntity = []
    // if(friendEntity.users.length > 0){
    //   newFriendEntity = friendEntity.users.map(user => user)
    //   newFriendEntity.push(friend)
    //   newFriendEntity.push(user)
    // }
    // else{
    //   newFriendEntity.push(friend)
    //   newFriendEntity.push(user)
    // }
    
    // return this.friendsRepository.save(newFriendEntity)
    // //USERA DA UBACIM U TJ USERS IZ FRIEND ENTITY
    // //FRIEND DA UBACIM U FRIENDS IZ USERS ENTITY
    
  }

  // async getFriendEntity(id: number){
  //   return await this.friendsRepository.findOne({where: [{users: {id: id}}, {users: {friends: {id: id}}}], relations: {users: true}})
  // }

  // async findUsersOfFriends(userId: number) {
  //   return await this.friendsRepository.find({where: {users: {id: userId}}});
  // }
  async findAll() {
    return await this.friendsRepository.find();
  }



  async update(updateFriendDto: UpdateFriendDto) {  //add friend  userId: number, 

  }

  async remove(userId: number, friendId: number) {

  }
}
