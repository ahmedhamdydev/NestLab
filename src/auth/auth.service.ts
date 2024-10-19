import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginUser } from './DTO/login-user.dto';
import { CreateUser } from '../users/DTO/createUser.dto';
import * as bcrypt from 'bcryptjs';
import { User, UserRole } from '../users/Schema/users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async register(userData: CreateUser) {
    const role = userData.role || UserRole.USER;
    const existingUser = await this.usersService.findOneByEmail(userData.email);
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }
    userData.password = await bcrypt.hash(userData.password, 10);
    const newUser = await this.userModel.create({...userData, role});
    return { message: 'User registered successfully', data: newUser };
  }

  async login(loginUser: LoginUser) {
    const user = await this.usersService.findOneByEmail(loginUser.email);
    if (!user || !(await bcrypt.compare(loginUser.password, user.password))) {
      throw new BadRequestException('Invalid credentials');
    }
    const token = this.jwtService.sign({ email: user.email, role: user.role });
    return { token };
  }
}
