import {CanActivate, ExecutionContext, Inject, Injectable} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt"
import {AuthService} from "./auth.service"

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject(AuthService) private authService: AuthService,
              @Inject(JwtService) private jwtService: JwtService) {
  }

  async canActivate(
      context: ExecutionContext,
  ): Promise<boolean> {
    const req = context.switchToHttp().getRequest()
    const res = context.switchToHttp().getResponse()
    const accessToken = req.cookies['Authentication']
    const decodedAccessToken = this.jwtService.decode(accessToken)
    const isAccessTokenExpired = !decodedAccessToken || (decodedAccessToken?.['exp'] < new Date().getTime() / 1000)

    if (isAccessTokenExpired) {
      const createdAccessToken = await this.authService.refresh(decodedAccessToken['name'])
      res.cookie('Authentication', createdAccessToken, {
        httpOnly: true,
        secure: false,
        //expires: getDateAfterMinute(30)
      })
      return true
    }
    return accessToken && !isAccessTokenExpired
  }
}