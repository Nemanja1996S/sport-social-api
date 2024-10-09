import { Module } from '@nestjs/common';
import { ReactionsService } from './reactions.service';
import { ReactionsController } from './reactions.controller';
import { DatabaseModule } from 'src/database/database.module';
import { reactionsProviders } from './reactions.providers';
import { postsProviders } from 'src/posts/posts.providers';
import { PostsService } from 'src/posts/posts.service';
import { PostsModule } from 'src/posts/posts.module';

@Module({
  imports: [DatabaseModule, PostsModule],
  controllers: [ReactionsController],
  providers: [...reactionsProviders, ReactionsService], //, ...postsProviders, PostsService
})
export class ReactionsModule {}
