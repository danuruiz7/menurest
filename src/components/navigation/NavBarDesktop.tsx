"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Home, Book, Settings, UtensilsCrossed, ChevronLeft, ChevronRight } from "lucide-react";
import { NavBarItem } from "./NavBarItem";
import Image from "next/image";
import BotonLogout from "@/components/navigation/BotonLogout";
import { useState, useEffect } from "react";
import { UserSession } from "@/types/user";
import { Restaurant } from "@/types/resturant";

interface Props {
  restaurant: any;
  session: UserSession;
}

export const NavBarDesktop = ({ restaurant, session }: Props) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Guardar el estado en localStorage
  useEffect(() => {
    const savedState = localStorage.getItem("menuCollapsed");
    if (savedState) {
      setIsCollapsed(savedState === "true");
    }
  }, []);

  const toggleCollapse = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem("menuCollapsed", String(newState));
  };

  return (
    <div className={`bg-white border-r border-gray-200 flex flex-col transition-all duration-300 h-full relative ${isCollapsed ? "w-16" : "w-52"}`}>
      {/* Botón para colapsar/expandir */}
      <button
        onClick={toggleCollapse}
        className={`absolute top-3 ${
          isCollapsed ? "-right-7" : "right-0"
        } text-white rounded-full p-1 shadow-md z-10 cursor-pointer bg-gray-600 shadow-gray-400`}
        aria-label={isCollapsed ? "Expandir menú" : "Colapsar menú"}
      >
        {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </button>

      <div className={`p-2 flex items-center justify-between w-full ${isCollapsed ? "flex-col " : ""}`}>
        <div className={`flex flex-col items-center justify-between ${isCollapsed ? "" : "mx-auto"} gap-1`}>
          <Image
            src={restaurant?.logoUrl ? restaurant.logoUrl : ""}
            alt="logo"
            width={100}
            height={100}
            priority
            className={`rounded ${isCollapsed ? "w-14 mt-1" : "w-14"}`}
          />
          {!isCollapsed && (
            <>
              <div className="flex flex-col items-center">
                <h2 className="ml-2 text-xl font-semibold">{restaurant?.name}</h2>
                <small className="text-sm text-gray-500">{session?.username}</small>
              </div>
            </>
          )}
        </div>
      </div>

      {/* navigation */}
      <ScrollArea className="flex-1">
        <nav className="flex flex-col gap-1 p-2">
          <NavBarItem href="/dashboard" icon={<Home className="h-4 w-4" />} label="Inicio" isCollapsed={isCollapsed} />
          <NavBarItem href="/dashboard/items" icon={<Book className="h-4 w-4" />} label="Items" isCollapsed={isCollapsed} />
          <NavBarItem href="/dashboard/settings" icon={<Settings className="h-4 w-4" />} label="Configuración" isCollapsed={isCollapsed} />
          <NavBarItem
            href={`/${restaurant?.slug}`}
            icon={<UtensilsCrossed className="h-4 w-4" />}
            label="Menú del cliente"
            isCollapsed={isCollapsed}
          />
        </nav>
      </ScrollArea>
      {/* Butons Actions */}
      <div className="p-4">
        <BotonLogout isCollapsed={isCollapsed} />
      </div>
    </div>
  );
};
