import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from '../guards/user-role.guard';
import { RoleProtected } from './role-protected.decorator';
import { ValidRoles } from '../interfaces/valid-roles.interface';

export function Auth(...roles: ValidRoles[]) {
  return applyDecorators(
    RoleProtected(...roles),

    // SetMetadata('roles', roles),
    UseGuards(AuthGuard(), UserRoleGuard),
  );
}
