import z from 'zod';
import {prismaProcedure, t} from '../../lib/trpc/init';
import customConfig from '../../config/default';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const usersRouter = t.router({
  signUp: prismaProcedure
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
        const token = jwt.sign(
          {user_id: user.id, email: user.email},
          customConfig.jwtToken,
          {expiresIn: '7d'},
        );

        await prisma.user.update({
          data: {token},
          where: {id: user.id},
        });

        return {
          message: {
            user: {...user, password: undefined},
            token,
          },
        };
      } catch (e) {
        console.error(e);
        return {error: e};
      }
    }),
  login: prismaProcedure
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
          return {message: user};
        } else {
          return {error: {message: 'Incorrect password.'}};
        }
      } else {
        return {error: {message: 'No user found.'}};
      }
    }),
});
