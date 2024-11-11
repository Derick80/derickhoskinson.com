import Link from "next/link";
import { ModeToggle } from "../theme/theme-toggle";
import { verifySession } from "@/app/actions/auth";
import UserLoginMenu from "./nav-user-bar";
import { NavLinks, MobileNavigationBar } from "./nav-links";
import React from "react";

const NavigationBar = async () => {
  // for now
  // const isAuthenticated = true
  const session = await verifySession();
  const userId = session ? session.userId : null;
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 mx-auto mb-32 border-2 flex max-w-screen-lg flex-col bg-background/80 shadow-md backdrop-blur-sm transition-transform duration-300 ease-in-out">
      <ul className="flex items-center justify-between gap-2 md:gap-4">
        <li
          className='hidden md:block'>
          <div
            className='ml-10 flex items-baseline space-x-4'>
            <NavLinks />
          </div>
        </li>
        <li
          className='md:hidden'>
          {/* Mobile Navigation */ }

          <MobileNavigationBar

          />


        </li>
        <li
          className='md:hidden'>
          {/* maybe put icon or name here */ }

        </li>
        { userId ? (
          <li className="flex items-center gap-4">
            <UserLoginMenu userId={ userId } />
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
        ) }
      </ul>
    </nav>
  );
};

export default NavigationBar;



const navData = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Blog",
    url: "/blog",
  },
  {
    title: "Projects",
    url: "/projects",
  },
  {
    title: "CV",
    url: "/cv",
  },
  {
    title: "Genetics",
    url: "/genetics",
  },
  {
    title: "Community",
    url: "/community",
  },
];