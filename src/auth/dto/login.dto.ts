import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
// npm i class-validator

export default class loginDTO {
  @ApiProperty({ type: String, description: 'email' })
  @IsEmail() // yêu cầu địng dạng là email, cần cài thêm thư viện "class-validator"
  email: string;

  @ApiProperty({ type: String, description: 'pass_word' })
  @IsNotEmpty()
  pass_word: string;
}
