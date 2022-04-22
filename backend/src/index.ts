/**
 * Required External Modules
 */
import * as dotenv from "dotenv";
import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import helmet from "helmet";
import itemsRouter from "./items/routes/items.router";
import usersRouter from "./user/routes/users.router";
import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/not-found.middleware";
dotenv.config();

/**
 * App Variables
 */

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);
export const prisma = new PrismaClient();

const app = express();

/**
 *  App Configuration
 */
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/api/item", itemsRouter);
app.use("/api/user", usersRouter);

app.use(errorHandler);
app.use(notFoundHandler);

/**
 * Server Activation
 */

app.listen(PORT, () => {
  // tslint:disable:no-console
  console.log(`Listening on port ${PORT}`);
});
