import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFriendshipDto } from './dto/create-friendship.dto';
import { UpdateFriendshipDto } from './dto/update-friendship.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Friendship } from './entities/friendship.entity';

@Injectable()
export class FriendshipService {
  constructor(
    @Inject('FRIENDSHIP_REPOSITORY')
      private friendshipRepository: Repository<Friendship>, private usersService: UsersService
    ) {}

  async create(createFriendshipDto: CreateFriendshipDto) {
    const user: User = await this.usersService.findOneWithFriends(createFriendshipDto.userId)
    if(!user)
      throw NotFoundException
    const friend: User = await this.usersService.findOneWithFriends(createFriendshipDto.friendId)
    if(!friend)
      throw NotFoundException
    const friendship = new Friendship({})
    friendship.user = user
    friendship.friend = friend
    const newFriendship = await this.friendshipRepository.create(friendship)
    await this.friendshipRepository.save(newFriendship)
    const friendship2 = new Friendship({})
    friendship2.user = friend
    friendship2.friend = user
    const newFriendship2 = await this.friendshipRepository.create(friendship2)
    await this.friendshipRepository.save(newFriendship2)
    return
  }

  findAll() {
    return `This action returns all friendship`;
  }

  findAllRealationshipsForUser(userId: number) {
    return this.friendshipRepository.find({select: { friend: {id: true}},
       where: {user: {id: userId}}, relations: { friend: true} })
  }

  findAllFriendsOfUser(userId: number) {
    return this.friendshipRepository.find({select: { friend: {id: true, friendships: {friend: {id: true, }}}},
       where: {user: {id: userId}}, relations: { friend: true} })
  }

  update(id: number, updateFriendshipDto: UpdateFriendshipDto) {
    return `This action updates a #${id} friendship`;
  }

  async remove(userId: number, friendId: number) {
    const friendships = await this.friendshipRepository.find({where: [
      {user: {id: userId}, friend: {id: friendId}},
      {user: {id: friendId}, friend: {id: userId}}
    ]})
    return await this.friendshipRepository.remove(friendships);
  }
}
