import { v2 } from 'cloudinary';

export const CloudinaryProvider = {
  provide: 'Cloudinary', // đặt tên
  useFactory: () => {
    return v2.config({
      // v2: là nơi để kết nối tới cloudinary, cần 3 thông số: name, api_key, api_secret
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_API_KEY,
      api_secret: process.env.CLOUD_API_SECRET,
    });
  },
};
