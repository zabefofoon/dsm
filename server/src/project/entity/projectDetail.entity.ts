import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm"
import {ProjectDetailType} from "../../../model/ProjectDetailType"

@Entity()
export class ProjectDetailEntity extends BaseEntity implements ProjectDetailType {
  @PrimaryGeneratedColumn()
  id: string

  @Column({nullable: true})
  data: string

  @Column()
  projectId: string
}