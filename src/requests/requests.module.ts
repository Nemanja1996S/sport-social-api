import { Module } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { RequestsController } from './requests.controller';
import { DatabaseModule } from 'src/database/database.module';
import { requestsProviders } from './requests.providers';
import { UsersModule } from 'src/users/users.module';
import { usersProviders } from 'src/users/users.providers';
import { UsersService } from 'src/users/users.service';
import { FriendsModule } from 'src/friends/friends.module';

@Module({
  imports: [DatabaseModule, UsersModule, FriendsModule],
  controllers: [RequestsController],
  providers: [...requestsProviders, RequestsService, ...usersProviders, UsersService],
})
export class RequestsModule {}
