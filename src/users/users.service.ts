import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUser } from './DTO/createUser.dto';
import { UpdateUser } from './DTO/updateUser.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './Schema/users.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findOneByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async getAllUsers(): Promise<CreateUser[]> {
    try {
      return await this.userModel.find();
    } catch (err) {
      throw new BadRequestException('Something went wrong');
    }
  }

  async getUser(id: string): Promise<CreateUser> {
    try {
      return await this.userModel.findById(id);
    } catch (err) {
      throw new BadRequestException('Something went wrong');
    }
  }

  async createUser(
    userData: CreateUser,
  ): Promise<{ message: string; data: CreateUser }> {
    try {
      const existingUser = await this.userModel.findOne({
        email: userData.email,
      });
      console.log(existingUser);
      if (existingUser) {
        throw new BadRequestException('User already exists');
      }
      const newUser = await this.userModel.create(userData);
      return {
        message: 'User created successfully',
        data: newUser,
      };
    } catch (err) {
      throw new BadRequestException('Something went wrong');
    }
  }

  async updateUser(id: string, updatedUser: UpdateUser): Promise<CreateUser> {
    try {
      return await this.userModel.findByIdAndUpdate(id, updatedUser, {
        new: true,
        runValidators: true,
      });
    } catch (err) {
      throw new BadRequestException('Something went wrong');
    }
  }

  async deleteUser(id: string) {
    try {
      return await this.userModel.findByIdAndDelete(id);
    } catch (err) {
      throw new BadRequestException('Something went wrong');
    }
  }
}
