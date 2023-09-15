import express from 'express';
import { catRoutes } from './cats';
import { dogRoutes } from './dogs';

const router = express.Router();

router.use('/cats', catRoutes);
router.use('/dogs', dogRoutes);

export {
  router as v1Routes,
};
