import Joi from 'joi';

export const carSchema = Joi.object({
  model: Joi.string().trim().min(2).max(40).required(),
  color: Joi.string().trim().min(2).max(20).required(),
  year: Joi.number().min(1950).max(2023).required(),
  value_per_day: Joi.number().min(1).required(),
  accessories: Joi.array().min(1).required(),
  number_of_passengers: Joi.number().min(1).required(),
});

export const carUpdateSchema = Joi.object()
  .keys({
    model: Joi.string().trim().min(2).max(40),
    color: Joi.string().trim().email().min(2).max(20),
    year: Joi.number().min(1950).max(2023),
    value_per_day: Joi.number(),
    accessories: Joi.string().trim().min(2).max(40),
    number_of_passengers: Joi.number().min(1),
  })
  .min(1);
