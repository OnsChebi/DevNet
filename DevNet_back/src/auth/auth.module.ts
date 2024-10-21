import { Module } from '@nestjs/common';
import { AuthService } from 'src/auth.service';
import { AuthController } from 'src/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { UserService } from 'src/user.service';
import { JwtStrategy } from './jwt.strategy';
import { GoogleStrategy } from './google.strategy'; 
import { GithubStrategy } from './github.strategy'; 
import * as dotenv from 'dotenv';

dotenv.config();
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [
    AuthService,
    UserService,
    JwtStrategy,
    GoogleStrategy,  
    GithubStrategy,  
  ],
  controllers: [AuthController],
})
export class AuthModule {}
