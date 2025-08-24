// app/[slug]/page.tsx
import { getCategoriesAndItems } from "@/actions/getCategoriesAndItems";
import { getRestaurantBySlug } from "@/actions/restaurant/getRestaurantBySlug";
import MenuClient from "@/components/menu-cliente/MenuClient";
import { getUserSession } from "@/lib/user/getSession";

export default async function MenuClientPage(
  { params }: { params: Promise<{ slug: string }> } // 👈 params es un Promise
) {
  const { slug } = await params; // 👈 hay que await
  const restaurant = await getRestaurantBySlug(slug);
  if (!restaurant) {
    return <h1>Restaurante no encontrado</h1>;
  }
  const data = await getCategoriesAndItems(restaurant.id);
  const session = await getUserSession();

  return <MenuClient data={data} restaurant={restaurant} session={session} />;
}
