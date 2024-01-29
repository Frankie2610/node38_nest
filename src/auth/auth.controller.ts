import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import loginDTO from './dto/login.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body() body: loginDTO): Promise<any> {
    // B1: lấy email, password từ req body
    // B2: check email bằng cách query xuống db
    // Nếu tồn tại user
    // ----Check password
    // ---Check password từ req body vs password từ user
    // ---Nếu trùng -> tạo token
    // --- nếu ko trùng -> báo lỗi
    // Nếu ko tồn tại user => lỗi
    // khi define API => tạo API trong controller và function tương ứng trong service
    return this.authService.login(body); // truyền body xuống login trong auth.service xử lý tiếp
  }

  @Post('/sign-up')
  signUp() {
    return this.authService.signUp();
  }

  @Post()
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
