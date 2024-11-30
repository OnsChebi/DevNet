import { Controller, Post, Body, Request, UseGuards, Get, Req } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  //the login method
  @Post('login')
  async login(@Body() body: { email: string, password: string }) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (user) {
      return this.authService.login(user);
    }
    return { message: 'Invalid credentials' };
  }

  //the register method
  @Post('register')
  async register(@Body() body: { email: string, password: string }) {
    return this.authService.register(body.email, body.password);
  }

  //---
  @UseGuards(JwtAuthGuard)
  @Post('protected')
  async protected(@Request() req) {
    return req.user;
  }
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleLogin() {
    // Initiates Google OAuth login
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleLoginCallback(@Req() req) {
    // Handles the Google OAuth callback
    return req.user;
  }

  @Get('github')
  @UseGuards(AuthGuard('github'))
  async githubLogin() {
    // Initiates GitHub OAuth login
  }

  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  async githubLoginCallback(@Req() req) {
    // Handles the GitHub OAuth callback
    return req.user;
  }

}
