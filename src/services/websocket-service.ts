import { WebsocketAPIGatewayEvent } from "../functions/@types";
import { WebsocketClientService } from "./websocket-client-service";
import ConnectionModel from "../models/connection-model";
import MessageModel from "../models/message-model";

export class WebsocketService {
  public async onConnect(event: WebsocketAPIGatewayEvent): Promise<void> {
    const {
      requestContext: { connectionId },
    } = event;
    const joinedAt = new Date().getTime();
    await ConnectionModel.create({ connectionId, roomKey: "", joinedAt });
    console.log({ connections: await ConnectionModel.find() });
  }

  public async onDisconnect(event: WebsocketAPIGatewayEvent): Promise<void> {
    const {
      requestContext: { connectionId },
    } = event;
    const { roomKey, nickName } = await ConnectionModel.findOneAndDelete({
      connectionId,
    });

    const message = `${nickName} saiu da sala`;

    await this.notificationRoom(roomKey, message);
  }

  public async joinRoom(event: WebsocketAPIGatewayEvent): Promise<void> {
    const { requestContext, body } = event;
    const { connectionId } = requestContext;
    const { roomKey, nickName } = JSON.parse(body);

    // atualizar a sala e nick da conexão
    await ConnectionModel.findOneAndUpdate(
      { connectionId },
      { roomKey, nickName }
    );

    const message = `${nickName}  entrou na sala`;
    await this.notificationRoom(roomKey, message);
  }

  public async onMessage(event: WebsocketAPIGatewayEvent): Promise<void> {
    const { requestContext, body } = event;
    const { connectionId } = requestContext;
    const { roomKey, content } = JSON.parse(body);
    const createdAt = new Date().getTime();

    const [connection] = await Promise.all([
      ConnectionModel.findOne({ connectionId }),
      MessageModel.create({
        roomKey,
        content,
        createdAt,
        createdBy: connectionId,
      }),
    ]);
    const now = new Date();
    const nowFormatted = new Intl.DateTimeFormat("pt-BR").format(now);

    const message = `${connection.nickName} [${nowFormatted}]: ${content}`;

    await this.notificationRoom(roomKey, message);
  }

  /**
   * Como para teste tudo será local, não precisa receber nem armazenar o domínio para dar retorno
   */
  private async notificationRoom(roomKey: string, message: string) {
    const connections = await ConnectionModel.find({ roomKey }).select(
      "connectionId"
    );
    const connectionsIdFromRoom = connections.map((c) => c.connectionId);
    const ws = new WebsocketClientService();

    await ws.sendToConnectionsId(message, connectionsIdFromRoom);
  }
}
