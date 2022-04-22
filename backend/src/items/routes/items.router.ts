/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from "express";
import ItemServiceProvider from "../services/items.service";
import { prisma } from "../../index";
import ItemDAOProvider from "../models/item.dao";
import { Product, Prisma } from "@prisma/client";
/**
 * Router Definition
 */
const productsRouter = express.Router();

/**
 * Controller Definitions
 */

// GET products list

productsRouter.get("/", async (req: Request, res: Response) => {
  try {
    const productsService = ItemServiceProvider({
      prismaClient: prisma,
      ItemDAOProvider,
    });
    const products: Product[] = await productsService.getAll();

    res.status(200).send(products);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

productsRouter.get("/:id", async (req: Request, res: Response) => {
  const id: string = req.params.id;

  try {
    const productsService = ItemServiceProvider({
      prismaClient: prisma,
      ItemDAOProvider,
    });
    const product = await productsService.getOne(id);

    if (!product) return res.status(404).send("product not found");

    res.status(200).send(product);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

// POST products

productsRouter.post("/", async (req: Request, res: Response) => {
  try {
    const productsService = ItemServiceProvider({
      prismaClient: prisma,
      ItemDAOProvider,
    });
    const productBase: Prisma.UserCreateInput = req.body;
    const newItem = await productsService.create(productBase);
    res.status(201).json(newItem);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

// PUT products/:id

productsRouter.put("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    // const itemUpdate: Product = req.body;
    // const existingItem: Product = await ItemService.find(id);
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

// DELETE products/:id

productsRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    // const id: number = parseInt(req.params.id, 10);
    // await ItemService.remove(id);
    // res.sendStatus(204);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

export default productsRouter;
