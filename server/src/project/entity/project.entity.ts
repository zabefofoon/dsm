import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm"
import {ProjectType} from "../../../model/ProjectType"

@Entity()
export class ProjectEntity extends BaseEntity implements ProjectType{
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  name: string

  @Column()
  isPrivate: boolean

  @Column()
  modified: Date
}