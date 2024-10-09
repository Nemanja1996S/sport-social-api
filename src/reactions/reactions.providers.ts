import { DataSource } from "typeorm";
import { Reaction } from "./entities/reaction.entity";


export const reactionsProviders = [
    {
      provide: 'REACTION_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Reaction),
      inject: ['DATA_SOURCE'],
    },
  ];