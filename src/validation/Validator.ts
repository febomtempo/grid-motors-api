import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { errorMessage } from '../utils/ErrorHandling';

export function validate(schema: Joi.ObjectSchema) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (err: unknown) {
      if (errorMessage(err)) {
        return res.status(400).json({ error: err.message });
      }
      return res.status(400).json({ error: err });
    }
  };
}
