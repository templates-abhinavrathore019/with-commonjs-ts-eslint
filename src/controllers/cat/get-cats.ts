import { Request, Response, NextFunction } from 'express';
import { getCats } from '../../services/cat/get-cats';

const getCatsHandler = async (req: Request, res: Response, next: NextFunction) => {
  const {
    page,
    limit,
  } = req.query;

  const params = {
    page: (!Number.isNaN(Number(page))) ? Number(page) : undefined,
    limit: (!Number.isNaN(Number(limit))) ? Number(limit) : undefined,
  };

  const response = await getCats(params);

  res.locals = response;
  next();
};

export {
  getCatsHandler,
};
