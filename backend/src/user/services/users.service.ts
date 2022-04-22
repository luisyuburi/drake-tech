import { Prisma, User } from "@prisma/client";
import { UserDAOProvider } from "../models/user.dao";

interface UserServiceProvider {
  prismaClient: any;
  userDAOProvider: UserDAOProvider;
}

export interface UserService {
  getAll: () => Promise<Array<User>>;
  create: (user: Prisma.UserCreateInput) => Promise<User>;
  getOne: (id: string) => Promise<User | null>;
}

const userServiceProvider = ({
  prismaClient,
  userDAOProvider,
}: UserServiceProvider): UserService => {
  const userDAO = userDAOProvider({ prismaClient });
  return {
    getAll: async () => {
      return await userDAO.getAll();
    },
    create: async (user: Prisma.UserCreateInput) => {
      return await userDAO.create(user);
    },
    getOne: async (id: string) => {
      return await userDAO.getOne(id);
    },
  };
};

export default userServiceProvider;
