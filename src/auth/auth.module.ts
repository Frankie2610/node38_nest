import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/strategy/jwt.strategy';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy], // do JwtStrategy đã custom rồi nên đểowr providers, còn JwtModule.register({}) là thư viện ngoài nên để trong imports
})
export class AuthModule {}
