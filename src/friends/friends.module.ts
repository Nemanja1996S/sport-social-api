import { Module } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { FriendsController } from './friends.controller';
import { DatabaseModule } from 'src/database/database.module';
import { friendsProviders } from './friends.providers';
import { UsersModule } from 'src/users/users.module';
import { usersProviders } from 'src/users/users.providers';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [DatabaseModule],
  controllers: [FriendsController],
  providers: [...friendsProviders, ...usersProviders, UsersService,
    FriendsService],
})
export class FriendsModule {}
