import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, VerifyCallback } from 'passport-github2';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity'; 

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, 
  ) {
    super({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/github/callback',
      scope: ['user:email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { username, emails, id } = profile;

    // Check if user exists by email or oauthId
    let user = await this.userRepository.findOne({
      where: [{ email: emails[0].value }, { oauthId: id }],
    });

    // If user does not exist, create a new one
    if (!user) {
      user = this.userRepository.create({
        email: emails[0].value,
        username: username,
        oauthProvider: 'github',
        oauthId: id,
        accessToken,
      });
      await this.userRepository.save(user);
    }

    done(null, user);
  }
}
