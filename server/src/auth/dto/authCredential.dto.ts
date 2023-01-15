import {IsString, MaxLength, MinLength} from "class-validator"

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  name: string

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  password: string
}