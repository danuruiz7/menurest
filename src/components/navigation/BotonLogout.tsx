import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { logout } from "@/actions/auth/logout";
import { cn } from "@/lib/utils";

interface BotonLogoutProps {
  isCollapsed?: boolean;
}

export default function BotonLogout({ isCollapsed = false }: BotonLogoutProps) {
  return (
    <form action={logout}>
      <Button
        type="submit"
        className={cn(
          isCollapsed ? "p-2" : "w-full",
          "flex items-center justify-center gap-2",
          "bg-white border border-red-600 text-red-600",
          "hover:bg-red-600 hover:text-white hover:border-red-600",
          "cursor-pointer transition-colors duration-300"
        )}
        title="Cerrar Sesión"
      >
        <LogOut className="h-4 w-4" />
        {!isCollapsed && "Cerrar Sesión"}
      </Button>
    </form>
  );
}
