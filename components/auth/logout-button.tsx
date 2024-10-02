"use client";
import { logout } from "@/app/actions/auth";
import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useFormState } from "react-dom";

export const LogOutButton = () => {
  const [state, action, isPending] = useFormState(logout, null);

  return (
    <form action={action}>
      <Button
        name="logout"
        type="submit"
        variant={"destructive"}
        disabled={isPending}
      >
        <LogOut className="mr-2 h-4 w-4" />
        <span>Log out</span>
      </Button>
    </form>
  );
};
