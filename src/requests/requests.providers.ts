import { DataSource } from "typeorm";
import { Request } from "./entities/request.entity";

export const requestsProviders = [
    {
      provide: 'REQUEST_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Request),
      inject: ['DATA_SOURCE'],
    },
  ];