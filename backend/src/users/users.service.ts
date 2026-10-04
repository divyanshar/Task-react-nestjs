import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema.js';
import { SignupDto } from '../auth/dto/auth.dto.js';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  async createUser(data:SignupDto){
    const user = new this.userModel(data);
    const savedUser= await user.save();
    return {
      id: savedUser.id,
      name: savedUser.name,
      email: savedUser.email,
    }
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }

  async findById(id: string) {
    return this.userModel.findOne({ id }).exec();
  }
}