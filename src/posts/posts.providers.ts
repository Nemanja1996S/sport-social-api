import { DataSource } from "typeorm";
import { Post } from "./entities/post.entity";

export const postsProviders = [
    {
      provide: 'POST_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Post),//{ return [dataSource.getRepository(Post), dataSource.getRepository(User)]}
      inject: ['DATA_SOURCE'],
    },
  ];