import {Global, Module} from '@nestjs/common';
import { AuthService } from './auth.service';
import {AuthController} from "./auth.controller"
import {TypeOrmModule} from "@nestjs/typeorm"
import {AuthEntity} from "./entity/auth.entity"
import {JwtModule, JwtService} from "@nestjs/jwt"

@Global()
@Module({
  imports: [
      TypeOrmModule.forFeature([AuthEntity]),
      JwtModule.register({})
  ],
  exports: [TypeOrmModule, AuthService, JwtService],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
})
export class AuthModule {}
