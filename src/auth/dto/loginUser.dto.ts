import { IsDefined, IsEmail, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsDefined({ message: 'Email is required' })
  email: string;

  @IsDefined({ message: 'Password is required' })
  @MinLength(6)
  password: string;
}
