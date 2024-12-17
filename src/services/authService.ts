import * as userModel from '../models/userModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const createUser = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  const newUser = await userModel.createUser({
    ...data,
    password: hashedPassword,
  });
  return newUser;
};

export const loginUser = async (email: string, password: string) => {
  const user = await userModel.getUserByEmail(email);
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET as string,
    { expiresIn: '6h' }
  );

  return token;
};
