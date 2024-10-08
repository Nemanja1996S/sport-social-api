import { Module } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { FriendsController } from './friends.controller';
import { DatabaseModule } from 'src/database/database.module';
import { friendsProviders } from './friends.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [FriendsController],
  providers: [...friendsProviders,
    FriendsService],
})
export class FriendsModule {}
