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
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { User } from 'src/schemas/user.schema';
import { Comment } from 'src/comments/schemas/comment.schema';

export class CreateBlogDto {
  @ApiProperty({
    description: 'The title of the blog',
    example: 'Sample Title',
  })
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({
    description: 'The content of the blog',
    example: 'Lorem ipsum dolor sit amet',
  })
  @IsString()
  @IsNotEmpty()
  readonly content: string;

  @ApiProperty({
    description: 'The ID of the user who created the blog',
    example: '613f8e96b97e5a16d8ccf5d4',
  })
  @IsMongoId()
  readonly user: User;

  @ApiProperty({
    description: 'The URL of the image associated with the blog',
    example: 'https://example.com/image.jpg',
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly image?: string;

  @ApiProperty({
    description: 'The creation date of the blog',
    example: '2024-05-30T12:00:00.000Z',
    required: false,
  })
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  readonly creationDate: Date;

  @ApiProperty({
    description: 'Indicates if the blog is published',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  readonly published: boolean;

  @ApiProperty({
    description: 'The number of likes received by the blog',
    example: 10,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  readonly likes?: number;

  @ApiProperty({
    description: 'The number of visits received by the blog',
    example: 100,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  readonly visits?: number;

  @ApiProperty({
    description: 'Array of comment IDs associated with the blog',
    example: ['613f8e96b97e5a16d8ccf5d4'],
    required: false,
  })
  @IsArray()
  @IsOptional()
  @IsMongoId({ each: true })
  readonly comments?: Comment[];
}
