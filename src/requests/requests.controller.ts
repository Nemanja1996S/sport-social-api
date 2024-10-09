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

  @Get()
  findAll() {
    return this.requestsService.findAll();
  }

  @Get(':userId')
  findAllForUser(@Param('userId') userId: string) {
    return this.requestsService.findAllRequestsForUser(userId)
  }

  @Patch(':userId')
  updateAdd(@Body() updateRequestDto: UpdateRequestDto) {
    return this.requestsService.update(updateRequestDto);
  }

  @Delete(':userId/:friendId')
  remove(@Param('userId') userId: string, @Param('friendId') friendId: string) {
    return this.requestsService.remove(userId,friendId);
  }
}
