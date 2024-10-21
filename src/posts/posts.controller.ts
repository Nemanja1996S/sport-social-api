import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post(':userId')
  create(@Param('userId') userId: number, @Body() createPostDto: CreatePostDto) {
    return this.postsService.create(userId, createPostDto);
  }

  @Get('ofUser/:id')
  findPostsOfUser(@Param('id') id: number) {
    return this.postsService.findAllPostsOfUser(id)
  }

  @Get('ofUser2/:id')
  findPostsOfUser2(@Param('id') id: number) {
    return this.postsService.findAllPostsOfUser2(id)
  }

  @Get('forUser/:id')
  findPostsForUser(@Param('id') id: number) {
    return this.postsService.findAllPostsForUserId(id)
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.postsService.remove(id);
  }
}
