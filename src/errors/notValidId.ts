import { HttpException, HttpStatus } from '@nestjs/common';

export class NotValidIdException extends HttpException {
  constructor() {
    super('Wrong id', HttpStatus.BAD_REQUEST);
  }
}
