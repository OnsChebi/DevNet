import { Module } from '@nestjs/common';
import { AuthService } from 'src/auth.service';
import { AuthController } from 'src/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { UserService } from 'src/user.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'jwtsecretkey',
      signOptions: { expiresIn: '1h' },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [AuthService, UserService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
