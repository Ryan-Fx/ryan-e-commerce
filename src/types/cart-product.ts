import { Product } from "@prisma/client";

export type CartProduct = Product & {
  quantity: number | undefined;
};
