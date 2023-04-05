import axios from 'axios';
import { IUser } from './UserModel';

export async function getCepData(cep: string) {
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json`);
    const viaCepData = response.data;
    return viaCepData;
  } catch (error) {
    console.error(error);
  }
}

export function checkCepData(user: IUser) {
  if (!user.patio || !user.complement || !user.neighborhood) {
    user.patio = null;
    user.complement = null;
    user.neighborhood = null;
  }
}
