# MenuRest

Gestión de menús digitales para restaurantes. Permite crear/actualizar la información del restaurante, administrar categorías e ítems, y exponer un menú público por slug. Incluye endpoints API, lógica de subida de imágenes y una UI para panel y cliente.

## Stack

- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS 4
- Prisma ORM 6 + SQLite
- jose (JWT), axios, lucide-react, Radix UI

## Requisitos

- Node.js 18+ (recomendado LTS)
- pnpm (o npm/yarn)

## Variables de entorno

Crea un archivo `.env.local` en la raíz con al menos:

```bash
# SQLite (la base incluida está en prisma/dev.db)
DATABASE_URL="file:./prisma/dev.db"

# Secreto para firmar/verificar JWT
JWT_SECRET="cambia_este_valor_por_un_secreto_fuerte"
```

## Instalación y puesta en marcha

```bash
pnpm install
pnpm prisma:deploy   # ejecuta migrations y generate
pnpm dev             # inicia el servidor (http://localhost:3000)
```

## Scripts

- `pnpm dev`: desarrollo (Turbopack)
- `pnpm build`: build (Turbopack)
- `pnpm start`: producción
- `pnpm lint`: linting
- `pnpm prisma:deploy`: `prisma migrate deploy` + `prisma generate`

## Estructura principal

```
src/
  app/
    [slug]/            # Menú público por slug
    api/
      auth/            # login/logout
      restaurant/      # create/update restaurante
    crear-restaurante/ # página para alta de restaurante
    dashboard/         # layout y páginas del panel
    layout.tsx         # layout raíz
    globals.css        # estilos globales
  actions/
    restaurant/        # CRUD restaurante (server actions)
    getCategoriesAndItems.ts
  components/
    settings/          # RestaurantForm (formulario)
    menu-cliente/      # UI del menú público
    navigation/, ui/   # componentes compartidos
  lib/
    prisma.ts          # PrismaClient
    jwt.ts             # validación de token (cookies + jose)
    restaurant/        # utilidades (dataMapeo)
  types/               # tipos TS (Category, Item, User, Restaurant)
prisma/
  schema.prisma        # modelo de datos (SQLite)
  dev.db               # base SQLite de desarrollo
  migrations/          # migraciones
  seed.ts              # datos de ejemplo (no configurado como seed por script)
public/
  uploads/restaurants/ # destino de logos subidos
  image/menu/          # imágenes de ejemplo para seed
```

## Flujos principales

- **Autenticación**: `src/app/api/auth/login` y `logout` gestionan token en cookie `token`. `src/lib/jwt.ts` valida el JWT con `JWT_SECRET`.
- **Crear restaurante**: `POST /api/restaurant/create` procesa `FormData`, crea el restaurante y si hay cookie de sesión, actualiza el `restaurantId` en el token.
- **Actualizar restaurante**: `POST /api/restaurant/update` actualiza los campos del restaurante y puede subir nuevo logo.
- **Menú público**: `GET /[slug]` obtiene restaurante por slug y categorías/ítems para renderizar `MenuClient`.

## Endpoints

- `POST /api/restaurant/create`
  - FormData: `name`, `address`, `phone`, `email`, `description`, `website`, `userId`, `logo` (File opcional)
- `POST /api/restaurant/update`
  - FormData: `id`, `address`, `phone`, `email`, `description`, `website`, `userId`, `logo` (File opcional)

Respuesta exitosa: `{ success: true, data: { ... } }`

## Subida de imágenes (logos)

- Validación en cliente: tipos permitidos PNG/JPG/WEBP y tamaño ≤ 1 MB.
- Almacén: `public/uploads/restaurants/{id}_{slug}/logo_{slug}.{ext}`
- Tras subir, se actualiza `logoUrl` del restaurante.

## Notas de desarrollo

- `src/components/settings/FormRestaurant.tsx` es un Client Component con validación de tipos/tamaño de logo.
- Notificaciones: `react-toastify` (asegúrate de importar sus estilos y montar un `ToastContainer`).
- Tipado estricto en TS (`strict: true`).

## Problemas comunes

- **No se encuentra react-toastify**: `pnpm add react-toastify` e importa `react-toastify/dist/ReactToastify.css`.
- **Error con FK al crear usuario con restaurantId = -1**: usa `NULL` si la FK a `RestaurantInfo(id)` está activa.

## Roadmap breve

- Roles y permisos en panel.
- Estados/stock de ítems en tiempo real.
- Optimización de imágenes (procesado/resize) en subida.
