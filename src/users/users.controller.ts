import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { DictWhereConditionForFriends, UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { StatusCodes } from 'http-status-codes';
import { SearchUserDto } from './dto/search-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findUserByid(id);
  }
  @Post('/friendsAndTheirFriendsIds')
  findAllFriendsAndTheirFriendsIds(@Body() body: SearchUserDto[] ) {
    return this.usersService.findUserFriendsAndTheirFriendsIds(body);
  }
  
  // @Get('friends/:userId')
  // findALLFriends(@Param('userId') userId: number) {
  //   return this.usersService.findAllUserFriends(userId);
  // }

  // @Get('userFriends/:id')
  // findFriends(@Param('id') id: number) {
  //   return this.usersService.findUserFriends(id);
  // }

  @Get('login/user?')
  findUser(@Query('email') email: string, @Query('password') password: string) {
    return this.usersService.findUser(email, password);
  }

  @Get('/requests/:userId')
  findRequestAndTheirUserData(@Param('userId') id: number) {
    return this.usersService.findAllRequestsForUserAndFromUsers(id);
  }
  
  @Get('like/:substring')
  findUsersWithStartingSubstring(@Param('substring') substring: string) {
    return this.usersService.findUsersWithStartingNameOrSurname(substring);
  }

  // if(user){
  //   return StatusCodes.ACCEPTED;
  // } ///then()
  // else{
  //   return StatusCodes.INTERNAL_SERVER_ERROR;
  // }
  // @Get('login')
  // findUser(@Query() query: Promise<User>) {
  //   query.then(user =>  {
  //     if(user){
  //       this.usersService.findUser(user.email, user.password)
  //       return StatusCodes.ACCEPTED;
  //     }
  //     else{
  //       return StatusCodes.INTERNAL_SERVER_ERROR;
  //     }
  //   }
  //   )
  @Patch()
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }
}
