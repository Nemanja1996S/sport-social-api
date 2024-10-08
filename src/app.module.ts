import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { FriendsModule } from './friends/friends.module';
import { SportsModule } from './sports/sports.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [UsersModule, FriendsModule, SportsModule, PostsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
