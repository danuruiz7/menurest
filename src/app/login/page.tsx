import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoginForm from "@/components/auth/login/LoginForm";

export default async function LoginPage() {
  const styleAnimate =
    "cursor-pointer text-5xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent drop-shadow-md animate-pulse inline-block hover:-translate-y-4 transition-transform duration-400";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 gap-6 bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <Card className="w-full sm:w-[450px] max-w-md shadow-lg rounded-2xl py-4 bg-gradient-to-br from-white via-white/85 to-white">
        <CardHeader className="p-10">
          <CardTitle className="text-3xl text-center">
            <div className="flex items-center justify-center gap-1">
              <span className={styleAnimate}>M</span>
              <span className={styleAnimate}>e</span>
              <span className={styleAnimate}>n</span>
              <span className={styleAnimate}>u</span>
              <span className={styleAnimate}>A</span>
              <span className={styleAnimate}>p</span>
              <span className={styleAnimate}>p</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
