import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { StatusCodes } from 'http-status-codes';

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
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Get('login/user?')
  findUser(@Query('email') email: string, @Query('password') password: string) {
    return this.usersService.findUser(email, password);

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
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
