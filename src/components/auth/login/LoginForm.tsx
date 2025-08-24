// src/components/auth/login/LoginForm.tsx
"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useLoginForm } from "@/hooks/users/useLoginForm";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { User } from "lucide-react";
import { Lock } from "lucide-react";

const LoginForm = () => {
  const {
    identifier,
    setIdentifier,
    password,
    setPassword,
    rememberMe,
    setRememberMe,
    error,
    loading,
    handleSubmit,
  } = useLoginForm();

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-10">
      <div className="space-y-7">
        <div className="space-y-3">
          <Label htmlFor="identifier" className="ml-1" >
            <span className="">Usuario</span>
             <User className="inline" width={14} height={14} />
          </Label>
          <Input
            id="identifier"
            type="text"
            value={identifier}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIdentifier(e.target.value)}
            placeholder="Nombre de usuario"
            required
            className="border-2 border-gray-300 hover:-translate-y-0.5 hover:border-none hover:shadow hover:shadow-gray-900 transition-all duration-100"
            disabled={loading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password" className="ml-1">
            <span className="">Contraseña</span> 
            <Lock className="inline" width={14} height={14}  />
          </Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            placeholder="Contraseña"
            required
            className="border-2 border-gray-300 hover:-translate-y-0.5 hover:border-none hover:shadow hover:shadow-gray-500 transition-all duration-100"
            disabled={loading}
          />
        </div>
      </div>
      <div className="flex flex-col gap-10 ml-1">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="rememberMe"
            checked={rememberMe}
            onCheckedChange={(checked: boolean) => setRememberMe(checked)}
            className="cursor-pointer hover:-translate-y-0.5 shadow shadow-gray-500 hover:shadow hover:shadow-gray-900 transition-all duration-100"
            disabled={loading}
          />
          <Label htmlFor="rememberMe" className="cursor-pointer">
            Recordarme
          </Label>
        </div>
        {error && (
          <Badge variant="destructive" className="p-2 text-center">
            {error}
          </Badge>
        )}
        <Button
          type="submit"
          className="w-full cursor-pointer hover:-translate-y-0.5 hover:shadow hover:shadow-gray-500 transition-all duration-100 flex items-center justify-center"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin mr-2 h-5 w-5" />
              Verificando...
            </>
          ) : (
            "Iniciar Sesión"
          )}
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
