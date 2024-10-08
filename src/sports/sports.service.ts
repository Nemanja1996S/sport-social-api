import { Inject, Injectable } from '@nestjs/common';
import { CreateSportDto } from './dto/create-sport.dto';
import { UpdateSportDto } from './dto/update-sport.dto';
import { Sport } from './entities/sport.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SportsService {
  // create(createSportDto: CreateSportDto) {
  //   return 'This action adds a new sport';
  // }
  constructor(@Inject('SPORTS_REPOSITORY') private sportsRepository: Repository<Sport>,) {}

  // findAll() {
  //   return this.sportsRepository.find()
  // }

  findOne(id: number) {
    return this.sportsRepository.findOne({where: {id}})
  }

  // update(id: number, updateSportDto: UpdateSportDto) {
  //   return `This action updates a #${id} sport`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} sport`;
  // }
}
