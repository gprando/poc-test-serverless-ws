import { Handler } from "aws-lambda/handler";
import { ConnectFunction } from "./functions/connect-function";
import { DefaultFunction } from "./functions/default-function";
import { DisconnectFunction } from "./functions/disconnect-function";
import { JoinRoomFunction } from "./functions/join-room-function";
import { OnMessageFunction } from "./functions/on-message-function";

export const connectFunction: Handler = (event, context) => ConnectFunction.getInstance().run(event, context);

export const disconnectFunction: Handler = (event, context) => DisconnectFunction.getInstance().run(event, context);

export const defaultFunction: Handler = (event, context) => DefaultFunction.getInstance().run(event, context);

export const onMessageFunction: Handler = (event, context) => OnMessageFunction.getInstance().run(event, context);

export const joinRoom: Handler = (event, context) => JoinRoomFunction.getInstance().run(event, context);
