"use client";

import React from "react";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";

export default function LogoutBtn() {
  return (
    <Button
      variant={"link"}
      onClick={() => signOut({ callbackUrl: "/" })}
      className="p-0"
    >
      Sign out
    </Button>
  );
}
