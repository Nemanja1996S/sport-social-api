import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { Equal, Raw, Repository } from 'typeorm';
// import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { ArrayContains } from "typeorm"

@Injectable()
export class PostsService {

  constructor(@Inject('POST_REPOSITORY') private postsRepository: Repository<Post>
  // private userService: UsersService
  ){}//@Inject('USER_REPOSITORY') private usersRepository: Repository<User>

  async create(createPostDto: CreatePostDto) {
    const post = this.postsRepository.create(createPostDto)  //{...createPostDto, user: -1}
    return await this.postsRepository.save(post)
  }

  async findAll() {
    return await this.postsRepository.find({relations: {user: true}});
  }

  async findAllPostsOfUserId(userId: number) {
    return await this.postsRepository.find({where: {user: {id: userId}}});
  }

  async findAllPostsForUserId(userId: number){  
    // const foundUser = await this.userService.findOne(userId)
    // this.postsRepository.findOne()
    // return await this.postsRepository.findOne({
    //   relations: {
    //     user: true
    //   },
    //   where: {
    //     user: Raw(`ARRAY_CONTAINS(friendsIds, "${userId})`)
    //   }

    // })
    const userIdString : string = userId.toString()
    return await this.postsRepository.find({
      relations: {
        user: true
      },
      where: {
        user:{
          friendsIds: Raw((alias) => `${alias} @> ${userIdString}`)
        }
      }
      
    })

    // return await this.postsRepository.findBy({
    //   user: Raw((id) => `${us}`)
    // })
  }

  // areUserIdinFriendsIds(friendsIds: number[], userId: number){
  //   return friendsIds.includes(userId)
  // }

//   const loadedPosts = await dataSource.getRepository(Post).findby({
    
//     // title: Raw((alias) => `${alias} IN (:...titles)`, {
//     //     titles: [
//     //         "Go To Statement Considered Harmful",
//     //         "Structured Programming",
//     //     ],
//     // }),
// })
// 
  async findOne(id: number) {
    return await this.postsRepository.findOne({where: {id}})
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const post = await this.findOne(id)
    if(!post)
      throw NotFoundException;
    Object.assign(post, updatePostDto)
    return await this.postsRepository.save(post)
  }

  async remove(id: number) {
    const post = await this.findOne(id);
    if(!post){
      throw new NotFoundException();
    }
    return await this.postsRepository.remove(post)
  }

  
}

