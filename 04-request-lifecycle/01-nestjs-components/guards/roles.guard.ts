import { CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";
import { jwtDecode } from 'jwt-decode';


export class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    
    const ctx = context.switchToHttp();
    const req = ctx.getRequest();

    // Валидация через JWT добавлена отдельна, как часть опционального задания
    if (req.headers.authorization) {
      return jwtDecode(req.headers.authorization)['x-role'] === 'admin' ? true : false
    }
    
    if (req.headers['x-role'] === 'admin' ) {
      return true
    } else {
      throw new ForbiddenException(`Доступ запрещён: требуется роль admin`)
    }
  }
}
