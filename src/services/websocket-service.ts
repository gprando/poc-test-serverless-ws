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
    await ConnectionModel.findOneAndDelete({connectionId});

    console.log({ connections:  await ConnectionModel.find() });
  }

  public async onMessage(event: WebsocketAPIGatewayEvent): Promise<void> {
    const { requestContext, body } = event;
    const { connectionId } = requestContext;
    const { roomKey, content } = JSON.parse(body);
    const createdAt = new Date().getTime();

    const returnMessage = "Mensagem enviada via websocket com serverless";

    new WebsocketClientService(requestContext).sendAllConnection(returnMessage);

    await MessageModel.create({
      roomKey,
      content,
      createdAt,
      createdBy: connectionId,
    });
  }
}
