import {ProjectType} from "../../../model/ProjectType"

export class Project implements ProjectType{
  id: string

  name: string
  thumbnail: string

  private: boolean

  modified: string
  created: string
}