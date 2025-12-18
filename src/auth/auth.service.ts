import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';

import { RegisterDto } from 'src/auth/dto/registerUser.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async registerUser(registerUserDto: RegisterDto) {
    console.log(registerUserDto);

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
}
