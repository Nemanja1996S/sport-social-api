import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { Request } from './entities/request.entity';
import { Repository } from 'typeorm';
import { error } from 'console';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RequestsService {

  constructor(@Inject('REQUEST_REPOSITORY') private requestsRepository: Repository<Request>,
  private usersService: UsersService
  ){}

  async create(createRequestDto: CreateRequestDto) {
    const toUser = await this.usersService.findOne(createRequestDto.toUser)
    if(!toUser){
      throw new NotFoundException;
    }
    const fromUser = await this.usersService.findOne(createRequestDto.fromUser)
    if(!fromUser){
      throw new NotFoundException;
    }
    const request = this.requestsRepository.create({toUser: toUser, fromUser: fromUser});
    return await this.requestsRepository.save(request)
  }

  async findAll() {
    return await this.requestsRepository.find();
  }

  // async findAllRequestsForUser(userId: number) {
  //   return await this.requestsRepository.find({relations: { fromUser: {friends: true}}, //toUser: true,
  //      where: {toUser: {id: userId}},
  //     select: { fromUser: {id: true, name: true, surname: true, selectedSports: true, //toUser: {id: true},
  //       picture: true, 
  //        friends: {friendId: true}}}});  //friendsIDs nema
  // }

  // async findAllRequestsForUserAndFromUsers(userId: number) {
  //   const allRequests = await this.requestsRepository.find({relations: {toUser: true}, where: {toUser: {id: userId}}});
  //   let fromUserIds: number[] = allRequests.map(request => request.fromUserId)
  //   return this.usersService.find
  // }

  async findRequest(toUserId: number, fromUserId: number) {
    return await this.requestsRepository.findOne({relations: {toUser: true}, where: {toUser: {id: toUserId}, }})//fromUserId: fromUserId
  }

  async update(updateRequestDto: UpdateRequestDto) {  //add request
    const request = await this.findRequest(updateRequestDto.fromUserId, updateRequestDto.toUserId);
    if(request){
      throw new error("Request already exists");
    }
    return await this.create(updateRequestDto)
  }

  async remove(userId: number, friendId: number) {
    const request = await this.findRequest(userId, friendId);
    if(!request){
      throw new NotFoundException();
    }
    return await this.requestsRepository.remove(request)
  }

}