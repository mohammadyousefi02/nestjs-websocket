import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server } from 'http';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000'],
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  users: number = 0;
  handleDisconnect() {
    console.log("connect shod")
    this.users++;
    this.server.emit('users', this.users);
  }
  handleConnection() {
    this.users--;
    this.server.emit('users', this.users);
  }

  @SubscribeMessage('chat')
  async onChat(client: any, data: any) {
    console.log(data)
    this.server.emit('u-chat', data);
  }
}
