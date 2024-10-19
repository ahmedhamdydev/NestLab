import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUser } from '../users/DTO/createUser.dto';
import { LoginUser } from './DTO/login-user.dto';
import { JwtAuthGuard } from './auth.guard';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';
import { UserRole } from 'src/users/Schema/users.schema';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() user: CreateUser) {
    return await this.authService.register(user);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginUser: LoginUser) {
    return await this.authService.login(loginUser);
  }

  @Post('protected')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  getProtected() {
    return { message: 'Protected route accessed!' };
  }
}
