import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import * as bcrypt from 'bcryptjs';
import { User } from './user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  // Regular registration method
  async register(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User();
    newUser.email = email;
    newUser.password = hashedPassword;
    return this.userService.create(newUser);
  }

  // Regular email/password validation method
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // Regular login method
  async login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // OAuth login method for Google/GitHub
  async loginOAuth(user: any) {
    // Check if user exists by email
    let existingUser = await this.userService.findByEmail(user.email);

    if (!existingUser) {
      // Create a new user if one doesn't exist
      const newUser = new User();
      newUser.email = user.email;
      newUser.username = user.username || user.email.split('@')[0]; // Handle GitHub username
      newUser.oauthProvider = user.oauthProvider;
      newUser.oauthId = user.oauthId;
      newUser.accessToken = user.accessToken;

      // Save new OAuth user
      existingUser = await this.userService.create(newUser);
    }

    // Create a JWT token for the user
    const payload = { email: existingUser.email, sub: existingUser.id, role: existingUser.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
