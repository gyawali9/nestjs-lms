import { Body, Controller, Post } from '@nestjs/common';

import { RegisterDto } from 'src/auth/dto/registerUser.dto';
import { AuthService } from './auth.service';

@Controller('auth') // /auth/register
export class AuthController {
  constructor(private readonly authService: AuthService) {
    this.authService = authService;
  }
  @Post('register')
  async register(@Body() registerUserDto: RegisterDto) {
    const createdUser = await this.authService.registerUser(registerUserDto);
    return createdUser;
  }
}
