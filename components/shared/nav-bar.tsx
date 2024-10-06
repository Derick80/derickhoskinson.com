import Link from "next/link";
import { ModeToggle } from "../theme/theme-toggle";
import { verifySession } from "@/app/actions/auth";
import UserLoginMenu from "./nav-user-bar";
import NavLinks from "./nav-links";
import Breadcrumbs from "@/app/_components/breadcrumbs";
import React from 'react';

const NavigationBar = async () => {
  const session = await verifySession();
  const isAuthenticated = session?.isAuthenticated;
  const userId = session?.userId;
  return (
    <nav
      className={ `fixed left-0 right-0 top-0 z-50 mx-auto mb-4 flex max-w-screen-lg flex-col bg-background/80 shadow-md backdrop-blur-sm transition-transform duration-300 ease-in-out` }
    >
      <ul className="flex h-16 items-center justify-between gap-2 md:gap-4">
        <NavLinks />

        { isAuthenticated && userId ? (
          <UserLoginMenu userId={ userId } />
        ) : (
          <>
            <Link href="/login">Login</Link>
            <ModeToggle />
          </>
        ) }
      </ul>
      <Breadcrumbs />
    </nav>
  );
};

export default NavigationBar;
