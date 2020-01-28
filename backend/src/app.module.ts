import {Module} from '@nestjs/common';
import {AuthenticationModule} from './authentication/authentication.module';
import {CoffeeShopModule} from './coffee-shop/coffee-shop.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from './authentication/user.entity';
import {ServeStaticModule} from '@nestjs/serve-static';
import {join} from 'path';

@Module({
    imports: [AuthenticationModule, CoffeeShopModule, TypeOrmModule.forRoot({
        type: 'sqlite',
        database: './coffee.db',
        synchronize: true,
        entities: [User],
    }), ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'frontend'),
    })],
    controllers: [],
    providers: [],
})
export class AppModule {
}
