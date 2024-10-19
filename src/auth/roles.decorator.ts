import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../users/Schema/users.schema';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
