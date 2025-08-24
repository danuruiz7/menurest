import { Home, Book, Settings, LogOut } from "lucide-react";
import { NavBarItem } from "./NavBarItem";
import { getRestaurant } from "@/actions/restaurant/getRestaurant";
import Image from "next/image";
import { UtensilsCrossed } from "lucide-react";
import BotonLogout from "@/components/navigation/BotonLogout";

export const NavBarMobile = async () => {
  const restaurant = await getRestaurant();
  const isCollapsed = true;
  return (
    <div className="px-4 py-2 bg-white border-r  border-gray-200 flex items-center justify-between transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Image src={restaurant?.logoUrl ? restaurant.logoUrl : ""} alt="logo" width={100} height={100} priority className="w-20" />
        </div>
      </div>
      {/* <Separator /> */}
      {/* navigation */}

      <nav className="flex flex-1 items-center justify-center gap-4">
        <NavBarItem href="#" icon={<Home className="h-4 w-4" />} label="Inicio" isCollapsed={isCollapsed} />
        <NavBarItem href="#" icon={<Book className="h-4 w-4" />} label="Menú" isCollapsed={isCollapsed} />
        <NavBarItem href="#" icon={<Settings className="h-4 w-4" />} label="Configuración" isCollapsed={isCollapsed} />
        <NavBarItem href="/menu" icon={<UtensilsCrossed className="h-4 w-4" />} label="Menú del cliente" isCollapsed={isCollapsed} />
      </nav>

      {/* Butons Actions */}
      <div className="">
        <BotonLogout isCollapsed={isCollapsed} />
      </div>
    </div>
  );
};
