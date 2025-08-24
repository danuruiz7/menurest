"use client";

import { Button } from "@/components/ui/button";
import { CategoryApp } from "@/types/category";
import { Dispatch } from "react";

interface CategoriesNavProps {
  data: CategoryApp[];
  activeCategory: number;
  setActiveCategory: Dispatch<number>;
}

export const CategoriesNav = ({ data, activeCategory, setActiveCategory }: CategoriesNavProps) => {
  return (
    <nav className="bg-secondary p-4 overflow-x-auto overflow-y-hidden whitespace-nowrap z-10">
      {data.map((category, index) => {
        const isActive = activeCategory === index;
        return (
          <Button key={category.id} variant={isActive ? "default" : "ghost"} onClick={() => setActiveCategory(index)} className="mx-1 cursor-pointer">
            {category.isActive ? category.name : category.name + "🚫"}
          </Button>
        );
      })}
    </nav>
  );
};
