// tạo function upload file lên cloudinary

import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream'); // thư viện khá lâu chưa update nên
// phải import kiểu ES5

@Injectable()
export class CloudinaryService {
  async uploadImage(
    file: Express.Multer.File,
    // kết quả trả về là 1 promise, do kết nối với bên thứ 3
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolver, reject) => {
      // resolver: thành công
      // reject: thất bại
      const upload = v2.uploader.upload_stream((error, result) => {
        if (error) {
          reject(error);
        }
        resolver(result);
      });
      // dùng thư viện "buffer-to-stream"
      // buffer: nơi lưu hình ở local mình
      toStream(file.buffer).pipe(upload); // upload file lên cloudinary
    });
  }
}
