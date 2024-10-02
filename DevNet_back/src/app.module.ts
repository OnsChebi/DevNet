import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',       
      port: 3306,              
      username: 'root',        
      password: 'root',            
      database: 'dev_net',      
      entities: [User],        
      synchronize: true,       
    }),
    TypeOrmModule.forFeature([User]),
    AuthModule,
  ],
})
export class AppModule {}
