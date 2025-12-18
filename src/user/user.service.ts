import { Model } from 'mongoose';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { RegisterDto } from 'src/auth/dto/registerUser.dto';
import { DUPLICATE_KEY_CODE } from 'src/constant';
import { User } from 'src/user/schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(registerUserDto: RegisterDto) {
    try {
      return await this.userModel.create({
        firstName: registerUserDto.firstName,
        lastName: registerUserDto.lastName,
        email: registerUserDto.email,
        password: registerUserDto.password,
      });
    } catch (err: unknown) {
      const e = err as { code?: number };
      if (e.code === DUPLICATE_KEY_CODE) {
        throw new ConflictException('Email already exists');
      }
      throw err;
    }
  }
}
