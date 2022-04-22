/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from "express";
import userServiceProvider, * as ItemService from "../services/users.service";
import { prisma } from "../../index";
import userDAOProvider from "../models/user.dao";
import { User, Prisma } from "@prisma/client";
/**
 * Router Definition
 */
const usersRouter = express.Router();

/**
 * Controller Definitions
 */

// GET users list

usersRouter.get("/", async (req: Request, res: Response) => {
  try {
    const userService = userServiceProvider({
      prismaClient: prisma,
      userDAOProvider,
    });
    const users: User[] = await userService.getAll();

    res.status(200).send(users);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

usersRouter.get("/:id", async (req: Request, res: Response) => {
  const id: string = req.params.id;

  try {
    const userService = userServiceProvider({
      prismaClient: prisma,
      userDAOProvider,
    });
    const user = await userService.getOne(id);

    if (!user) return res.status(404).send("user not found");

    res.status(200).send(user);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

// POST users

usersRouter.post("/", async (req: Request, res: Response) => {
  try {
    const userService = userServiceProvider({
      prismaClient: prisma,
      userDAOProvider,
    });
    const userBase: Prisma.UserCreateInput = req.body;
    const newItem = await userService.create(userBase);
    res.status(201).json(newItem);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

// PUT users/:id

usersRouter.put("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    // const itemUpdate: User = req.body;
    // const existingItem: User = await ItemService.find(id);
    // if (existingItem) {
    //   const updatedItem = await ItemService.update(id, itemUpdate);
    //   return res.status(200).json(updatedItem);
    // }
    // const newItem = await ItemService.create(itemUpdate);
    // res.status(201).json(newItem);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

// DELETE users/:id

usersRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    // const id: number = parseInt(req.params.id, 10);
    // await ItemService.remove(id);
    // res.sendStatus(204);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

export default usersRouter;
