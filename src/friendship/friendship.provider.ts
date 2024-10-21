import { DataSource } from "typeorm";
import { Friendship } from "./entities/friendship.entity";

export const friendshipProviders = [
    {
      provide: 'FRIENDSHIP_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Friendship),
      inject: ['DATA_SOURCE'],
    },
  ];