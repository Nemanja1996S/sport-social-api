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
    let friendEntity = new Friend()
    friendEntity.id = createFriendDto.friendId
    friendEntity.friendships = []
    friendEntity = this.friendsRepository.create(friendEntity)
    return await this.friendsRepository.save(friendEntity)
  }

}
