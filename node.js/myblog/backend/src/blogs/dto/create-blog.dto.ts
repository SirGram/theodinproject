import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsDate,
  IsArray,
  IsNumber,
  IsMongoId,
} from 'class-validator';
import { Type } from 'class-transformer';
import { User } from 'src/users/schemas/user.schema';

export class CreateBlogDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly content: string;

  @IsMongoId()
  readonly user: User;

  @IsString()
  @IsOptional()
  readonly image?: string;

  @IsDate()
  @Type(() => Date)
  readonly creationDate: Date;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  readonly lastEditionDate?: Date;

  @IsBoolean()
  readonly published: boolean;

  @IsNumber()
  readonly likes?: number;

  @IsNumber()
  readonly visits?: number;

  @IsArray()
  @IsOptional()
  @IsMongoId({ each: true })
  readonly comments?: string[];
}
