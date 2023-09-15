import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import {
  getPaginatedResults,
  validateQueryParams,
  validateParams,
} from '../../../middlewares';
import {
  getDogByIdSchema,
  getDogsListSchema,
} from '../../../validation/dog';
import { getDogsHandler } from '../../../controllers/dog/get-dogs';
import { getDogByIdHandler } from '../../../controllers/dog/get-dog-by-id';

const router = express.Router();

router.get(
  '/',
  validateQueryParams(getDogsListSchema),
  expressAsyncHandler(getDogsHandler),
  getPaginatedResults('dogs'),
);

router.get(
  '/:id',
  validateParams(getDogByIdSchema),
  expressAsyncHandler(getDogByIdHandler),
);

export {
  router as dogRoutes,
};
