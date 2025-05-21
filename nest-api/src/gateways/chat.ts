import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: { origin: process.env.HEADLESS_URL || 'http://localhost:3000' },
})
export class Chat
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private users = new Map<string, string>();

  afterInit() {
    console.log('Chat Gateway Initialized');
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    this.users.delete(client.id);
    this.server.emit('userList', Array.from(this.users.values()));
  }

  @SubscribeMessage('joinChat')
  handleJoin(
    @MessageBody() username: string,
    @ConnectedSocket() client: Socket,
  ) {
    this.users.set(client.id, username);
    console.log(`${username} joined the chat`);
    this.server.emit('userList', Array.from(this.users.values()));
    return { event: 'joined', data: username };
  }

  @SubscribeMessage('sendMessage')
  handleMessage(@MessageBody() data: { username: string; message: string }) {
    console.log(`${data.username} ${data.message}`);
    this.server.emit('receiveMessage', data);
  }
}
