import { ApiGatewayManagementApi } from "aws-sdk";
import { RealtimeAPIGatewayEventRequestContext } from "../functions/@types";
import ConnectionModel from "../models/connection-model";

export class WebsocketClientService {
  private ws: ApiGatewayManagementApi;
  private connectionId: string;

  constructor(requestContext?: RealtimeAPIGatewayEventRequestContext) {
    const stage = requestContext?.stage || 'local';
    const configHttp = stage.match(/local|dev/gi) ? "http" : "https";
    const domain = requestContext?.domainName ?? 'localhost';
    console.log(`${configHttp}://${domain}:3001`);

    this.ws = new ApiGatewayManagementApi({
      apiVersion: "2018-11-29",
      endpoint: `${configHttp}://${domain}:3001`,
    });
    this.connectionId = requestContext?.connectionId;
  }

  async send(msg: string | unknown, id?: string) {
    // If passed msg is object, it's parsed to JSON
    let parsed = typeof msg === "string" ? msg : JSON.stringify(msg);

    console.log(`Sending ${parsed} to ${id || this.connectionId}`);

    return this.ws
      .postToConnection({
        ConnectionId: id || this.connectionId,
        Data: parsed,
      })
      .promise()
      .catch((err) => {
        console.log(JSON.stringify(err));
      });
  }

  async sendAllConnection(msg: string | unknown) {
    let parsed = typeof msg === "string" ? msg : JSON.stringify(msg);

    console.log(`Sending ${parsed} to all connection`);

    const connections = await ConnectionModel.find();
    const promisesSendMessage = connections.map((c) =>
      this.ws
        .postToConnection({
          ConnectionId: c.connectionId,
          Data: parsed,
        })
        .promise()
        .catch((err) => {
          console.log(JSON.stringify(err));
        })
    );
    return Promise.all(promisesSendMessage);
  }

  async sendToConnectionsId(msg: string | unknown, idConnections: string []) {
    let parsed = typeof msg === "string" ? msg : JSON.stringify(msg);
    const promisesSendMessage = idConnections.map((connectionId) =>
      this.ws
        .postToConnection({
          ConnectionId: connectionId,
          Data: parsed,
        })
        .promise()
        .catch((err) => {
          console.log(JSON.stringify(err));
        })
    );
    return Promise.all(promisesSendMessage);
  }
}
