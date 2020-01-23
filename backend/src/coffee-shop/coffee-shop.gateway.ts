import {OnGatewayConnection, WebSocketGateway, WebSocketServer} from "@nestjs/websockets";
import {Server} from "socket.io";
import {User} from "../authentication/user.entity";

@WebSocketGateway(3001)
export class CoffeeShopGateway implements OnGatewayConnection {
    @WebSocketServer() server: Server;

    notifyUsers(users: User[]) {
        this.server.emit('USERS', users);
    }

    closeShop() {
        this.server.emit('CLOSE');
    }

    handleConnection(client: any, ...args: any[]): any {
        console.log('Client connected');
    }

}