import User, { IUser } from './UserModel';
import { Request, Response } from 'express';
import { checkCepData, getCepData } from './UserService';

export async function createUser(
  req: Request,
  res: Response
): Promise<Response> {
  const user: IUser = req.body;
  try {
    const cepData = await getCepData(req.body.cep);
    user.patio = cepData.logradouro;
    user.complement = cepData.complemento;
    user.neighborhood = cepData.bairro;
    user.locality = cepData.localidade;
    user.uf = cepData.uf;
  } catch (err) {
    console.log(err);
  }
  try {
    checkCepData(user);
    const newUser = await User.create(user);
    newUser.password = '';
    return res.status(201).json({
      status: 'success',
      newUser,
      message: 'user created successfully',
    });
  } catch (err) {
    return res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
}
