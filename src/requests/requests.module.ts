import { Module } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { RequestsController } from './requests.controller';
import { DatabaseModule } from 'src/database/database.module';
import { requestsProviders } from './requests.providers';
import { UsersModule } from 'src/users/users.module';
import { usersProviders } from 'src/users/users.providers';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [DatabaseModule, UsersModule],
  controllers: [RequestsController],
  providers: [...requestsProviders, RequestsService, ...usersProviders, UsersService],
})
export class RequestsModule {}
