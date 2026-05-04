import { Request, Response, NextFunction } from 'express';

class DeliveryLogsController {
  async create(request: Request, response: Response, next: NextFunction) {
    return response.json({ message: 'ok' });
  }
}

export { DeliveryLogsController };
