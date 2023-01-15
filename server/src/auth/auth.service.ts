import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm"
import {AuthEntity} from "./entity/auth.entity"
import {Repository} from "typeorm"
import {AuthCredentialsDto} from "./dto/authCredential.dto"
import {JwtService} from "@nestjs/jwt"
import * as bcrypt from "bcryptjs"
import {ResultSignedIn} from "../../model/ResultSignedIn"

@Injectable()
export class AuthService {
  constructor(
      @InjectRepository(AuthEntity)
      private authRepository: Repository<AuthEntity>,
      private jwtService: JwtService
  ) {
  }

  async signUp({name, password}: AuthCredentialsDto): Promise<AuthEntity> {
    const exist = await this.authRepository.findOneBy({name})
    if (!!exist) throw new HttpException({
      message: 'Exist the name. try input another name.'
    }, HttpStatus.BAD_REQUEST)

    const hashedPassword = await this.createHashedPassword(password)

    const user = this.authRepository.create({
      name,
      password: hashedPassword,
      refreshToken: this.createRefreshToken(name),
      accessToken: undefined
    })
    await this.authRepository.save(user)

    return user
  }

  async signIn({name, password}: AuthCredentialsDto): Promise<ResultSignedIn> {
    const user = await this.authRepository.findOneBy({name})
    if (!user) throw new HttpException({
      message: 'Invalid sign in.'
    }, HttpStatus.FORBIDDEN)

    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) throw new HttpException({
      message: 'Invalid sign in.'
    }, HttpStatus.FORBIDDEN)

    const accessToken = this.createAccessToken(name)
    const refreshToken = this.createRefreshToken(name)

    await this.authRepository.update({name}, {accessToken, refreshToken})
    return {name, accessToken}
  }

  async refresh(name: string): Promise<string> {
    const user = await this.authRepository.findOneBy({name})
    const decodedRefreshToken = this.jwtService.decode(user.refreshToken)
    const isRefreshTokenExpired = decodedRefreshToken?.['exp'] < new Date().getTime() / 1000
    if (isRefreshTokenExpired) throw new HttpException(
        {message: 'Refresh token is expired. Try re-sign in.'}, HttpStatus.FORBIDDEN)

    const accessToken = this.createAccessToken(name)
    await this.authRepository.update({name}, {accessToken})
    return accessToken
  }

  private async createHashedPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, Number(process.env.BCRYPT_SALT))
  }

  private createAccessToken(name: string): string {
    return this.jwtService.sign({name}, {
      secret: `access_${process.env.SECRET_SALT}`,
      expiresIn: 60 * 30
    })
  }

  private createRefreshToken(name: string): string {
    return this.jwtService.sign({name}, {
      secret: `refresh_${process.env.SECRET_SALT}`,
      expiresIn: 60 * 60 * 2
    })
  }
}
