import { CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";
import { jwtDecode } from 'jwt-decode';


export class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    
    const ctx = context.switchToHttp();
    const req = ctx.getRequest();

    if (req.headers.authorization) {
      const role = jwtDecode(req.headers.authorization)['x-role']
      console.log(role)
    }
    
    if (req.headers['x-role'] === 'admin' ) {
      return true
    } else {
      throw new ForbiddenException(`Доступ запрещён: требуется роль admin`)
    }
  }
}
