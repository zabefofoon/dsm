import {IsDate} from 'class-validator';
import {Type} from 'class-transformer';

import {ProjectType} from '../../../model/ProjectType';

export class ProjectDto implements ProjectType {
  id: string

  name: string
  thumbnail: string

  private: boolean

  @Type(() => Date)
  @IsDate()
  modified: string
  @Type(() => Date)
  @IsDate()
  created: string
}