import { IsEmail, IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { UserRole } from '../Schema/users.schema';

export class CreateUser {
  @IsString()
  @Length(2, 10, { message: 'name must be between 2 and 10 characters' })
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
