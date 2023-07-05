import z from 'zod';
import {publicProcedure, t} from '../../lib/trpc/init';
import customConfig from '../../config/default';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {createResponse} from '../../lib/responseTransformer';

//? Util functions
const stripPassword = (user: {password?: string}) => {
  delete user.password;
  return user;
};

const genToken = (email: string, id: string) => {
  return jwt.sign({user_id: id, email: email}, customConfig.jwtToken, {
    expiresIn: '7d',
  });
};

export const usersRouter = t.router({
  signUp: publicProcedure
    .input(
      z.object({
        email: z.string().nonempty().email().min(5),
        password: z.string().nonempty(),
        name: z.string().optional(),
      }),
    )
    .mutation(async ({input: {email, name, password}, ctx: {prisma}}) => {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      try {
        const user = await prisma.user.create({
          data: {
            email,
            password: hash,
            name,
          },
        });
        const token = genToken(user.email, user.id);

        await prisma.user.update({
          data: {token},
          where: {id: user.id},
        });

        // return createResponse.success({user: stripPassword(user), token});
        return {data: {user: stripPassword(user), token}};
      } catch (e) {
        console.error(e);
        return createResponse.error({
          error: e,
          message: 'Unable to create user',
        });
      }
    }),
  login: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async ({input: {email, password}, ctx: {prisma}}) => {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (user) {
        const correctPassword = bcrypt.compareSync(password, user.password);

        if (correctPassword) {
          const token = genToken(user.email, user.id);
          await prisma.user.update({
            where: {id: user.id},
            data: {
              token,
            },
          });
          return {data: {user: stripPassword(user), token}};
        } else {
          return createResponse.error({message: 'Incorrect password.'});
        }
      } else {
        return createResponse.error({message: 'No user found.'});
      }
    }),
});
