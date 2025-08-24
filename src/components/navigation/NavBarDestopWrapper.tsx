import { getRestaurant } from "@/actions/restaurant/getRestaurant";
import { getUserSession } from "@/lib/user/getSession";
import { NavBarDesktop } from "./NavBarDesktop";

export const NavBarDesktopWrapper = async () => {
  const session = await getUserSession();
  if (!session) return null;
  const restaurant = await getRestaurant(session?.restaurantId);

  return <NavBarDesktop restaurant={restaurant} session={session} />;
};
