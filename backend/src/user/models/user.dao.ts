import { User, Prisma } from "@prisma/client";
import bcrypt from "bcrypt";
export interface UserDAO {
  getAll: () => Promise<Array<User>>;
  create: (user: Prisma.UserCreateInput) => Promise<User>;
  getOne: (id: string) => Promise<User | null>;
}

export interface UserDAOProviderDependencies {
  prismaClient: any;
}

export type UserDAOProvider = (
  dependencies: UserDAOProviderDependencies
) => UserDAO;

const userDAOProvider: UserDAOProvider = ({ prismaClient }): UserDAO => {
  return {
    getAll: async () => {
      return await prismaClient.user.findMany({
        select: {
          id: true,
          email: true,
          name: true,
          phoneNumber: true,
        },
      });
    },
    create: async (user: Prisma.UserCreateInput) => {
      const hashedPassword = bcrypt.hashSync(user.password, 10);
      return await prismaClient.user.create({
        data: { ...user, password: hashedPassword },
        select: {
          id: true,
          email: true,
          name: true,
          phoneNumber: true,
        },
      });
    },
    getOne: async (id: string) => {
      return await prismaClient.user.findUnique({
        where: {
          id: id,
        },
        select: {
          id: true,
          email: true,
          name: true,
          phoneNumber: true,
        },
      });
    },
  };
};

export default userDAOProvider;
