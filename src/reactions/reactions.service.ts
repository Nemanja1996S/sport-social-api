import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateReactionDto, ReactionEnum } from './dto/create-reaction.dto';
import { UpdateReactionDto } from './dto/update-reaction.dto';
import { Reaction } from './entities/reaction.entity';
import { Repository } from 'typeorm';
import { PostsService } from 'src/posts/posts.service';


@Injectable()
export class ReactionsService {

  constructor(@Inject('REACTION_REPOSITORY') private reactionsRepository: Repository<Reaction>, private postsService: PostsService
){}

  async create(postId: number, createReactionDto: CreateReactionDto) {
    const post = await this.postsService.findOne(postId)
    if(!post)
      throw new NotFoundException();
    const newReaction = this.reactionsRepository.create({...createReactionDto, post: post})
    return await this.reactionsRepository.save(newReaction)
  }

  async findAll() {
    return await this.reactionsRepository.find()
  }

  async findOne(id: number) {
    return this.reactionsRepository.findOne({where: {id}, relations: {post: true}})
  }

  async findReactionForPost(postId: number) {
    return this.reactionsRepository.findOne({where: {post: {id: postId}}})
  }

  async upsert(postId: number, updateReactionDto: UpdateReactionDto) {
    const reaction = await this.findReactionForPost(postId);
    const post = await this.postsService.findOne(postId)
    if(!reaction){
      if(!post)
        throw new NotFoundException();
      const newReaction = this.reactionsRepository.create({...updateReactionDto, post: post})
      return await this.reactionsRepository.save(newReaction)
    }
    if(updateReactionDto.reactionEnum === ReactionEnum.neutral){
      return
    }
    let currentReactionEnum : ReactionEnum = ReactionEnum.neutral
    if(updateReactionDto.reactionEnum === ReactionEnum.like){
      if(reaction.reactionEnum.valueOf() === ReactionEnum.dislike.valueOf())
      {
        this.postsService.increaseNumberOfLikes(post);
        this.postsService.decreaseNumberOfDislikes(post);
        currentReactionEnum = ReactionEnum.like
      }
      else if(reaction.reactionEnum.valueOf() === ReactionEnum.like.valueOf()){
        this.postsService.decreaseNumberOfLikes(post)
        currentReactionEnum = ReactionEnum.neutral
      }
      else{
        this.postsService.increaseNumberOfLikes(post)
        currentReactionEnum = ReactionEnum.like
      }
    }
    else{
      if(reaction.reactionEnum === ReactionEnum.dislike){
        this.postsService.decreaseNumberOfDislikes(post)
        currentReactionEnum = ReactionEnum.neutral
      }
      else if(reaction.reactionEnum === ReactionEnum.like){
        this.postsService.decreaseNumberOfLikes(post)
        this.postsService.increaseNumberOfDislikes(post)
        currentReactionEnum = ReactionEnum.dislike
      }
      else{
        this.postsService.increaseNumberOfDislikes(post)
        currentReactionEnum = ReactionEnum.dislike
      }
    }
    const newReaction = {...reaction, reactionEnum : currentReactionEnum}
    return await this.reactionsRepository.save(newReaction);
  }

  async remove(id: number) {
    const reaction = await this.findOne(id);
    if(!reaction){
      throw new NotFoundException();
    }
    this.reactionsRepository.remove(reaction)
    return await this.reactionsRepository.save(reaction);
  }
}
