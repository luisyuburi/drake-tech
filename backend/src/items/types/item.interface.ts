export interface BaseItem {
  name: string;
  price: number;
  description: string;
  image: string;
  userId: string;
  createdAt: Date;
  slug: string;
}

export interface Item extends BaseItem {
  id: number;
}
