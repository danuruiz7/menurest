import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserSession } from "@/lib/user/getSession";
import { getRestaurant } from "@/actions/restaurant/getRestaurant";
import RestaurantForm from "@/components/settings/FormRestaurant";
import { Cog, Store } from "lucide-react";

export default async function SettingsPage() {
  const session = await getUserSession();
  const restaurant = await getRestaurant(session?.restaurantId);

  return (
    <div className="w-full mx-auto p-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-primary/10 p-2 rounded-full">
          <Cog className="h-6 w-6 text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-black">Configuración del Restaurante</h1>
      </div>

      <Card className="shadow-md border-t-4 border-t-primary">
        <CardHeader className="bg-gray-50 border-b">
          <div className="flex items-center gap-3">
            <Store className="h-5 w-5 text-primary" />
            <div>
              <CardTitle>Información del Restaurante</CardTitle>
              <CardDescription className="mt-1">
                {restaurant?.id ? "Actualiza la información de tu restaurante" : "Crea un nuevo restaurante para empezar"}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <RestaurantForm initialData={restaurant} userId={session?.userId} />
        </CardContent>
      </Card>
    </div>
  );
}
