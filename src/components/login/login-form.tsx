"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";

export default function LoginForm() {
  const google = () => signIn("google", { callbackUrl: "/" });

  return (
    <div className="w-[400px] rounded-lg p-10 bg-primary-foreground shadow-xl shadow-black/50 space-y-3">
      <div className="mt-2 ">
        <Button variant={"outline"} onClick={google} className="w-full">
          <FcGoogle size={20} className="mr-2" />
          Login with Google
        </Button>
      </div>
      <div>
        <Button asChild>
          <Link href={"/"} className="w-full">
            Back To Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
