import {Controller, Param, Post} from '@nestjs/common';
import axios from 'axios'
import { JwtService } from '@nestjs/jwt';
import {blobToBase64 } from 'base64-blob';
import {Repository} from "typeorm";
import {User} from "./user.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Controller('authentication')
export class AuthenticationController {

    constructor(private readonly jwt: JwtService,
                @InjectRepository(User) private readonly usersRepository: Repository<User>) {
    }

    @Post('login/:token')
    async login(@Param('token') accessToken: string) {
        const me = `https://graph.microsoft.com/v1.0/me`;
        const header = {headers: {'Authorization': `Bearer ${accessToken}`}};
        const { data: userInfo } = await axios.get(me, header);
        const { data: photo } = await axios.get(`${me}/photo/$value`, {...header, responseType: 'arraybuffer'});
        const photoBase64 = Buffer.from(photo).toString('base64');
        const user = await this.usersRepository.save({id: userInfo.id, name: userInfo.displayName, photo: photoBase64});
        return {
            accessToken: this.jwt.sign({id: user.id, name: user.name, role: user.name === "Petar Milosevic" ? 'admin' : 'user'})
        }
    }
}
