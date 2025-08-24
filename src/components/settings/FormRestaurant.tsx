"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, Image as ImageIcon } from "lucide-react";
import { X } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function RestaurantForm({ initialData, userId }: { initialData: any; userId: any }) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    id: initialData?.id || 0,
    name: initialData?.name || "Pate and Coffee",
    logoUrl: initialData?.logoUrl || "",
    address: initialData?.address || "calle 123",
    phone: initialData?.phone || "123456789",
    email: initialData?.email || "info@pateandcoffee.com",
    description: initialData?.description || "Pate and Coffee es un restaurante de comida rápida.",
    website: initialData?.website || "https://pateandcoffee.com",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [logoPreview, setLogoPreview] = useState<string | null>(initialData?.logoUrl || "");
  const [logoFile, setLogoFile] = useState<File | null>();

  // Cargar el archivo predeterminado al iniciar el componente
  useEffect(() => {
    // Si no hay un archivo de logo seleccionado pero hay una ruta predeterminada
    if (!logoFile && formData.logoUrl) {
      const loadDefaultLogo = async () => {
        try {
          // Obtener el archivo desde la ruta
          const response = await fetch(formData.logoUrl);
          const blob = await response.blob();

          // Extraer el nombre del archivo de la ruta
          const fileName = formData.logoUrl.split("/").pop() || "logo.jpeg";

          // Crear un objeto File a partir del blob
          const file = new File([blob], fileName, { type: blob.type });

          // Establecer el archivo como logoFile
          setLogoFile(file);
        } catch (error) {
          console.error("Error al cargar el logo predeterminado:", error);
        }
      };

      loadDefaultLogo();
    }
  }, [formData.logoUrl, logoFile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const MAX_SIZE_BYTES = 1 * 1024 * 1024; // 1 MB
    if (file.size > MAX_SIZE_BYTES) {
      setError("El logo no debe superar 1 MB");
      e.currentTarget.value = ""; // limpia el input
      return;
    }

    // Validar que sea una imagen PNG o JPG
    const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setError("Por favor, selecciona un archivo PNG, JPG o WEBP");
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setLogoPreview(previewUrl);
    setLogoFile(file);
    setFormData((prev) => ({ ...prev, logoUrl: file.name }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      // Crear un objeto FormData para enviar el archivo
      const formDataToSend = new FormData();

      // Añadir todos los campos de texto
      formDataToSend.append("id", formData.id.toString());
      formDataToSend.append("name", formData.name);
      formDataToSend.append("address", formData.address);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("website", formData.website);
      formDataToSend.append("userId", userId);
      if (logoFile) {
        formDataToSend.append("logo", logoFile);
        formDataToSend.append("isFile", "true");
      }

      if (formData.id) {
        await axios.post("/api/restaurant/update", formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        console.log(formDataToSend);
        await axios.post("/api/restaurant/create", formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      // console.log(data);
      toast.success("Información del restaurante guardada correctamente");
      router.push("/dashboard");
    } catch (err) {
      setError("Error al procesar la solicitud");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 ">
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>}

      {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">{success}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Nombre */}
        <div className="space-y-2">
          <Label htmlFor="name">Nombre del Restaurante</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Restaurante Ejemplo"
            required
            disabled={formData.id ? true : false}
          />
        </div>
        {/* Direccion */}
        <div className="space-y-2">
          <Label htmlFor="address">Dirección</Label>
          <Input id="address" name="address" value={formData.address} onChange={handleChange} placeholder="Calle Ejemplo, 123" />
        </div>
        {/* Telefono */}
        <div className="space-y-2">
          <Label htmlFor="phone">Teléfono</Label>
          <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="+34 123 456 789" />
        </div>
        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="info@restaurante.com" />
        </div>
        {/* Sitio Web */}
        <div className="space-y-2">
          <Label htmlFor="website">Sitio Web</Label>
          <Input id="website" name="website" value={formData.website} onChange={handleChange} placeholder="https://www.restaurante.com" />
        </div>
        {/* Descripcion */}
        <div className="space-y-2">
          <Label htmlFor="description">Descripción</Label>
          <Input
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Breve descripción del restaurante"
          />
        </div>
        {/* Logo */}
        <div className="space-y-2 md:col-span-2 mt-4 ">
          <Label htmlFor="logo">Logo del Restaurante</Label>
          <div className="flex flex-col items-center space-y-4">
            {logoPreview ? (
              <div className="relative w-48 h-48 border rounded-md overflow-hidden">
                <img src={logoPreview} alt="Logo preview" className="w-full h-full object-cover" width={100} height={100} />
                <button
                  type="button"
                  onClick={() => {
                    setLogoPreview(null);
                    setLogoFile(null);
                    setFormData((prev) => ({ ...prev, logoUrl: "" }));
                  }}
                  className="absolute top-1 right-1 bg-red-500 
                          text-white rounded-full p-1 border border-transparent 
                          hover:border-red-500 hover:bg-white hover:text-red-500 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center bg-gray-50">
                <ImageIcon className="w-10 h-10 text-gray-400" />
              </div>
            )}

            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="logo-upload"
                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
              >
                <Upload className="w-4 h-4 mr-2" />
                {logoPreview ? "Cambiar logo" : "Subir logo"}
              </label>
              <input
                id="logo-upload"
                name="logo"
                type="file"
                accept=".png,.jpg,.jpeg,.webp"
                onChange={handleLogoChange}
                className="sr-only"
                required
              />
            </div>
          </div>
        </div>
      </div>

      {/* Botón de envío con más espacio y destacado */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <Button
          type="submit"
          className="w-full py-6 text-lg font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 cursor-pointer"
          disabled={isLoading}
        >
          {isLoading ? "Guardando..." : initialData?.id ? "Actualizar Restaurante" : "Crear Restaurante"}
        </Button>
      </div>
    </form>
  );
}
