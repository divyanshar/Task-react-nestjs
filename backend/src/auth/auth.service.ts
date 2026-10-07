import {BadRequestException,Injectable,UnauthorizedException} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service.js';
import { SignupDto, LoginDto } from './dto/auth.dto.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto) {
    const userExist = await this.usersService.findByEmail(signupDto.email);
    if (userExist) {
      throw new BadRequestException('Email already registered');
    }
    const hashedPassword = await bcrypt.hash(signupDto.password, 10);

    const user = await this.usersService.createUser({
      ...signupDto,
      password:hashedPassword,
    });
    return {
      message: 'User registered successfully,Please log in',
      //user:user,
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const checkPass = await bcrypt.compare(loginDto.password,user.password);

    if (!checkPass) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const payload = {sub: user.id,email: user.email};
    const accessToken = await this.jwtService.signAsync(payload);
    return {
      message: 'Login successful',
      accessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}