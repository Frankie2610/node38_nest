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
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@ApiTags('user')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt')) // middleware authentication: AuthGuard, coi token có hợp lệ không, chưa check token đó có phải của user gửi request không?
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private cloudinaryService: CloudinaryService,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<string> {
    console.log(createUserDto);
    return this.userService.create(createUserDto);
  }

  // khi call tới SQL hay system khác thì response của controller là Promise<>
  @ApiParam({ name: 'page', description: 'page number' })
  @ApiParam({
    name: 'size',
    required: false,
    description: 'number of users in one page',
  })
  @ApiQuery({
    name: 'filter',
    required: false,
    description: 'filter by full_name',
  })
  // @ApiBearerAuth()
  // @UseGuards(AuthGuard('jwt')) //middleware authentication
  @Get('/:page/:size')
  findAll(
    @Param('page') page,
    @Param('size') size,
    @Query('filter') filter,
    @Req() req,
  ): Promise<any> {
    console.log(req.user);
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

  // C1: upload file lên server backend
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

  // C2: upload file lên cloud, thư viện (buffer-to-stream) hỗ trợ file hình < 10MB
  @Post('/upload-cloud')
  @UseInterceptors(FileInterceptor('file'))
  uploadCloud(@UploadedFile('file') file: Express.Multer.File) {
    return this.cloudinaryService.uploadImage(file);
  }
}
