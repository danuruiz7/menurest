"use client";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CategoryApp } from "@/types/category";
import Image from "next/image";

interface CategoriesNavProps {
  data: CategoryApp[];
  activeCategory: number;
}

export const ItemsScroll = ({ data, activeCategory }: CategoriesNavProps) => {
  return (
    <ScrollArea className="flex-grow ">
      <main className="p-4">
        <div className="flex items-center justify-between px-3">
          <h2 className="text-xl font-bold mb-4">{data[activeCategory].name}</h2>
        </div>
        <div className="space-y-4">
          {data[activeCategory].items.map((item) => {
            if (item.isActive) {
              return (
                <Card key={item.id} className={item.isActive ? "" : "opacity-50"}>
                  <CardContent className="p-4 flex items-center space-x-4">
                    <div className="flex flex-col items-center gap-4">
                      <Image src={item.imageUrl ?? ""} alt={item.name} width={100} height={100} className="rounded-md object-cover aspect-square" />
                    </div>
                    <div className="flex-1 flex flex-col justify-start ">
                      <h3 className="font-semibold underline-offset-2 underline">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.description}</p>
                      <p className="text-sm font-bold mt-1">{item.price} €</p>
                    </div>
                    {/* <div className="flex flex-col items-center gap-2">
                    <Switch
                      checked={item.isActive}
                      onClick={() =>
                        handleToggleItemActive(item.id, item.isActive)
                      }
                    />
                  </div> */}
                  </CardContent>
                </Card>
              );
            }
          })}
        </div>
      </main>
    </ScrollArea>
  );
};
