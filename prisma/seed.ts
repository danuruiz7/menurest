import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Eliminar todos los registros de la base de datos
  await prisma.item.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.restaurantInfo.deleteMany({});

  // Crear RestaurantInfo
  await prisma.restaurantInfo.create({
    data: {
      name: "Restaurante Manolo",
      logoUrl: "/logo.jpeg",
      address: "123 Calle Falsa",
      phone: "+123456789",
      email: "info@manolo.com",
      slug: "restaurante-manolo",
      website: "https://manolo.com",
      description: "Restaurante de comida rápida",
    },
  });

  // Crear Usuarios
  await prisma.user.create({
    data: {
      username: "admin",
      password: "1234", // Nota: En un entorno real, ¡nunca guardes la contraseña sin cifrar!
      role: "ADMIN",
      restaurant: {
        connect: { id: 1 },
      },
    },
  });

  await prisma.user.create({
    data: {
      username: "chef1",
      password: "1234",
      role: "GESTOR",
      restaurant: {
        connect: { id: 1 },
      },
    },
  });


  await prisma.user.create({
    data: {
      username: "staff1",
      password: "1234",
      role: "STAFF",
      restaurant: {
        connect: { id: 1 },
      },
    },
  });

  // Crear Categorías
  const starterCategory = await prisma.category.create({
    data: {
      name: "Entrantes",
      menuPosition: 1,
      isActive: true,
    },
  });

  const mainCourseCategory = await prisma.category.create({
    data: {
      name: "Plato Principal",
      menuPosition: 2,
      isActive: true,
    },
  });

  const postreCategory = await prisma.category.create({
    data: {
      name: "Postres",
      menuPosition: 3,
      isActive: true,
    },
  });

  const drinksCategory = await prisma.category.create({
    data: {
      name: "Bebidas",
      menuPosition: 4,
      isActive: true,
    },
  });

  const menuDia = await prisma.category.create({
    data: {
      name: "Menu del dia",
      menuPosition: 4,
      isActive: false,
    },
  });

  // Crear Items para Menu del dia
  await prisma.item.create({
    data: {
      name: "Cachapa",
      description: "Ensalada con pollo, lechuga, y aderezo César.",
      price: 10.99,
      imageUrl: "/image/menu/cachapa.jpeg",
      category: {
        connect: { id: menuDia.id },
      },
      restaurant: {
        connect: { id: 1 },
      },
    },
  });
  await prisma.item.create({
    data: {
      name: "Pabellón",
      description:
        "Está compuesto por arroz blanco cocido, carne es mechada, caraotas negras y tajadas de plátano maduro frito",
      price: 10.99,
      imageUrl: "/image/menu/pabellon.jpeg",
      category: {
        connect: { id: menuDia.id },
      },
      restaurant: {
        connect: { id: 1 },
      },
    },
  });
  // Crear Items para Entrantes
  await prisma.item.create({
    data: {
      name: "Ensalada César",
      description: "Ensalada con pollo, lechuga, y aderezo César.",
      price: 10.99,
      imageUrl: "/image/menu/ensalada.jpeg",
      category: {
        connect: { id: starterCategory.id },
      },
      restaurant: {
        connect: { id: 1 },
      },
    },
  });

  await prisma.item.create({
    data: {
      name: "Sopa de Tomate",
      description: "Sopa cremosa de tomate con albahaca fresca.",
      price: 7.99,
      imageUrl: "/image/menu/sopa_tomate.jpeg",
      category: {
        connect: { id: starterCategory.id },
      },
      restaurant: {
        connect: { id: 1 },
      },
    },
  });

  await prisma.item.create({
    data: {
      name: "Bruschetta",
      description: "Pan tostado con tomate, ajo y aceite de oliva.",
      price: 6.5,
      imageUrl: "/image/menu/bruschetta.jpeg",
      category: {
        connect: { id: starterCategory.id },
      },
      restaurant: {
        connect: { id: 1 },
      },
    },
  });

  await prisma.item.create({
    data: {
      name: "Calamares Fritos",
      description: "Calamares crujientes con salsa tártara.",
      price: 9.5,
      imageUrl: "/image/menu/calamares.jpeg",
      category: {
        connect: { id: starterCategory.id },
      },
      restaurant: {
        connect: { id: 1 },
      },
    },
  });

  // Crear Items para Plato Principal
  await prisma.item.create({
    data: {
      name: "Pizza Margarita",
      description: "Pizza con queso mozzarella y albahaca fresca.",
      price: 14.99,
      imageUrl: "/image/menu/pizza.jpeg",
      category: {
        connect: { id: mainCourseCategory.id },
      },
      restaurant: {
        connect: { id: 1 },
      },
    },
  });

  await prisma.item.create({
    data: {
      name: "Hamburguesa Clásica",
      description: "Hamburguesa de res con queso cheddar y papas fritas.",
      price: 12.99,
      imageUrl: "/image/menu/hamburguesa.jpeg",
      category: {
        connect: { id: mainCourseCategory.id },
      },
      restaurant: {
        connect: { id: 1 },
      },
    },
  });

  await prisma.item.create({
    data: {
      name: "Pasta Carbonara",
      description: "Pasta con salsa cremosa de huevo y panceta.",
      price: 13.99,
      imageUrl: "/image/menu/carbonara.jpeg",
      category: {
        connect: { id: mainCourseCategory.id },
      },
      restaurant: {
        connect: { id: 1 },
      },
    },
  });

  await prisma.item.create({
    data: {
      name: "Pollo Asado",
      description: "Pollo asado con hierbas y papas al horno.",
      price: 15.99,
      imageUrl: "/image/menu/pollo_asado.jpeg",
      category: {
        connect: { id: mainCourseCategory.id },
      },
      restaurant: {
        connect: { id: 1 },
      },
    },
  });

  // Crear Items para Postres
  await prisma.item.create({
    data: {
      name: "Tarta de Chocolate",
      description: "Deliciosa tarta de chocolate con una capa de ganache.",
      price: 6.5,
      imageUrl: "/image/menu/tarta_chocolate.jpeg",
      category: {
        connect: { id: postreCategory.id },
      }, restaurant: {
        connect: { id: 1 },
      },
    },
  });

  await prisma.item.create({
    data: {
      name: "Helado de Vainilla",
      description: "Helado artesanal de vainilla con trozos de chocolate.",
      price: 4.0,
      imageUrl: "/image/menu/helado_vainilla.jpeg",
      category: {
        connect: { id: postreCategory.id },
      }, restaurant: {
        connect: { id: 1 },
      },
    },
  });

  await prisma.item.create({
    data: {
      name: "Cheesecake de Fresa",
      description: "Cheesecake cremoso con salsa de fresa.",
      price: 5.99,
      imageUrl: "/image/menu/cheesecake_fresa.jpeg",
      category: {
        connect: { id: postreCategory.id },
      }, restaurant: {
        connect: { id: 1 },
      },
    },
  });

  await prisma.item.create({
    data: {
      name: "Flan Casero",
      description: "Flan de huevo con caramelo.",
      price: 4.5,
      imageUrl: "/image/menu/flan.jpeg",
      category: {
        connect: { id: postreCategory.id },
      }, restaurant: {
        connect: { id: 1 },
      },
    },
  });

  // Crear Items para Bebidas
  await prisma.item.create({
    data: {
      name: "Coca-Cola",
      description: "Refresco de cola con gas.",
      price: 2.5,
      imageUrl: "/image/menu/coca-cola.webp",
      category: {
        connect: { id: drinksCategory.id },
      }, restaurant: {
        connect: { id: 1 },
      },
    },
  });

  await prisma.item.create({
    data: {
      name: "Agua Mineral",
      description: "Agua mineral sin gas.",
      price: 1.5,
      imageUrl: "/image/menu/agua-mineral.jpeg",
      category: {
        connect: { id: drinksCategory.id },
      }, restaurant: {
        connect: { id: 1 },
      },
    },
  });

  await prisma.item.create({
    data: {
      name: "Café Espresso",
      description: "Café espresso fuerte y aromático.",
      price: 1.99,
      imageUrl: "/image/menu/espresso.jpeg",
      category: {
        connect: { id: drinksCategory.id },
      }, restaurant: {
        connect: { id: 1 },
      },
    },
  });

  await prisma.item.create({
    data: {
      name: "Té Verde",
      description: "Té verde natural y refrescante.",
      price: 2.0,
      imageUrl: "/image/menu/te_verde.jpeg",
      category: {
        connect: { id: drinksCategory.id },
      }, restaurant: {
        connect: { id: 1 },
      },
    },
  });
}

main()
  .then(() => {
    console.log("Datos insertados correctamente");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
