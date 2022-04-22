import { Product, Prisma } from "@prisma/client";
export interface ItemDAO {
  getAll: () => Promise<Array<Product>>;
  create: (product: Prisma.UserCreateInput) => Promise<Product>;
  getOne: (id: string) => Promise<Product | null>;
}

export interface ItemDAOProviderDependencies {
  prismaClient: any;
}

export type ItemDAOProvider = (
  dependencies: ItemDAOProviderDependencies
) => ItemDAO;

const itemDAOProvider: ItemDAOProvider = ({ prismaClient }): ItemDAO => {
  return {
    getAll: async () => {
      return await prismaClient.product.findMany({
        select: {
          id: true,
          name: true,
          price: true,
          description: true,
          image: true,
          createdAt: true,
          slug: true,
        },
      });
    },
    create: async (product: Prisma.UserCreateInput) => {
      return await prismaClient.product.create({
        data: { ...product },
        select: {
          id: true,
          name: true,
          price: true,
          description: true,
          image: true,
          createdAt: true,
          slug: true,
        },
      });
    },
    getOne: async (id: string) => {
      return await prismaClient.product.findUnique({
        where: {
          id: id,
        },
        select: {
          id: true,
          name: true,
          price: true,
          description: true,
          image: true,
          createdAt: true,
          slug: true,
        },
      });
    },
  };
};

export default itemDAOProvider;
