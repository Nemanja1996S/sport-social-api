import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FriendshipService } from './friendship.service';
import { CreateFriendshipDto } from './dto/create-friendship.dto';
import { UpdateFriendshipDto } from './dto/update-friendship.dto';

@Controller('friendship')
export class FriendshipController {
  constructor(private readonly friendshipService: FriendshipService) {}

  @Post()
  create(@Body() createFriendshipDto: CreateFriendshipDto) {
    return this.friendshipService.create(createFriendshipDto);
  }

  @Get(':userId')
  findOne(@Param('userId') id: string) {
    return this.friendshipService.findAllRealationshipsForUser(+id);
  }

  @Delete(':userId/:friendId')
  remove(@Param('userId') userId: number, @Param('friendId') friendId: number) {
    return this.friendshipService.remove(userId, friendId);
  }
}
