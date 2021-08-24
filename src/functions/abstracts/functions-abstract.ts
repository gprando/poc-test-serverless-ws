import { Context } from "aws-lambda";
import { MongoClient } from "../../config/MongoClient";

export interface CustomResponse<T> {
  statusCode: number;
  payload: T;
}

export abstract class FunctionAbstract<REQUEST, RESPONSE> {
  protected async getMongoConnection() {
    await MongoClient.connect();
  }
  
  protected abstract buildRequest(body: any): REQUEST;
  protected abstract execute(
    request: REQUEST
  ): Promise<CustomResponse<RESPONSE>>;
  async run(
    payload: string,
    context: Context
  ): Promise<CustomResponse<RESPONSE>> {
    context.callbackWaitsForEmptyEventLoop = false;
    try {
      await this.getMongoConnection();
      const request = this.buildRequest(payload);
      return await this.execute(request);
    } catch (error) {
      console.log("Error", error);
    }
  }
}
