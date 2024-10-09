import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { DatabaseModule } from 'src/database/database.module';
import { commentsProviders } from './comments.providers';
import { PostsModule } from 'src/posts/posts.module';

@Module({
  imports: [DatabaseModule, PostsModule],
  controllers: [CommentsController],
  providers: [...commentsProviders, CommentsService],
})
export class CommentsModule {}
