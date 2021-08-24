import { Document, Schema, Model, model } from "mongoose";
import { IValidatorSchema } from "../interfaces/IValidatorSchema";
import { IMessage } from "../interfaces/message-interface";

export interface IMessageModel extends IMessage, Document {}

export interface MessageDocument extends IMessageModel {}

export interface MessageModel extends Model<MessageDocument> {}

export const MessageValidatorSchema: IValidatorSchema = {
  type: "object",
  properties: {
    body: {
      type: "object",
      properties: {
        roomKey: { type: "string", minLength: 6, maxLength: 64 },
        createdAt: { type: "number" },
        createdBy: { type: "string", minLength: 6, maxLength: 64 },
        content: { type: "string", minLength: 6, maxLength: 64 },
      },
      required: ["roomKey", "createdAt", "createdBy", "content"],
    },
  },
};

export const MessageSchema: Schema = new Schema({
  roomKey: { type: String },
  createdAt: { type: Number },
  createdBy: { type: String },
  content: { type: String },
});

global.MessageSchema =
  global.MessageSchema ||
  model<MessageDocument, MessageModel>("Message", MessageSchema);

export default global.MessageSchema as MessageModel;
