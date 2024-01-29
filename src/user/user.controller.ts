import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AuthGuard } from '@nestjs/passport';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@UseGuards(AuthGuard('jwt')) // middleware authentication: AuthGuard, coi token có hợp lệ không, chưa check token đó có phải của user gửi request không?
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<string> {
    console.log(createUserDto);
    return this.userService.create(createUserDto);
  }

  // khi call tới SQL hay system khác thì response của controller là Promise<>
  // @UseGuards(AuthGuard('jwt'))
  @ApiParam({ name: 'page', required: false })
  @ApiParam({ name: 'size', required: false })
  @ApiQuery({
    name: 'filter',
    required: false,
    description: 'filter by full_name',
  })
  @Get('/:page/:size')
  findAll(
    @Param('page') page,
    @Param('size') size,
    @Query('filter') filter,
  ): Promise<any> {
    let numPage = Number(page);
    let numSize = Number(size);
    let skip = (numPage - 1) * numSize;
    return this.userService.findAll(skip, numSize, filter);
  }

  @Get('/test/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Post('/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: process.cwd() + '/public/img',
        filename: (req, file, callback) => {
          callback(null, new Date().getTime() + `${file.originalname}`);
        },
      }),
    }),
  )
  upload(@UploadedFile('file') file) {
    return file;
  }
}
