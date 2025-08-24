import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { SignJWT } from 'jose'


export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();
    console.log("Login",{ username, password })

    if (!username || !password) {
      return NextResponse.json({ error: 'Faltan credenciales' }, { status: 400 });
    }

    // Busca el usuario por username usando Prisma
    const user = await prisma.user.findUnique({
      where: { username }
    });

    if (!user) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 401 });
    }

    // console.log({ user })

    // Verifica el password
    if (password !== user.password) {
      return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 });
    }

    // Prepara los datos del usuario sin la contraseña
    const userData = {
      userId: user.id,
      username: user.username || "",
      name: user.name || "",
      lastname: user.lastname || "",
      email: user.email || "",
      role: user.role,
      restaurantId: user.restaurantId,
      isActive: user.isActive,
      lastLogin: new Date(),
      createdAt: user.createdAt || '',
      updatedAt: user.updatedAt || ''
    };

    // console.log({ userData })

    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      throw new Error('JWT_SECRET no está definida en el .env');
    }

    // Crear el token con jose en lugar de jsonwebtoken
    const token = await new SignJWT(userData)
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('1h')
      .setIssuedAt()
      .sign(new TextEncoder().encode(JWT_SECRET));

    const response = NextResponse.json({
      message: 'Login exitoso'
    });

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60, // 1 hora
    });

    return response;
  } catch (error) {
    console.error('Error en login:', error);
    return NextResponse.json({ error: 'Error en el servidor' }, { status: 500 });
  }
}