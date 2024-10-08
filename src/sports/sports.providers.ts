import { DataSource } from "typeorm";
import { Sport } from "./entities/sport.entity";

export const sportsProviders = [
    {
      provide: 'SPORTS_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Sport),
      inject: ['DATA_SOURCE'],
    },
  ];