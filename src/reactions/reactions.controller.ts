import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReactionsService } from './reactions.service';
import { CreateReactionDto } from './dto/create-reaction.dto';
import { UpdateReactionDto } from './dto/update-reaction.dto';

@Controller('reactions')
export class ReactionsController {
  constructor(private readonly reactionsService: ReactionsService) {}

  @Post(':postId')
  create(@Param('postId') postId: number, @Body() createReactionDto: CreateReactionDto) {
    return this.reactionsService.create(postId, createReactionDto);
  }

  @Get()
  findAll() {
    return this.reactionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.reactionsService.findOne(id);
  }

  @Patch(':postId')
  update(@Param('postId') postId: number, @Body() updateReactionDto: UpdateReactionDto) {
    return this.reactionsService.upsert(postId, updateReactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.reactionsService.remove(id);
  }
}
