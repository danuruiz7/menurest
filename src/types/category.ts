import { ItemApp } from "./item";



export interface CategoryApp {
  id: number;
  name: string;
  menuPosition: number;
  isActive: boolean;
  items: ItemApp[];
}