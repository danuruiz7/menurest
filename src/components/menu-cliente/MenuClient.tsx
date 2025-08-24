"use client";
import Image from "next/image";
import { useState } from "react";
import { Smartphone } from "lucide-react";
import Link from "next/link";
import { CategoriesNav } from "../navigation/categoria/CategoriesNav";
import { ItemsScroll } from "./ItemsScroll";
import { CategoryApp } from "@/types/category";
import { UserSession } from "@/types/user";
import { RestaurantApp } from "@/types/resturant";
import { Separator } from "@/components/ui/separator";

interface MenuProps {
  data: CategoryApp[]; // Define el tipo esperado
  restaurant: RestaurantApp;
  session: UserSession | null;
}

export default function MenuClient({ data, restaurant, session }: MenuProps) {
  const [activeCategory, setActiveCategory] = useState(0);
  if (data.length === 0) {
    return <p>No categories available.</p>; // Maneja el caso cuando no hay datos
  }

  // Verifica si al menos una categoría tiene isActive === true
  const isAnyCategoryActive = data.some((category) => category.isActive);

  if (!isAnyCategoryActive) {
    return <p>No estamos currando.</p>; // Si ninguna categoría está activa, muestra este mensaje
  }
  return (
    <div className="flex flex-col bg-gray-100">
      {JSON.stringify(session)}
      <header className="bg-primary text-primary-foreground p-4 text-center">
        <div className="flex justify-between items-center">
          <Image src={restaurant?.logoUrl ? restaurant.logoUrl : ""} alt="logo" width={100} height={100} priority className="w-12 rounded-full" />
          {session?.userId ? (
            <Link className="text-xl font-bold flex-1 cursor-pointer" href={`/dashboard`}>
              {restaurant?.name}
            </Link>
          ) : (
            <h1 className="text-xl font-bold flex-1">{restaurant?.name}</h1>
          )}

          <div>
            <ul className="flex items-center gap-2">
              <li>
                <a href="tel:{restaurant?.phone}">
                  <Smartphone size={20} />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </header>

      <CategoriesNav data={data} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
      <Separator />
      <ItemsScroll data={data} activeCategory={activeCategory} />
    </div>
  );
}
