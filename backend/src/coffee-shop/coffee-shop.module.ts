import { Module } from '@nestjs/common';
import { CoffeeShopController } from './coffee-shop.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../authentication/user.entity";
import { CoffeeShopGateway } from "./coffee-shop.gateway"

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [CoffeeShopController],
  providers: [CoffeeShopGateway]
})
export class CoffeeShopModule {}
