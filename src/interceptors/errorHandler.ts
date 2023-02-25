import { HttpException } from "@nestjs/common";

export const errorHandler = (err: HttpException) => {
  throw err;
}