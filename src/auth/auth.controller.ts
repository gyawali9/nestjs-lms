import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { RegisterDto } from 'src/auth/dto/registerUser.dto';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/auth/dto/loginUser.dto';
import { AuthGuard, JwtPayload } from 'src/auth/auth.guard';
import { UserService } from 'src/user/user.service';

@Controller('auth') // /auth prefix for api endpoints
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {
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

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Request() req: { user: JwtPayload }) {
    const userId = req.user.sub;
    const user = await this.userService.getUserById(userId);

    return {
      id: user?._id,
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
    };
  }
}
