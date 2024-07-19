# Aplicação de Chat com WebSocket usando Nest.js

Esta é uma aplicação de chat WebSocket construída utilizando o Nest.js, integrando funcionalidades de WebSocket para permitir comunicação em tempo real entre clientes e o servidor.

## Descrição

Este projeto utiliza o Nest.js, um framework progressivo para Node.js, para construir aplicações eficientes e escaláveis no lado do servidor. Ele implementa funcionalidades de WebSocket para comunicação bidirecional em tempo real.

## Funcionalidades

- Integração de WebSocket para mensagens em tempo real
- Configuração CORS para comunicação cliente-servidor
- Manipulação de eventos de WebSocket no lado do servidor
- Envio de mensagens para clientes conectados

## Instalação

1. Clone o repositório:

    ```bash
    $ git clone <url_do_repositório>
    ```

2. Instale as dependências:

    ```bash
    $ npm install
    ```

## Uso

1. Inicie o servidor:

    ```bash
    # modo de desenvolvimento
    $ npm run start:dev
    ```

    Isso iniciará o servidor na porta padrão `3000`.

2. Acesse a aplicação cliente:

    Abra `index.html` em um navegador da web para acessar a interface do cliente WebSocket.

## Servidor WebSocket

O servidor WebSocket é implementado utilizando o Nest.js em `AppGateway`. Ele manipula eventos de WebSocket como conexão, desconexão e manipulação de mensagens.

```typescript
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

  handleDisconnect(client: Socket)
