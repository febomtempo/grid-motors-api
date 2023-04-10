import Joi from 'joi';
import User from '../user/UserModel';

export const reserveSchema = Joi.object({
  start_date: Joi.date().min('now').required(),
  end_date: Joi.date().min('now').required(),
  id_car: Joi.string().trim().required(),
});

export const reserveUpdateSchema = Joi.object()
  .keys({
    start_date: Joi.date().min('now'),
    end_date: Joi.date().min('now'),
    id_car: Joi.string().trim(),
    id_user: Joi.string()
      .trim()
      .custom(async (value, helpers) => {
        const user = await User.findById(value);
        if (user?.qualified !== 'sim') {
          return helpers.error('not.qualified');
        }
        return value;
      })
      .messages({
        'not.qualified': 'User not qualified for a reservation',
      }),
  })
  .min(1);
