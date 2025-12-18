import { Body, Controller, Post } from '@nestjs/common';

import { RegisterDto } from 'src/auth/dto/registerUser.dto';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/auth/dto/loginUser.dto';

@Controller('auth') // /auth prefix for api endpoints
export class AuthController {
  constructor(private readonly authService: AuthService) {
    this.authService = authService;
  }
  @Post('register')
  async register(@Body() registerUserDto: RegisterDto) {
    const createdUser = await this.authService.registerUser(registerUserDto);
    return createdUser;
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginDto) {
    const loggedInUser = await this.authService.loginUser(loginUserDto);
    return loggedInUser;
  }
}
