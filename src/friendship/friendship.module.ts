import { Module } from '@nestjs/common';
import { FriendshipService } from './friendship.service';
import { FriendshipController } from './friendship.controller';
import { friendshipProviders } from './friendship.provider';
import { usersProviders } from 'src/users/users.providers';
import { UsersService } from 'src/users/users.service';
import { DatabaseModule } from 'src/database/database.module';
import { FriendsModule } from 'src/friends/friends.module';

@Module({
  imports: [DatabaseModule, FriendsModule],
  controllers: [FriendshipController],
  providers: [ ...friendshipProviders, FriendshipService, ...usersProviders, UsersService],
  exports: [FriendshipService]
})
export class FriendshipModule {}
