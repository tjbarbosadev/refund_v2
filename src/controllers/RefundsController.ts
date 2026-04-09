import { Request, Response } from 'express';

class RefundsController {
  async create(req: Request, res: Response) {
    res.json({ message: 'Refund created' });
  }

  async index(req: Request, res: Response) {
    res.json({ message: 'Refunds index' });
  }
}

export { RefundsController };
