"use client";
import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { itemChangeIsActive } from "@/actions/item/itemChangeIsActive";

import { CategoriesNav } from "@/components/navigation/categoria/CategoriesNav";
import { Separator } from "@/components/ui/separator";
import { categoryChangeIsActive } from "@/actions/categories/categoryChangeIsActive";
import { CategoryApp } from "@/types/category";

interface MenuProps {
  data: CategoryApp[];
}

export default function MenuAdmin({ data }: MenuProps) {
  const [activeCategory, setActiveCategory] = useState(0);
  const [categories, setCategories] = useState(data);

  const handleToggleCategoryActive = async (categoryId: number, isActive: boolean) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) => (category.id === categoryId ? { ...category, isActive: !isActive } : category))
    );
    await categoryChangeIsActive(categoryId, isActive);
  };

  const handleToggleItemActive = async (categoryId: number, itemId: number, isActive: boolean) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              items: category.items.map((item) => (item.id === itemId ? { ...item, isActive: !isActive } : item)),
            }
          : category
      )
    );
    await itemChangeIsActive(itemId, isActive);
  };

  return (
    <div className="flex flex-col bg-gray-100">
      <div className="flex flex-col sticky top-0 z-50">
        <header className="bg-black text-white text-center h-16 flex items-center justify-center">
          <h1 className="text-2xl font-bold">MenuApp Dashboard</h1>
        </header>

        <CategoriesNav data={categories} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
      </div>
      <ScrollArea className="flex-grow">
        <main className="p-4">
          <div className="flex items-center justify-between px-3">
            <h2 className="text-xl font-bold mb-4">{categories[activeCategory].name}</h2>
            <Switch
              className="cursor-pointer"
              checked={categories[activeCategory].isActive}
              onClick={() => handleToggleCategoryActive(categories[activeCategory].id, categories[activeCategory].isActive)}
            />
          </div>
          <div className="space-y-4">
            {categories[activeCategory].items.map((item) => (
              <Card key={item.id} className={item.isActive ? "" : "opacity-50"}>
                <CardContent className=" flex items-center space-x-4">
                  <div className="flex flex-col items-center gap-4">
                    <Image src={item.imageUrl ?? ""} alt={item.name} width={100} height={100} className="rounded-md object-cover aspect-square" />
                  </div>
                  <div className="flex-1 flex flex-col justify-start">
                    <h3 className="font-semibold underline-offset-2 underline">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.description}</p>
                    <p className="text-sm font-bold mt-1">{item.price} €</p>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Switch
                      className="cursor-pointer"
                      checked={item.isActive}
                      onClick={() => handleToggleItemActive(categories[activeCategory].id, item.id, item.isActive)}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </ScrollArea>
    </div>
  );
}
