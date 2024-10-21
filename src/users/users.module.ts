import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { usersProviders } from './users.providers';
import { DatabaseModule } from 'src/database/database.module';
import { FriendsService } from 'src/friends/friends.service';
import { friendsProviders } from 'src/friends/friends.providers';
import { FriendsModule } from 'src/friends/friends.module';

@Module({
  controllers: [UsersController],
  imports: [DatabaseModule, FriendsModule],
  providers: [
    ...usersProviders,
    UsersService],
  exports: [UsersModule]
})
export class UsersModule {}
