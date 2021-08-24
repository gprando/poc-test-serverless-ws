import { ApiGatewayManagementApi } from "aws-sdk";
import { RealtimeAPIGatewayEventRequestContext } from "../functions/@types";
import ConnectionModel from "../models/connection-model";

export class WebsocketClientService {
  private ws: ApiGatewayManagementApi;
  private connectionId: string;

  constructor(requestContext: RealtimeAPIGatewayEventRequestContext) {
    const { stage } = requestContext;
    const configHttp = stage.match(/local|dev/gi) ? "http" : "https";
    console.log(`${configHttp}://${requestContext.domainName}:3001`);

    this.ws = new ApiGatewayManagementApi({
      apiVersion: "2018-11-29",
      endpoint: `${configHttp}://${requestContext.domainName}:3001`,
    });
    this.connectionId = requestContext.connectionId;
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
}
