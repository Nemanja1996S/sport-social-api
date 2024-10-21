import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { getCurrentDateAndTime, PostsService } from 'src/posts/posts.service';
import { Repository } from 'typeorm';
import { error } from 'console';
import { Post } from 'src/posts/entities/post.entity';


@Injectable()
export class CommentsService {

  constructor(@Inject('COMMENT_REPOSITORY') private commentsRepository: Repository<Comment>,
   private postsService: PostsService, 

  ){}

  async create(postId: number, createCommentDto: CreateCommentDto) {
    const post: Post = await this.postsService.findOne(postId)
    const user = await this.postsService.findOneUser(createCommentDto.userId)
    if(!post && !user)
      throw new error("Nemoguce postaviti komentar")
    const newPost: Post = {...post, numberOfComments: post.numberOfComments + 1 }
    const comment = this.commentsRepository.create({...createCommentDto, commentDate: getCurrentDateAndTime(), post: newPost, user: user})
    return await this.commentsRepository.save(comment)
  }

  async findOne(id: number) {
    return await this.commentsRepository.findOne({relations: {post: true}, where: {id: id}})
  }

  async findAllCommentsOfPost(postId: number) {
    return await this.commentsRepository.find({ where: {post: {id: postId}}})
  }

  async findAllCommentsOfPostWithUser(postId: number) {
    return await this.commentsRepository.find(
      {relations: {user: true, post: true}, select: {post: {id: true},
       user: {id: true, name: true, surname: true, picture: true }},
    where: {post: {id: postId}}})
  }

  async update(commentId: number, updateCommentDto: UpdateCommentDto) {
    const comment = await this.findOne(commentId)
    if(!comment)
      throw new NotFoundException();
    Object.assign(comment, updateCommentDto, {date: getCurrentDateAndTime()})
    return await this.commentsRepository.save(comment)
  }

  async remove(id: number) {
    const comment = await this.findOne(id);
    if(!comment){
      throw new NotFoundException();
    }
    const newComment: Comment = {...comment, post: {...comment.post, numberOfComments: comment.post.numberOfComments -1}}
    this.commentsRepository.save(newComment);
    return await this.commentsRepository.remove(newComment);
  }
}
