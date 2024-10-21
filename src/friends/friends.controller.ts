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

  // @Get(':id')
  // findFriendEntity(@Param('id') id: number) {
  //   return this.friendsService.getFriendEntity(id);
  // }


  @Patch() 
  update(@Body() updateFriendDto: UpdateFriendDto) {  //@Param('userId') userId: number, 
    return this.friendsService.update(updateFriendDto);
  }

  @Delete(':userId/:friendId')
  remove(@Param('userId') userId: number, @Param('friendId') friendId: number) {
    return this.friendsService.remove(userId, friendId);
  }
}
