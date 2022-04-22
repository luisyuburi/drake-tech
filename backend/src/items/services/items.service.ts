import { Prisma, Product } from "@prisma/client";
import { ItemDAOProvider } from "../models/item.dao";

interface ItemServiceProvider {
  prismaClient: any;
  ItemDAOProvider: ItemDAOProvider;
}

export interface ItemService {
  getAll: () => Promise<Array<Product>>;
  create: (product: Prisma.UserCreateInput) => Promise<Product>;
  getOne: (id: string) => Promise<Product | null>;
}

const ItemServiceProvider = ({
  prismaClient,
  ItemDAOProvider,
}: ItemServiceProvider): ItemService => {
  const itemDAO = ItemDAOProvider({ prismaClient });
  return {
    getAll: async () => {
      return await itemDAO.getAll();
    },
    create: async (product: Prisma.UserCreateInput) => {
      return await itemDAO.create(product);
    },
    getOne: async (id: string) => {
      return await itemDAO.getOne(id);
    },
  };
};

export default ItemServiceProvider;
