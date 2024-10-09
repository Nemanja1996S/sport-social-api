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

  async create(postId: string, createReactionDto: CreateReactionDto) {
    const post = await this.postsService.findOne(postId)
    if(!post)
      throw new NotFoundException();
    const newReaction = this.reactionsRepository.create({...createReactionDto, post: post})
    return await this.reactionsRepository.save(newReaction)
  }

  async findAll() {
    return await this.reactionsRepository.find()
  }

  async findOne(id: string) {
    return this.reactionsRepository.findOne({where: {id}, relations: {post: true}})
  }

  // async findReactionForPost(postId: string) {
  //   return this.reactionsRepository.findOne({where: {post: {id: postId}}})
  // }

  async update(id: string, updateReactionDto: UpdateReactionDto) {
    const reaction = await this.findOne(id);
    if(!reaction){
      throw new NotFoundException();
    }
    if(updateReactionDto.reactionEnum === ReactionEnum.neutral){
      return
    }
    let currentReactionEnum : ReactionEnum = ReactionEnum.neutral
    if(updateReactionDto.reactionEnum === ReactionEnum.like){
      if(reaction.reactionEnum === ReactionEnum.dislike)
      {
        this.postsService.increaseNumberOfLikes(reaction.post);
        this.postsService.decreaseNumberOfDislikes(reaction.post);
        currentReactionEnum = ReactionEnum.like
      }
      else if(reaction.reactionEnum === ReactionEnum.like){
        this.postsService.decreaseNumberOfLikes(reaction.post)
        currentReactionEnum = ReactionEnum.neutral
      }
      else{
        this.postsService.increaseNumberOfLikes(reaction.post)
        currentReactionEnum = ReactionEnum.like
      }
    }
    else{
      if(reaction.reactionEnum === ReactionEnum.dislike){
        this.postsService.decreaseNumberOfDislikes(reaction.post)
        currentReactionEnum = ReactionEnum.neutral
      }
      else if(reaction.reactionEnum === ReactionEnum.like){
        this.postsService.decreaseNumberOfLikes(reaction.post)
        this.postsService.increaseNumberOfDislikes(reaction.post)
        currentReactionEnum = ReactionEnum.dislike
      }
      else{
        this.postsService.increaseNumberOfDislikes(reaction.post)
        currentReactionEnum = ReactionEnum.dislike
      }
    }
    const newReaction = {...reaction, reactionEnum : currentReactionEnum}
    return await this.reactionsRepository.save(newReaction);
  }

  async remove(id: string) {
    const reaction = await this.findOne(id);
    if(!reaction){
      throw new NotFoundException();
    }
    this.reactionsRepository.remove(reaction)
    return await this.reactionsRepository.save(reaction);
  }
}
