import { Inject, Injectable } from '@nestjs/common';
import { CreateSportDto } from './dto/create-sport.dto';
import { UpdateSportDto } from './dto/update-sport.dto';
import { Sport } from './entities/sport.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SportsService {

  constructor(@Inject('SPORTS_REPOSITORY') private sportsRepository: Repository<Sport>,) {}

  findOne(id: number) {
    return this.sportsRepository.findOne({where: {id}})
  }

}
