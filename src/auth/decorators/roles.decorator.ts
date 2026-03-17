//--------Role-STEP 4:: Custome Role Decorator--set-metadata od the roleskey----------

import { SetMetadata } from '@nestjs/common';
import { Role } from '../enums/role.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: [Role, ...Role[]]) =>
  SetMetadata(ROLES_KEY, roles);
// ROLES_KEY → A unique identifier used to store role metadata.
// SetMetadata → Attaches the allowed roles (e.g., Admin, User) to a route handler.
// ...roles → Lets you pass one or multiple roles (e.g., @Roles(Role.Admin, Role.Editor)).
//[Role, ...Role[]} means it cannot be emply there should be 1 role and can other multiples too
