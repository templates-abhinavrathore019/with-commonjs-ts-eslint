import { Request, Response } from 'express';
import { getDogById } from '../../services/dog/get-dog-by-id';

const getDogByIdHandler = async (req: Request, res: Response) => {
  const {
    id,
  } = req.params;

  const params = {
    id,
  };

  const response = await getDogById(params);

  const {
    httpStatus,
    apiStatus,
    message,
    data,
  } = response;

  res.status(httpStatus).send({
    status: apiStatus,
    message,
    data,
  });
};

export {
  getDogByIdHandler,
};
