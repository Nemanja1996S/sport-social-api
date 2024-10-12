import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { getCurrentDateAndTime, PostsService } from 'src/posts/posts.service';
import { Repository } from 'typeorm';
import { error } from 'console';
import { Post } from 'src/posts/entities/post.entity';
import { UsersService } from 'src/users/users.service';
import { ExtendedComment } from './comments.models';


@Injectable()
export class CommentsService {

  constructor(@Inject('COMMENT_REPOSITORY') private commentsRepository: Repository<Comment>,
  // @Inject('POST_REPOSITORY') private postsRepository: Repository<Post>,
   private postsService: PostsService, //private usersService: UsersService

  ){}

  async create(postId: number, createCommentDto: CreateCommentDto) {
    const post = await this.postsService.findOne(postId)
    if(!post && createCommentDto.userId)
      throw new error("Nemoguce postaviti komentar")
    const s = await this.postsService.increaseNumberOfComments(post)
    const comment = this.commentsRepository.create({...createCommentDto, commentDate: getCurrentDateAndTime(), post: post})
    return await this.commentsRepository.save(comment)
  }

  async findAll() {
    return await this.commentsRepository.find()
  }

  async findOne(id: number) {
    return await this.commentsRepository.findOne({where: {id}})
  }

  async findAllCommentsOfPost(postId: number) {
    return await this.commentsRepository.find({ where: {post: {id: postId}}})
  }

  async findAllCommentsOfPostWithUser(postId?: number, userId?: number) {
    // const comments = await this.findAllCommentsOfPost(postId)
    // const user = await this.usersService.findOne(userId)
    // const commExt : ExtendedComment = {
    //   userId: user.id,
    //   userFullName: user.name + ' ' + user.surname ,
    //   userPicSrc: user.picture,
    //   commentDate: comments,
    //   commentText: '',
    //   commentPic: ''
    // }
    // return Promise<ExtendedComment>((resolve, reject => ))
    // return await this.commentsRepository.createQueryBuilder('comms')
    // .leftJoinAndSelect("comments","post")
    // .getMany()
    // const users = await connection.getRepository(User)
    // .createQueryBuilder('user')
    // .select("user.id", 'id')
    // .addCommonTableExpression(`
    //   SELECT "userId" FROM "post"
    //   `, 'post_users_ids')
    // .where(`user.id IN (SELECT "userId" FROM 'post_users_ids')`)
    // .getMany();
    // return await this.commentsRepository.createQueryBuilder('comms')
    // .leftJoinAndSelect("users", "user", "user.id = comms.userId")
    // .getMany()
  }

  async update(commentId: number, updateCommentDto: UpdateCommentDto) {
    const comment = await this.findOne(commentId)
    if(!comment)
      throw new error("Ne moze izmeniti komentar")
    Object.assign(comment, updateCommentDto)
    return await this.commentsRepository.save(comment)
  }

  async remove(id:number) {
    const comment = await this.findOne(id);
    if(!comment){
      throw new NotFoundException();
    }
    this.commentsRepository.remove(comment)
    await this.postsService.decreaseNumberOfComments(comment.post)
    return await this.commentsRepository.save(comment);
  }
}
