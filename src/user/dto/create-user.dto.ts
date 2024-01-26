// define cho FE biết user trả về có những phiêu (cột) nào?
export class CreateUserDto {
  email: string;
  full_name: string;
  avatar: string;
  pass_word: string;
  role: string;
}
