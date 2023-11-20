import { Category } from "./category";

export interface Person {
  id: number;
  name: string;
  surname: string;
  email: string;
  password: string;
  categoryId: number;
  category: Category;
  subcategory: string;
  userSubcategory: string;
  phoneNumber: string;
  BirthDate: Date;
}

