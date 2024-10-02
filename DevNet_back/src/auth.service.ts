import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import * as bcrypt from 'bcryptjs';
import { User } from './user/user.entity';

@Injectable()
export class AuthService {
  constructor(private userService: UserService,private jwtService: JwtService,) {}
  
  async register(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User();
    newUser.email = email;
    newUser.password = hashedPassword;
    return this.userService.create(newUser);
  }
  
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

}
