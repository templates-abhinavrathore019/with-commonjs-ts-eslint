import Joi from 'joi';

const getCatsListSchema = Joi.object({
  limit: Joi.number().optional(),
  page: Joi.number(),
  debug: Joi.boolean(),
});

const getCatByIdSchema = Joi.object({
  id: Joi.string().required(),
  debug: Joi.boolean(),
});

export {
  getCatsListSchema,
  getCatByIdSchema,
};
