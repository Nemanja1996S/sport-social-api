import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { PostsService } from 'src/posts/posts.service';
import { Repository } from 'typeorm';
import { error } from 'console';
import { Post } from 'src/posts/entities/post.entity';


@Injectable()
export class CommentsService {

  constructor(@Inject('COMMENT_REPOSITORY') private commentsRepository: Repository<Comment>,
  // @Inject('POST_REPOSITORY') private postsRepository: Repository<Post>,
   private postsService: PostsService

  ){}

  async create(postId: string, createCommentDto: CreateCommentDto) {
    const post = await this.postsService.findOne(postId)
    if(!post && createCommentDto.userId)
      throw new error("Nemoguce postaviti komentar")
    const s = await this.postsService.increaseNumberOfComments(post)
    const comment = this.commentsRepository.create({...createCommentDto, post: post})
    return await this.commentsRepository.save(comment)
  }

  async findAll() {
    return await this.commentsRepository.find()
  }

  async findOne(id: string) {
    return await this.commentsRepository.findOne({where: {id}})
  }

  async findAllCommentsOfPost(postId: string) {
    return await this.commentsRepository.find({where: {post: {id: postId}}})
  }

  async update(commentId: string, updateCommentDto: UpdateCommentDto) {
    const comment = await this.findOne(commentId)
    if(!comment)
      throw new error("Ne moze izmeniti komentar")
    Object.assign(comment, updateCommentDto)
    return await this.commentsRepository.save(comment)
  }

  async remove(id: string) {
    const comment = await this.findOne(id);
    if(!comment){
      throw new NotFoundException();
    }
    this.commentsRepository.remove(comment)
    await this.postsService.decreaseNumberOfComments(comment.post)
    return await this.commentsRepository.save(comment);
  }
}
