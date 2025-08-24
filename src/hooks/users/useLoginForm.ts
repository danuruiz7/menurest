// src/hooks/useLoginForm.ts
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export function useLoginForm() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem("rememberMeData");
    if (saved) {
      try {
        const { id, remember, password } = JSON.parse(saved);
        setIdentifier(id);
        setRememberMe(remember);
        setPassword(password);
      } catch (err) {
        // Si hay un error al parsear, eliminar los datos guardados
        localStorage.removeItem("rememberMeData");
        console.error("Error al recuperar datos guardados:", err);
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validaciones básicas
    if (!identifier.trim()) {
      setError("El nombre de usuario es obligatorio");
      setLoading(false);
      return;
    }

    if (!password.trim()) {
      setError("La contraseña es obligatoria");
      setLoading(false);
      return;
    }

    // Guardar datos si "recordarme" está activado
    if (rememberMe) {
      localStorage.setItem(
        "rememberMeData",
        JSON.stringify({ id: identifier, remember: true, password })
      );
    } else {
      localStorage.removeItem("rememberMeData");
    }

    try {
      const response = await axios.post("/api/auth/login", {
        username: identifier,
        password,
      });

      // Verificar si la respuesta es exitosa
      if (response.status === 200) {
        setError(null);
        router.push("/dashboard");
        router.refresh(); // Forzar actualización para reflejar el estado de autenticación
      } else {
        setError(response.data.error || "Error en el inicio de sesión");
        setLoading(false);
      }
    } catch (err: any) {
      // Manejo detallado de errores
      if (axios.isAxiosError(err)) {
        if (err.response) {
          // El servidor respondió con un código de estado diferente de 2xx
          setError(err.response.data.error || `Error ${err.response.status}: ${err.response.statusText}`);
        } else if (err.request) {
          // La solicitud se realizó pero no se recibió respuesta
          setError("No se recibió respuesta del servidor. Verifica tu conexión.");
        } else {
          // Error al configurar la solicitud
          setError(`Error al realizar la solicitud: ${err.message}`);
        }
      } else {
        setError("Error inesperado en el inicio de sesión");
      }
      console.error("Error en login:", err);
      setLoading(false);
    }
  };

  return {
    identifier,
    setIdentifier,
    password,
    setPassword,
    rememberMe,
    setRememberMe,
    error,
    loading,
    handleSubmit,
  };
}