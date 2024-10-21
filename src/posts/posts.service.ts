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
import { FriendshipService } from 'src/friendship/friendship.service';

@Injectable()
export class PostsService {

  constructor(@Inject('POST_REPOSITORY') private postsRepository: Repository<Post>,
   private usersService: UsersService, 
   private friendshipService: FriendshipService
  ){}

  async create(userId: number, createPostDto: CreatePostDto) {
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
  async findOneUser(userId: number){
    return await this.usersService.findOne(userId)
  }

  async findAllPostsOfUser(userId: number) {
    return await this.postsRepository.find({ 
      relations: {user: true, usersReactions: true},
      select: {user: {id: true, name: true, surname: true, picture: true},
       usersReactions: {userId: true, reactionEnum: true}},
      where: {user : {id: userId}}})
  }

  async findAllPostsOfUser2(userId: number) {
    return await this.postsRepository.createQueryBuilder("postRep")
    .leftJoinAndSelect("postRep.usersReactions", "post")
    .innerJoinAndSelect("postRep.user", "user.posts")
    .where("postRep.user.id = :id", { id : userId })
    .getQuery()
  }

  async findAll() {
    return await this.postsRepository.find();//{relations: {user: true, usersReactions: true}}
  }

  async findOne(id: number) {
    return await this.postsRepository.findOne({where: {id}, relations: {comments: true}});
  }

  async findAllPostsForUserId(userId: number){  

    const friendships = await this.friendshipService.findAllRealationshipsForUser(userId)
    const friends: number[] = friendships.map(friendship => friendship.friend.id)

    const celaFunckija = async(friendsIds: number[]) => {
      let posts: PostModel[] = [];
      for(const friendId of friendsIds){
        const friendsPosts = await this.findAllPostsOfUser(friendId)
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
}

  async update(id: number, updatePostDto: UpdatePostDto) {
    const post = await this.findOne(id)
    if(!post)
      throw NotFoundException;
    Object.assign(post, updatePostDto)
    post.date = getCurrentDateAndTime()
    return await this.postsRepository.save(post)
  }

  async increaseNumberOfLikes(post: Post) {
    const newPost: Post = {...post, numberOfLikes: post.numberOfLikes + 1}
    return await this.postsRepository.save(newPost)
  }

  async decreaseNumberOfLikes(post: Post) {
    const newPost: Post = {...post, numberOfLikes: post.numberOfLikes - 1}
    return await this.postsRepository.save(newPost)
  }

  async increaseNumberOfLikesAndDecreaseNumberOfDislikes(post: Post) {
    const newPost: Post = {...post, numberOfLikes: post.numberOfLikes + 1, numberOfDislikes: post.numberOfDislikes - 1}
    return await this.postsRepository.save(newPost)
  }

  async increaseNumberOfDislikesAndDecreaseNumberOfLikes(post: Post) {
    const newPost: Post = {...post, numberOfDislikes: post.numberOfDislikes + 1,  numberOfLikes: post.numberOfLikes - 1,}
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
