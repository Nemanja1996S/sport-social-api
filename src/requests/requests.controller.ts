import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';

@Controller('requests')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @Post()
  create(@Body() createRequestDto: CreateRequestDto) {
    return this.requestsService.create(createRequestDto);
  }

  @Post()
  accept(@Body() createRequestDto: CreateRequestDto) {  ////////accaept rq
    return this.requestsService.create(createRequestDto);
  }

  @Get()
  findAll() {
    return this.requestsService.findAll();
  }

  @Get(':userId')
  findAllForUser(@Param('userId') userId: number) {
    return this.requestsService.findAllRequestsForUser(userId)
  }

  @Get(':userId/:friendId')
  getRequest(@Param('userId') userId: number, @Param('friendId') friendId: number) {
    return this.requestsService.findRequest2(friendId, userId)
  }

  @Patch(':userId')
  updateAdd(@Body() updateRequestDto: UpdateRequestDto) {
    return this.requestsService.update(updateRequestDto);
  }

  @Delete(':id')
  removeId(@Param('id') id: number) {
    return this.requestsService.removeId(id);
  }

  @Delete(':userId/:friendId')
  remove(@Param('userId') userId: number, @Param('friendId') friendId: number) {
    return this.requestsService.remove(userId,friendId);
  }
}
