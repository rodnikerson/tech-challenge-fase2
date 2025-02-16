import { Request, Response } from 'express';
import { getAllUsers } from '../models/userModel';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    console.log(users)
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuários', error });
  }
};
