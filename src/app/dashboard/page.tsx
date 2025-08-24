import { getCategoriesAndItems } from "@/actions/getCategoriesAndItems";
import MenuAdmin from "@/components/dashboard/MenuAdmin";
import { getUserSession } from "@/lib/user/getSession";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getUserSession();

  if (!session) {
    redirect("/login");
  }

  const data = await getCategoriesAndItems(session?.restaurantId);

  return <MenuAdmin data={data} />;
}
