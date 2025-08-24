import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserSession } from "@/lib/user/getSession";
import RestaurantForm from "@/components/settings/FormRestaurant";
import { Store } from "lucide-react";

export default async function CreateRestaurantPage() {
  const session = await getUserSession();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-4 bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <div className="w-full max-w-md text-center mb-6 md:mt-5">
        <div className="inline-flex items-center justify-center gap-2 mb-2">
          <Store className="h-8 w-8 text-blue-500" />
          <h1 className="text-3xl font-bold text-white">Crear Tu Restaurante</h1>
        </div>
      </div>

      <Card className="w-full md:w-[60%] flex-1 shadow-xl rounded-xl overflow-hidden border border-gray-200/10">
        <div className="h-3 bg-gradient-to-r from-blue-600 to-purple-600"></div>
        <CardHeader className="pt-6 pb-4">
          <CardTitle className="text-2xl font-bold text-center">Información del Restaurante</CardTitle>
          <CardDescription className="text-center mt-2">
            Hola <span className="font-semibold text-blue-600">{session?.name}</span>, completa los datos para dar de alta tu restaurante y comenzar a
            gestionar tu menú.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <RestaurantForm initialData={null} userId={session?.userId} />
        </CardContent>
      </Card>

      <footer className="mt-8 text-center text-sm text-gray-400">
        <p>&copy; {new Date().getFullYear()} MenuApp - Todos los derechos reservados</p>
      </footer>
    </div>
  );
}
