import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { Brackets, Equal, Raw, Repository } from 'typeorm';
// import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { ArrayContains } from "typeorm"
import { FriendsService } from 'src/friends/friends.service';
import { Friend } from 'src/friends/entities/friend.entity';
import { PostModel } from './posts.model';

@Injectable()
export class PostsService {

  constructor(@Inject('POST_REPOSITORY') private postsRepository: Repository<Post>, private usersService: UsersService, private friendsService: FriendsService
  // private userService: UsersService
  ){}//@Inject('USER_REPOSITORY') private usersRepository: Repository<User>

  async create(userId: number, createPostDto: CreatePostDto) {
    // const post = await this.findPostOfUser(userId)
    // if(!post)
    //   throw new NotFoundException();
    // const newPost = await this.postsRepository.create({...createPostDto, user: post.user, usersReactions: []})  //{...createPostDto, user: -1}
    // return await this.postsRepository.save(newPost)
    const user = await this.usersService.findOne(userId)
    if(!user)
        throw new NotFoundException();
    
    const post = this.postsRepository.create({...createPostDto,
      date: getCurrentDateAndTime(),
      user: user,
      usersReactions: [],
      comments: []})

    return await this.postsRepository.save(post)
  }

  async findAllPostsOfUser(userId: number) {
    return await this.postsRepository.find({ 
      relations: {user: true, usersReactions: true},
      select: {user: {id: true, name: true, surname: true, picture: true},
       usersReactions: {userId: true, reactionEnum: true}},
      where: {user : {id: userId}}})// usersReactions: {post: {id: id} },relations: {user: true},usersReactions: {userId}
  }

  async findAllPostsOfUser2(userId: number) {
    return await this.postsRepository.createQueryBuilder("postRep")
    // .select(["post.id",// "post.user.id", "post.user.name", "post.user.surname", "post.user.picture",
    // "post.usersReactions.userId", "post.usersReactions.reactionEnum", "post.forSports", "post.date", 
    // "post.text", "post.image", "post.numberOfLikes", "post.numberOfDislikes", "post.numberOfComments"
    // ])
    // .where("post.user.id = :userId", { userId })
    // .andWhere("post.usersReactions.userId = :userId", { userId});
    //     new Brackets((qb) => {
    //         qb.where("post.usersReactions.userId = :userId", { userId: userId})
    //     }),
    // )
    // .relation(Post, "user")
    // .relation(Post, "usersReactions")
    // .of(userId)
    // .whe
    // .loadMany();
    // .leftJoinAndSelect("usersReactions", "reaction", "reaction.userId = post.user.id")
    // .getMany()
    
    // .where("post.id = :id", { id: userId })
    // .printSql()
    // .getOne()
    // .andWhere("post.usersReactions.userId = :userId", { userId: userId })
    // .select('*')
    .leftJoinAndSelect("postRep.usersReactions", "post")
    .innerJoinAndSelect("postRep.user", "user.posts")
    .where("postRep.user.id = :id", { id : userId })
    .getQuery()

    // .select(["postf.id", "postf.user.id", "postf.user.name", "postf.user.surname", "postf.user.picture",
    //   "postf.usersReactions.userId", "postf.usersReactions.reactionEnum", "postf.forSports", "postf.date", 
    //   "postf.text", "postf.image", "postf.numberOfLikes", "postf.numberOfDislikes", "postf.numberOfComments"
    //   ])
    // .getOne()
    // .select(["post_id", "user.posts_id", "user.posts_name", "user.posts_surname", "user.posts_picture",
    //   "post_userId", "post_reactionEnum",
    //    "post.forSports", "post.date", "post.text", "post.image", "post.numberOfLikes", "post.numberOfDislikes", "post.numberOfComments"
    // ])
    // .from((subQuery) => {
    //     return subQuery
    //         .from(Post, "post2")
    //         .leftJoinAndSelect("post2.usersReactions", "post")
    //         .innerJoinAndSelect("post2.user", "user.posts")
    //         .where("post2.id = :id", { id : userId })
            
    // }, "postp")
    // // .getQuery()
    // .getRawMany()
    // .getMany()
  }
  async findAll() {
    return await this.postsRepository.find();//{relations: {user: true, usersReactions: true}}
  }

  async findOne(id: number) {
    return await this.postsRepository.findOne({where: {id}, relations: {comments: true}});
  }


  async findAllPostsForUserId(userId: number){  

    // 1. naci prijatelje usera, 2. naci njihove postove i vrati
    const friends = await this.friendsService.findAllUserFriends(userId)

    const celaFunckija = async(friendss: Friend[]) => {
      let posts: PostModel[] = [];
      for(const friend of friendss){
        const friendsPosts = await this.findAllPostsOfUser(friend.id)
        for(const friendPost of friendsPosts){
          posts.push(friendPost)
        }
        const userPosts = await this.findAllPostsOfUser(userId)
        for(const userPost of userPosts){
          posts.push(userPost)
        }
      }
      return posts
    }
    return await celaFunckija(friends);
    
    
    // friends.forEach(async friend => {
    // const friednsPosts = await this.findAllPostsOfUser(friend.id)
      
    //   friednsPosts.forEach(async post => {
    //     posts.push(post)
    //   });
    // })
    
    // this.friendsService.findAllUserFriends(userId).then(friends => {
    //   let posts: Post[] = [];
    //   for(const friend of friends){
    //     this.findAllPostsOfUser(friend.id).then(ps => {
    //       for(const p of ps){
    //         posts.push(p)
    //       }
    //     })
        
    //   }
    // })
    // return await posts
    
    

    // async function pushPosts(p : Post){
    //   posts.push(p)
    // }
    //  friends.forEach(async friend => {
    //   const friednsPosts = await this.findAllPostsOfUser(friend.id)
      
    //   friednsPosts.forEach(async post => {
    //     posts.push(post)
    //   });
    //   console.log("evo ga post")
    // console.log(posts)
    // console.log('otiso')
    
   
    // console.log("evo ga post")
    // console.log(posts)
    // console.log('otiso')
    // const show = async () => {
    //   await f();
    //   return posts;
    // }
    // const friends = await this.friendsService.findAllUserFriends(userId)
    
    // const f = async () => { let posts: Post[] = []; friends.forEach(async friend => {
    //   const friednsPosts = await this.findAllPostsOfUser(friend.id)
      
    //   friednsPosts.forEach(async post => {
    //     posts.push(post)
    //   });
    // //   console.log("evo ga post")
    // // console.log(posts)
    // // console.log('otiso')
    // })
    // return posts};
   
   
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
        // const userIdString : string = userId.toString()
        // return await this.postsRepository.find({
        //   relations: {
        //     user: true
        //   },
        //   where: {
        //     user:{
        //       friendsIds: ArrayContains([...userId])//Raw((alias) => `${alias} @> ${userIdString}`) //${alias} @> ${userIdString}
        //     }
        //   }
          
        // })
        
        // return await this.postsRepository
        // .createQueryBuilder("post")
        // .where("post.user.id IN (...post.user.friendsIds)")
        // .getMany()    const friends = await this.friendsService.findAllUserFriends(userId)
    
    // let posts: Post[] = [];
    // friends.forEach(async friend => {
    // const friednsPosts = await this.findAllPostsOfUser(friend.id)
      
    //   friednsPosts.forEach(async post => {
    //     posts.push(post)
    //   });
    // })
    // return posts};
  }

  // areUserIdinFriendsIds(friendsIds: string[], userid: number){
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
  

  async update(id: number, updatePostDto: UpdatePostDto) {
    const post = await this.findOne(id)
    if(!post)
      throw NotFoundException;
    Object.assign(post, updatePostDto)
    // if(updatePostDto.text && updatePostDto){
    //   const newPost = {...post, te }
    // }
    // const newPost = {...post, }
    return await this.postsRepository.save(post)
  }

  async increaseNumberOfComments(post: Post) {
    const newPost = {...post, numberOfComments: post.numberOfComments + 1}
    return await this.postsRepository.save(newPost)
  }

  async decreaseNumberOfComments(post: Post) {
    const newPost: Post = {...post, numberOfComments: post.numberOfComments - 1}
    return await this.postsRepository.save(newPost)
  }

  async increaseNumberOfLikes(post: Post) {
    const newPost: Post = {...post, numberOfLikes: post.numberOfLikes + 1}
    return await this.postsRepository.save(newPost)
  }

  async decreaseNumberOfLikes(post: Post) {
    const newPost: Post = {...post, numberOfLikes: post.numberOfLikes - 1}
    return await this.postsRepository.save(newPost)
  }

  async increaseNumberOfDislikes(post: Post) {
    const newPost: Post = {...post, numberOfDislikes: post.numberOfDislikes + 1}
    return await this.postsRepository.save(newPost)
  }

  async decreaseNumberOfDislikes(post: Post) {
    const newPost: Post = {...post, numberOfDislikes: post.numberOfDislikes - 1}
    return await this.postsRepository.save(newPost)
  }

  async remove(id: number) {
    const post = await this.findOne(id);
    if(!post){
      throw new NotFoundException();
    }
    return await this.postsRepository.remove(post)
  }

  
}

export function getCurrentDateAndTime(): string{
  let date: Date = new Date();
  return `${date.getDate().toString().padStart(2, '0')}.${date.getMonth().toString().padStart(2, '0')}.${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
}
