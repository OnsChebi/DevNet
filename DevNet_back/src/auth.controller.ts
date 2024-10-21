import { Controller, Post, Body, Request, UseGuards, Get, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  // Login method
  @Post('login')
  async login(@Body() body: { email: string, password: string }) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (user) {
      return this.authService.login(user);
    }
    return { message: 'Invalid credentials' };
  }

  // Register method
  @Post('register')
  async register(@Body() body: { email: string, password: string }) {
    return this.authService.register(body.email, body.password);
  }

  // JWT-protected route
  @UseGuards(JwtAuthGuard)
  @Post('protected')
  async protected(@Request() req) {
    return req.user;
  }

  // --- Google OAuth ---

  // Route to initiate Google login
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleLogin() {
    // Initiates Google OAuth flow
  }

  // Callback URL for Google login
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleLoginCallback(@Request() req, @Res() res) {
    const token = await this.authService.loginOAuth(req.user); // generate token
    // Redirect to frontend with the token (this could be a query param)
    res.redirect(`/home?token=${token.access_token}`);
  }

  // --- GitHub OAuth ---

  // Route to initiate GitHub login
  @Get('github')
  @UseGuards(AuthGuard('github'))
  async githubLogin() {
    // Initiates GitHub OAuth flow
  }

  // Callback URL for GitHub login
  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  async githubLoginCallback(@Request() req, @Res() res) {
    const token = await this.authService.loginOAuth(req.user); // generate token
    // Redirect to frontend with the token (this could be a query param)
    res.redirect(`/home?token=${token.access_token}`);
  }
}
