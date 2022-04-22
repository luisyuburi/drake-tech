import userDAO, { UserDAOProvider } from "../models/user.dao";
import { User, Prisma } from "@prisma/client";
import userServiceProvider from "./users.service";
import userService from "./users.service";

const userList: Array<User> = [
  {
    id: "1",
    name: "Jesus Perez",
    email: "john@gmail.com",
    phoneNumber: "64351342",
    password: "12345678",
  },
  {
    id: "2",
    name: "Luis Perez",
    email: "juan@gmail.com",
    phoneNumber: "64351342",
    password: "12345678",
  },
  {
    id: "3",
    name: "Pedro Perez",
    email: "john@gmail.com",
    phoneNumber: "64351342",
    password: "12345678",
  },
];

test("It should return an users list", async () => {
  const prismaClient = {};
  const userDAOProvider: UserDAOProvider = () => {
    return {
      getAll: async () => {
        return userList;
      },
      create: () => {
        throw new Error("Not implemented");
      },
      getOne: () => {
        throw new Error("Not implemented");
      },
    };
  };
  const userService = userServiceProvider({ prismaClient, userDAOProvider });
  const users = await userService.getAll();

  expect(users).toBe(userList);
});

test("It should create an user and return it", async () => {
  const prismaClient = {};
  const userDAOProvider: UserDAOProvider = () => {
    return {
      getAll: () => {
        throw new Error("Not implemented");
      },
      create: async (user: Prisma.UserCreateInput) => {
        const createdUser: User = {
          ...user,
          id: "65432",
          phoneNumber: "64351342",
        };
        return createdUser;
      },
      getOne: () => {
        throw new Error("Not implemented");
      },
    };
  };
  const userService = userServiceProvider({ prismaClient, userDAOProvider });
  const userBase: Prisma.UserCreateInput = {
    name: "Pedro Perez",
    email: "john@gmail.com",
    phoneNumber: "64351342",
    password: "12345678",
  };
  const createdUser = await userService.create(userBase);
  const expectedCreatedUser = {
    id: "65432",
    name: "Pedro Perez",
    email: "john@gmail.com",
    phoneNumber: "64351342",
    password: "12345678",
  };
  expect(createdUser).toStrictEqual(expectedCreatedUser);
});

test("It should return the required user", async () => {
  const prismaClient = {};
  const userDAOProvider: UserDAOProvider = () => {
    return {
      getAll: () => {
        throw new Error("Not implemented");
      },
      create: () => {
        throw new Error("Not implemented");
      },
      getOne: async (id: string) => {
        return userList.find((user) => user.id === id) ?? null;
      },
    };
  };
  const userService = userServiceProvider({ prismaClient, userDAOProvider });
  const users = await userService.getOne("3");
  const expectedUser = {
    id: "3",
    name: "Pedro Perez",
    email: "john@gmail.com",
    phoneNumber: "64351342",
    password: "12345678",
  };
  expect(users).toStrictEqual(expectedUser);
});
