import Joi from 'joi';
import { validateCPF } from '../validation/cpfValidation';

const cpfSchema = Joi.string()
  .trim()
  .custom((value, helpers) => {
    if (!validateCPF(value)) {
      // Chama a função validateCPF para validar o CPF.
      return helpers.error('invalid.cpf'); // Se o CPF for inválido, retorna uma mensagem de erro.
    }
    return value; // Se o CPF for válido, retorna o valor original.
  })
  .messages({
    'invalid.cpf': `Invalid CPF`,
  });

const birthSchema = Joi.date()
  .max('now')
  .raw()
  .custom((value, helpers) => {
    const diffTime = Math.abs(+new Date() - +new Date(value));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const age = Math.floor(diffDays / 365.25);
    if (age < 18) {
      return helpers.error('age.min', { limit: 18 });
    }
    return value;
  })
  .messages({
    'age.min': `You have to be {#limit} years old or more`,
  });

export const userSchema = Joi.object({
  name: Joi.string().trim().min(2).max(40).required(),
  email: Joi.string().trim().email().min(2).max(40).required(),
  cpf: cpfSchema.required(),
  birth: birthSchema.required(),
  password: Joi.string().trim().min(6).max(40).required(),
  cep: Joi.string()
    .trim()
    .regex(/^\d+$/)
    .message('Cep must have only positive numbers')
    .required(),
  qualified: Joi.string().trim().valid('sim', 'não').required(),
});

export const updateUserSchema = Joi.object()
  .keys({
    name: Joi.string().trim(),
    email: Joi.string().trim().email(),
    cpf: cpfSchema,
    birth: birthSchema,
    password: Joi.string().trim().min(6),
    cep: Joi.string()
      .trim()
      .regex(/^\d+$/)
      .message('Cep must have only positive numbers'),
    qualified: Joi.string().trim().valid('sim', 'não'),
  })
  .min(1);
