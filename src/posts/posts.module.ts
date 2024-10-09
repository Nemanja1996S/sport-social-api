import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { DatabaseModule } from 'src/database/database.module';
import { postsProviders } from './posts.providers';
import { UsersService } from 'src/users/users.service';
import { usersProviders } from 'src/users/users.providers';
import { friendsProviders } from 'src/friends/friends.providers';
import { FriendsService } from 'src/friends/friends.service';
// import { UsersService } from 'src/users/users.service';
// import { usersProviders } from 'src/users/users.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [PostsController],
  providers: [...postsProviders, PostsService, ...usersProviders, UsersService, ...friendsProviders, FriendsService],
  exports: [...postsProviders, PostsService] //...usersProviders, UsersService
})
export class PostsModule {}
