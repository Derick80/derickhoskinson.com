import Link from "next/link";
import { ModeToggle } from "../theme/theme-toggle";
import { verifySession } from "@/app/actions/auth";
import UserLoginMenu from "./nav-user-bar";
import NavLinks from "./nav-links";
import Breadcrumbs from "@/components/shared/breadcrumbs";
import React from "react";
import { Separator } from "../ui/separator";

const NavigationBar = async () => {
  // for now
  // const isAuthenticated = true
  const userId = "cm2f2spxq000011jt5jagnwio";
  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 mx-auto mb-2 flex max-w-screen-lg flex-col bg-background/80 shadow-md backdrop-blur-sm transition-transform duration-300 ease-in-out`}
    >
      <ul className="flex h-16 items-center justify-around gap-2 md:gap-4">
        <NavLinks />

        {userId ? (
          <li className="flex items-center gap-4">
            <UserLoginMenu userId={userId} />
          </li>
        ) : (
          <>
            <li className="flex items-center gap-4">
              <Link href="/login">Login</Link>
            </li>
            <li className="flex items-center gap-4">
              <ModeToggle />
            </li>
          </>
        )}
      </ul>
      <Separator className="mb-1" />
      <Breadcrumbs />
    </nav>
  );
};

export default NavigationBar;
