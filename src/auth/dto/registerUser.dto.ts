import { IsDefined, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterDto {
  @IsDefined({ message: 'First name is required' })
  @IsString({ message: 'First name must be a string' })
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
