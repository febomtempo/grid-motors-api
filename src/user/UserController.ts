import User, { IUser } from './UserModel';
import { Request, Response } from 'express';
import { checkCepData, getCepData } from './UserService';
import { isObjectIdOrHexString } from 'mongoose';

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

export async function findAllUsers(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const user = await User.find().select('-__v');
    return res.status(200).json(user);
  } catch (err) {
    return res.status(400).json({
      status: 'fail',
      message: 'something went wrong',
    });
  }
}

export async function findUserById(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const { id } = req.params;
    if (!isObjectIdOrHexString(id)) {
      return res.status(400).json({
        status: 'fail',
        message: 'Invalid ID',
      });
    }
    const user = await User.findById(id).select('-__v');
    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'User ID not found',
      });
    }
    return res.status(200).json(user);
  } catch (err) {
    return res.status(400).json({
      status: 'fail',
      message: 'something went wrong',
    });
  }
}

export async function deleteUserById(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const { id } = req.params;
    if (!isObjectIdOrHexString(id)) {
      return res.status(400).json({
        status: 'fail',
        message: 'Invalid ID',
      });
    }
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'User ID not found',
      });
    }
    return res.status(204).json(null);
  } catch (err) {
    return res.status(400).json({
      status: 'fail',
      message: 'something went wrong',
    });
  }
}
