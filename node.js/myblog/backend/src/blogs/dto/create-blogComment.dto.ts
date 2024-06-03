import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBlogCommentDto {
  @ApiProperty({
    description: 'Comment content',
    example: '613f8e96b97e5a16d8ccf5d4',
  })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({
    description: 'Full name of comment author',
    example: 'Anna Cramlin',
  })
  @IsString()
  @IsNotEmpty()
  fullname: string;
}
