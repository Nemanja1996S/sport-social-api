import { DataSource } from "typeorm";
import { Friend } from "./entities/friend.entity";

export const friendsProviders = [
    {
      provide: 'FRIEND_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Friend),
      inject: ['DATA_SOURCE'],
    },
  ];