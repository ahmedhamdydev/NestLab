import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUser } from './DTO/createUser.dto';
import { UpdateUser } from './DTO/updateUser.dto';
import { UsersService } from './users.service';
import { ConfigService } from '@nestjs/config';

@Controller('users')
export class UsersController {
  constructor(
    private _UsersService: UsersService,
    private _ConfigService: ConfigService,
  ) {}

  @Get()
  // get all users
  find(): Promise<CreateUser[]> {
    return this._UsersService.getAllUsers();
  }

  @Get(':id')
  // get user by id
  findOne(@Param('id') id: string): Promise<CreateUser> {
    return this._UsersService.getUser(id);
  }

  @Post()
  // create a new user
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() user: CreateUser,
  ): Promise<{ message: string; data: CreateUser }> {
    return await this._UsersService.createUser(user);
  }

  @Patch(':id')
  // update a user
  update(
    @Param('id') userId: string,
    @Body() updatedUser: UpdateUser,
  ): Promise<CreateUser> {
    return this._UsersService.updateUser(userId, updatedUser);
  }

  @Delete(':id')
  // delete a user
  delete(@Param('id') id: string): void {
    this._UsersService.deleteUser(id);
  }
}
