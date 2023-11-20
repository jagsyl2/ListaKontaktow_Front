import { Category } from "./category";

export interface Subcategory {
  id: number;
  name: string;
  categoryId: number;
  category: Category
}
