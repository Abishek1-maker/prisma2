/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
//----------ROLE STEP:6::::-Building Role guard to check it meet role of user from API to one of these role or not---------------
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  //-----Inside canActivate function if we return true -we allow the user to access the protected return-----------
  constructor(private reflector: Reflector) {}
  //-----For extracted the required roles from metadata  we have set on Usercontroller we need Reflector class inject------
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      //<---authorized_Role or RequiredRoles--------------
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const user = context.switchToHttp().getRequest().user; //-----extract user column from property---------
    if (!user) return false;
    console.log(user);
    //----------Check any roles are there or not---------
    const hasrequiredRoles = requiredRoles.some((role) => user.role == role); //take callback and loop through all member of required list if it return true for atleast 1 member
    return hasrequiredRoles;
  }
}
