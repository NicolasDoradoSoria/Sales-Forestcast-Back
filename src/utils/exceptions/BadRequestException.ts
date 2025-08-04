import { HttpException } from "./HttpException.js";

export class BadRequestException extends Error {
  public details?: any;

  constructor(message: string, details?: any) {
    super(message);
    this.name = 'BadRequestException';
    this.details = details;
  }
}