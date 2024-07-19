import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
    method: ['GET', 'POST'],
    allowedHeaders: ['X-API-TOKEN']
  }
})
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  private messages: any[] = []

  @WebSocketServer() server: Server
  private logger: Logger = new Logger('AppGateway')

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, payload: string): void {
    console.log('msgToServer',payload)
    const message = {
      text: payload,
      clientId: client.id
    }
    this.server.emit('msgToClient', payload, client.id)
    this.messages.push(message)
    console.log(this.messages)
  }

  afterInit(server: Server){
    this.logger.log('Init')
  }

  handleConnection(client: Socket) {
    this.logger.log('Client connected: ', client.id)
    this.server.emit('oldMessages', this.messages)
  }

  handleDisconnect(client: Socket) {
    this.logger.log('Client disconnected: ', client.id)
  }
}
