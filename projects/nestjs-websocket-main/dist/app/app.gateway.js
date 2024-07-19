"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppGateway = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
let AppGateway = class AppGateway {
    constructor() {
        this.messages = [];
        this.logger = new common_1.Logger('AppGateway');
    }
    handleMessage(client, payload) {
        console.log('msgToServer', payload);
        const message = {
            text: payload,
            clientId: client.id
        };
        this.server.emit('msgToClient', payload, client.id);
        this.messages.push(message);
        console.log(this.messages);
    }
    afterInit(server) {
        this.logger.log('Init');
    }
    handleConnection(client) {
        this.logger.log('Client connected: ', client.id);
        this.server.emit('oldMessages', this.messages);
    }
    handleDisconnect(client) {
        this.logger.log('Client disconnected: ', client.id);
    }
};
exports.AppGateway = AppGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], AppGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('msgToServer'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", void 0)
], AppGateway.prototype, "handleMessage", null);
exports.AppGateway = AppGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
            method: ['GET', 'POST'],
            allowedHeaders: ['X-API-TOKEN']
        }
    })
], AppGateway);
//# sourceMappingURL=app.gateway.js.map