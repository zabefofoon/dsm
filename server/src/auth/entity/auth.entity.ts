import {Column, Entity, PrimaryGeneratedColumn} from "typeorm"

@Entity()
export class AuthEntity {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  name: string

  @Column()
  password: string

  @Column({ nullable: true })
  accessToken: string

  @Column({ nullable: true })
  refreshToken: string
}