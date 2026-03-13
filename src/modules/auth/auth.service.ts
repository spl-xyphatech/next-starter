import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { UsersService } from 'src/modules/users/users.service';
import { SignInDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
  constructor(
    private config: ConfigService,
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async login(data: SignInDto) {
    const result = await this.usersService.findByEmail(data.email);
    if (!result) throw new ForbiddenException('Invalid Credentials');

    const { password, ...usr } = result;
    // verify pass hash
    const isVerify = await argon2.verify(password, data.password);
    if (!isVerify) throw new ForbiddenException('Invalid Credentials');

    // get tokens
    const tokens = await this.getTokens({
      sub: usr.id,
      email: usr.email,
      roleId: usr.roleId,
      branchId: usr.branchId,
    });
    return {
      user: usr,
      ...tokens,
    };
  }

  async getTokens(payload: Record<string, string | null>) {
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.config.get<string>('JWT_ACCESS_SECRET'),
        expiresIn: this.config.get<string>('JWT_ACCESS_EXPIRE'),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.config.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: this.config.get<string>('JWT_REFRESH_EXPIRE'),
      }),
    ]);

    return {
      access_token,
      refresh_token,
    };
  }
}
