import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { FriendsModule } from './friends/friends.module';
import { SportsModule } from './sports/sports.module';
import { PostsModule } from './posts/posts.module';
import { RequestsModule } from './requests/requests.module';
import { ReactionsModule } from './reactions/reactions.module';
import { CommentsModule } from './comments/comments.module';
import { FriendshipModule } from './friendship/friendship.module';

@Module({
  imports: [UsersModule, FriendsModule, SportsModule, PostsModule, RequestsModule, ReactionsModule, CommentsModule, FriendshipModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
