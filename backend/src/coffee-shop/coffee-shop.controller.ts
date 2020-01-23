import {BadRequestException, Controller, Delete, ForbiddenException, Get, Post, UseGuards} from '@nestjs/common';
import {User as LoggedUser} from "../decorators/user.decorator";
import {User} from "../authentication/user.entity";
import {AuthGuard} from "@nestjs/passport";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {Server} from "socket.io";
import {CoffeeShopGateway} from "./coffee-shop.gateway";

@Controller('coffee-shop')
@UseGuards(AuthGuard('jwt'))

export class CoffeeShopController {
    users: User[] = [];
    isOpen = true;

    constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>,
                private readonly gateway: CoffeeShopGateway) {
    }
    @Post('apply')
    async applyForCoffee(@LoggedUser() loggedUser: any) {
        if (!this.isOpen) {
            throw new BadRequestException();
        } else {
            const user = await this.usersRepository.findOne(loggedUser.userId);
            this.users.push(user);
            this.gateway.notifyUsers(this.users);
        }
    }

    @Delete()
    remove(@LoggedUser() loggedUser: any) {
        const idx = this.users.findIndex(x => x.id === loggedUser.userId);
        if (idx !== -1) {
           this.users.splice(idx, 1);
        }
        this.gateway.notifyUsers(this.users);
    }

    @Post('open')
    openCoffeeShop(@LoggedUser() user: any) {
        if (user.username !== 'Petar Milosevic') {
            throw new ForbiddenException("You don't have permission");
        }
    }

    @Get('is-open')
    getOpen() {
        return this.isOpen;
    }

    @Post('close')
    closeShop() {
        this.users = [];
        this.isOpen = false;
        this.gateway.closeShop();
    }

    @Get('users')
    async getUsers() {
        return this.users;
    }
}
