import { JWTPayload, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

export const validToken = async (): Promise<JWTPayload | null> => {
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get("token");
  if (!tokenCookie) return null;

  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) throw new Error('JWT_SECRET no está definida en las variables de entorno');

  try {
    const secret = new TextEncoder().encode(JWT_SECRET); //El secreto debe ser un Uint8Array, por eso usamos TextEncoder().encode.
    const { payload } = await jwtVerify(tokenCookie.value, secret);
    return payload;
  } catch (err) {
    console.error('Token inválido:', err);
    return null;
  }
};