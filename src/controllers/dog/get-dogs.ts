import { Request, Response, NextFunction } from 'express';
import { getDogs } from '../../services/dog/get-dogs';

const getDogsHandler = async (req: Request, res: Response, next: NextFunction) => {
  const {
    page,
    limit,
  } = req.query;

  const params = {
    page: (!Number.isNaN(Number(page))) ? Number(page) : undefined,
    limit: (!Number.isNaN(Number(limit))) ? Number(limit) : undefined,
  };

  const response = await getDogs(params);

  res.locals = response;
  next();
};

export {
  getDogsHandler,
};
