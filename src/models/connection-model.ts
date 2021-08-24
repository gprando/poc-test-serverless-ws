import { Document, Schema, Model, model } from "mongoose";
import { IValidatorSchema } from "../interfaces/IValidatorSchema";
import { IConnection } from "../interfaces/connection-interface";

export interface IConnectionModel extends IConnection, Document {}

export interface ConnectionDocument extends IConnectionModel {}

export interface ConnectionModel extends Model<ConnectionDocument> {}

export const ConnectionValidatorSchema: IValidatorSchema = {
  type: "object",
  properties: {
    body: {
      type: "object",
      properties: {
        connectionId: { type: "string", minLength: 6, maxLength: 64 },
        roomKey: { type: "string", minLength: 6, maxLength: 64 },
        joinedAt: { type: "number" },
      },
      required: ["connectionId", "roomKey", "joinedAt"],
    },
  },
};

export const ConnectionSchema: Schema = new Schema({
  connectionId: { type: String },
  roomKey: { type: String },
  joinedAt: { type: Number },
});

global.ConnectionSchema = global.ConnectionSchema || model<ConnectionDocument, ConnectionModel>(
  "Connection",
  ConnectionSchema
);

export default global.ConnectionSchema as ConnectionModel;
