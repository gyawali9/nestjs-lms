import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { LoginDto } from 'src/auth/dto/loginUser.dto';

import { RegisterDto } from 'src/auth/dto/registerUser.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async registerUser(registerUserDto: RegisterDto) {
    const hash = await bcrypt.hash(registerUserDto.password, 10);
    // Logic for registering a user
    // 1. check if email already exists
    // 2. hash password
    // 3. save user to database
    // 4. generate JWT token
    // 5. send token in response

    const user = await this.userService.createUser({
      ...registerUserDto,
      password: hash,
    });

    const payload = { sub: user._id, email: user.email };

    const token = await this.jwtService.signAsync(payload);

    console.log(token, 'whatistoken');

    return { access_token: token };
  }

  async loginUser(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = { sub: user._id, email: user.email };
    const token = await this.jwtService.signAsync(payload);
    return {
      access_token: token,
    };
    //  1. receive email and password
    //  2. match the email and password
    //  3. generate JWT token
    //  4. send token in response
  }
}
