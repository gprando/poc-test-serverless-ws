import { CustomResponse } from "../functions/abstracts/functions-abstract";

export class Response {
  private static OK = 200;
  private static CREATED = 201;
  private static NO_CONTENT = 204;

  private static BAD_REQUEST = 400;

  private static INTERNAL_SERVER_ERROR = 500;

  private httpCode: number;
  private payload: any;

  constructor(httpCode: number) {
    this.httpCode = httpCode;
  }

  public build(): CustomResponse<any> {
    return {
      statusCode: this.httpCode,
      payload: this.payload
    };
  }

  private setPayload(payload: any): Response {
    this.payload = payload;
    return this;
  }

  public static ok(body?: any): Response {
    const response = new this(Response.OK);
    return response.setPayload(body);
  }

  public static badRequest(body?: any): Response {
    const response = new this(Response.BAD_REQUEST);
    return response.setPayload(body);
  }

  public static created(body?: any): Response {
    const response = new this(Response.CREATED);
    return response.setPayload(body);
  }

  public static noContent(body?: any): Response {
    const response = new this(Response.NO_CONTENT);
    return response.setPayload(body);
  }

  public static internalServerError(body?: any): Response {
    const response = new this(Response.INTERNAL_SERVER_ERROR);
    return response.setPayload(body);
  }

  public static httpCode(httpCode: number): Response {
    return new this(httpCode);
  }
}
