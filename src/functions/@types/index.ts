import { APIGatewayEvent, APIGatewayEventRequestContext } from 'aws-lambda';

export interface RealtimeAPIGatewayEventRequestContext
  extends APIGatewayEventRequestContext {
  connectionId: string;
  connectedAt: number;
}

export interface WebsocketAPIGatewayEvent extends APIGatewayEvent {
  requestContext: RealtimeAPIGatewayEventRequestContext;
}
