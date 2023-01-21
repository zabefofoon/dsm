import {Body, Controller, Get, Post, Res, UseFilters, ValidationPipe} from '@nestjs/common';
import {AuthService} from "./auth.service"
import {AuthCredentialsDto} from "./dto/authCredential.dto"
import {AuthEntity} from "./entity/auth.entity"
import {HttpExceptionFilter} from "../../filter/httpException.filter"
import {Response} from "express"

@Controller('auth')
@UseFilters(new HttpExceptionFilter())
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @Post("/signUp")
  async signUp(
      @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<AuthEntity> {
    return this.authService.signUp(authCredentialsDto)
  }

  @Post("/signIn")
  async signIn(
      @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
      @Res({passthrough: true}) res: Response
  ): Promise<void> {
    const result = await this.authService.signIn(authCredentialsDto)
    const accessToken = result.accessToken
    res.cookie('Authentication', accessToken, {
      httpOnly: true,
      secure: false
    })
  }


  @Get("/signOut")
  async signOut(@Res({passthrough: true}) res: Response) {
    res.clearCookie('Authentication')
  }
}
