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
    //   @Inject('USER_REPOSITORY')
    // private usersRepository: Repository<User>
    ) {}

  async create(createFriendDto: CreateFriendDto) {
    const user = await this.usersService.findOne(createFriendDto.userId)
    if(!user)
      throw NotFoundException
    const friend = await this.usersService.findOne(createFriendDto.friendId)
    if(!friend)
      throw NotFoundException
    const newFriend = new Friend({user: user, friendId: createFriendDto.friendId})
    const friendship = await this.friendsRepository.create(newFriend)
    return await this.friendsRepository.save(friendship)
  }

  async findAll() {
    await this.friendsRepository.find();
  }

  async findFriendship(userId: number, friendId: number) {
    return await this.friendsRepository.findOne({relations: {user: true }, where: {user: {id: userId}, friendId: friendId}})
  }

  async findAllUserFriends(userId: number) {
    return await this.friendsRepository.find({relations: {user: true }, where: {user: {id: userId}}})
  }

  async update(updateFriendDto: UpdateFriendDto) {  //add friend  userId: number, 
    const friendship = await this.findFriendship(updateFriendDto.userId, updateFriendDto.friendId);
    if(!friendship)
      throw NotFoundException;
    const addedFriendId = {...friendship, friendId: updateFriendDto.friendId}
    return await this.friendsRepository.save(addedFriendId)
  }

  async remove(userId: number, friendId: number) {
    const friendship = await this.findFriendship(userId, friendId);
    if(!friendship)
        throw NotFoundException;
    return await this.friendsRepository.remove(friendship)
  }
}
