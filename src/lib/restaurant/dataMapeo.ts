export const dataMapeoRestaurant = (data: FormData) => {

  const id = data.get("id");
  const name = data.get("name");
  const address = data.get("address");
  const phone = data.get("phone");
  const email = data.get("email");
  const description = data.get("description");
  const website = data.get("website");
  const userId = data.get("userId");
  const logoFile = data.get("logo") as File | null;
  const logoUrl = data.get("logoUrl") as string | null;

  const restaurantWithoutLogo = {
    id: Number(id) || 0,
    name: name?.toString() || "",
    address: address?.toString() || "",
    phone: phone?.toString() || "",
    email: email?.toString() || "",
    description: description?.toString() || "",
    website: website?.toString() || "",
    userId: Number(userId) || 0,
    logoUrl: logoUrl || undefined,
  }

  return { restaurantWithoutLogo, logoFile };
}