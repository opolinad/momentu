import { buildResponseObject } from '../responses/apiResponse.response';

export class BusinessException extends Error {
  public status: number;
  public message: string;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }

  getResponseObject() {
    return buildResponseObject(this.status, this.message);
  }
}
