import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
  Get,
  Req,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //the login method
  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    console.log('Received login request:', body);
    const user = await this.authService.validateUser(body.email, body.password);
    if (user) {
      return this.authService.login(user);
    }
    return { message: 'Invalid credentials' };
  }

  //the register method
  @Post('register')
  async register(@Body() body: { email: string; password: string }) {
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

  }

  // Handles the Google OAuth callback after Google redirects the user back
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))  // Handles callback after Google authentication
  async googleLoginCallback(@Req() req) {
    return req.user;  // Return the user information to the client
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
