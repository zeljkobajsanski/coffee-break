import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {JwtStrategy} from "./jwt.strategy";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./user.entity";

@Module({
  imports: [
      PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({secret: 'secret', signOptions: {expiresIn: '1d'}}),
      TypeOrmModule.forFeature([User])
  ],
  controllers: [AuthenticationController],
  providers: [JwtStrategy]
})
export class AuthenticationModule {}
