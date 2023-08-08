import { HttpStatus } from '@nestjs/common';
import { Response, Request } from 'express';

export class HttpResponse {
  static ok = (
    res: Response,
    data = {},
    message = 'Request successful',
    status = HttpStatus.OK,
  ) => {
    return res.status(status).json({ data, message });
  };
  static created = (
    res: Response,
    data = {},
    message = 'Resource created',
    status = HttpStatus.CREATED,
  ) => {
    return res.status(status).json({ data, message });
  };
}
