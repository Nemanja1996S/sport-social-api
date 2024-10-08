import { Module } from '@nestjs/common';
import { SportsService } from './sports.service';
import { SportsController } from './sports.controller';
import { DatabaseModule } from 'src/database/database.module';
import { sportsProviders } from './sports.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [SportsController],
  providers: [...sportsProviders, SportsService],
})
export class SportsModule {}
