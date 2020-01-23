import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { CoffeeShopModule } from './coffee-shop/coffee-shop.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./authentication/user.entity";

@Module({
  imports: [AuthenticationModule, CoffeeShopModule, TypeOrmModule.forRoot({
    type: 'sqlite',
    database: './coffee.db',
    synchronize: true,
    entities: [User]
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
