import { Role } from './role.enum';
import { SetMetadata } from '@nestjs/common';

export const ROLE_KEY = 'roles';

export const Roles = (...role: Role[]) => SetMetadata(ROLE_KEY, role);
