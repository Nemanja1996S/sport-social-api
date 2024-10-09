import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { CreateFriendDto } from './dto/create-friend.dto';
import { UpdateFriendDto } from './dto/update-friend.dto';

@Controller('friends')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @Post()
  create(@Body() createFriendDto: CreateFriendDto) {
    return this.friendsService.create(createFriendDto);
  }

  @Get()
  findAll() {
    return this.friendsService.findAll();
  }

  @Get(':userId')
  findAllFriends(@Param('userId') userId: string) {
    return this.friendsService.findAllUserFriends(userId)
  }

  @Get(':userId/:friendId')
  findFriendship(@Param('userId') userId: string, @Param('friendId') friendId: string) {
    return this.friendsService.findFriendship(userId, friendId)
  }

  @Patch() //(':userId')
  update(@Body() updateFriendDto: UpdateFriendDto) {  //@Param('userId') userId: string, 
    return this.friendsService.update(updateFriendDto);
  }

  @Delete(':userId/:friendId')
  remove(@Param('userId') userId: string, @Param('friendId') friendId: string) {
    return this.friendsService.remove(userId, friendId);
  }
}
