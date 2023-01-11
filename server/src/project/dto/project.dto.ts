import {IsBoolean, IsDate, IsNotEmpty, IsOptional} from 'class-validator';
import {Type} from 'class-transformer';

import {ProjectType} from '../../../model/ProjectType';

export class ProjectDto implements ProjectType {
  id: string

  @IsNotEmpty()
  name: string

  @IsOptional()
  @IsBoolean()
  isPrivate: boolean

  @Type(() => Date)
  @IsDate()
  modified: Date
}