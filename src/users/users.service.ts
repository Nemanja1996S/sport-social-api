import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';
@Injectable()
export class UsersService {

  constructor(
  @Inject('USER_REPOSITORY')
    private usersRepository: Repository<User>,
  ) {}

    algorithm = 'aes-256-cbc';
    key = crypto.randomBytes(32);
    iv = crypto.randomBytes(16);

encrypt(text: string): string {
    const cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);
    let encrypted = cipher.update(text, 'utf-8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

decrypt(encryptedText: string): string {
    const decipher = crypto.createDecipheriv(this.algorithm, this.key, this.iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    return decrypted;
}

  // async findAll(): Promise<User[]> {
  //   return this.userRepository.find();
  // }
  async create(createUserDto: CreateUserDto) {
    createUserDto.password = this.encrypt(createUserDto.password)
    const user = this.usersRepository.create({...createUserDto, posts: []})

    return await this.usersRepository.save(user);
  }

  async findAll() {
    return await this.usersRepository.find()
  }

  async findOne(id: number) {
    return await this.usersRepository.findOne({ where: {id}});  //, relations: {posts: true}}
  }

  async findUser(email: string, password: string) {
    return await this.usersRepository.findOne({ where: {email: email, password: password}});  //this.encrypt(
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    if(!user){
      throw new NotFoundException();
    }
    Object.assign(user, updateUserDto)
    return await this.usersRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if(!user){
      throw new NotFoundException();
    }
    return await this.usersRepository.remove(user);
  }
}
