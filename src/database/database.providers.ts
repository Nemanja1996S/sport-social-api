import { Friend } from "src/friends/entities/friend.entity";
import { Post } from "src/posts/entities/post.entity";
import { Reaction } from "src/reactions/entities/reaction.entity";
import { Request } from "src/requests/entities/request.entity";
import { Sport } from "src/sports/entities/sport.entity";
import { User } from "src/users/entities/user.entity";
import { Comment } from "src/comments/entities/comment.entity";
import { DataSource } from "typeorm";
import { Friendship } from "src/friendship/entities/friendship.entity";



export const databaseProviders = [
    {
      provide: 'DATA_SOURCE',
      useFactory: async () => {
        const dataSource = new DataSource({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: 'neman',
          database: 'sportSocial',
          entities: [ User, Friend, Sport, Post, Request, Reaction, Comment, Friendship
          ],
          synchronize: true,   
        });
        return dataSource.initialize();
      },
    },
  ];