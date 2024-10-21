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

  async findReactionForPostAndUser(postId: number, userId: number) {
    return this.reactionsRepository.findOne({where: {post: {id: postId}, userId: userId}})
  }

  async upsert(postId: number, updateReactionDto: UpdateReactionDto) {
    const reaction = await this.findReactionForPostAndUser(postId, updateReactionDto.userId);
    const post = await this.postsService.findOne(postId)
    if(!reaction){
      if(!post)
        throw new NotFoundException();
      if(updateReactionDto.reactionEnum === ReactionEnum.like)
        await this.postsService.increaseNumberOfLikes(post);
      if(updateReactionDto.reactionEnum === ReactionEnum.dislike)
        await this.postsService.increaseNumberOfDislikes(post);
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
        console.log("Upao sam u bio dislajk, a udaren lajk")
        await this.postsService.increaseNumberOfLikesAndDecreaseNumberOfDislikes(post)
        currentReactionEnum = ReactionEnum.like
      }
      else {
        if(reaction.reactionEnum.valueOf() === ReactionEnum.like.valueOf()){
          await this.postsService.decreaseNumberOfLikes(post)
          currentReactionEnum = ReactionEnum.neutral
        }
        else{
          await this.postsService.increaseNumberOfLikes(post)
          currentReactionEnum = ReactionEnum.like
        }
      }
    }
    else{
      if(reaction.reactionEnum.valueOf() === ReactionEnum.dislike.valueOf()){
        await this.postsService.decreaseNumberOfDislikes(post)
        currentReactionEnum = ReactionEnum.neutral
      }
      else{
        if(reaction.reactionEnum.valueOf() === ReactionEnum.like.valueOf()){
          // console.log("Upao sam u bio lajk, a udaren dislajk")
          await this.postsService.increaseNumberOfDislikesAndDecreaseNumberOfLikes(post)
          // await this.postsService.decreaseNumberOfLikes(post)
          // await this.postsService.increaseNumberOfDislikes(post)
          currentReactionEnum = ReactionEnum.dislike
        }
        else{
          await this.postsService.increaseNumberOfDislikes(post)
          currentReactionEnum = ReactionEnum.dislike
        }
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
