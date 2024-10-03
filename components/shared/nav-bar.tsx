
import Link from "next/link";
import { ModeToggle } from "../theme/theme-toggle";
import { verifySession } from "@/app/actions/auth";
import UserLoginMenu from "./nav-user-bar";
import NavLinks from './nav-links';

const NavigationBar = async () => {
  const session = await verifySession();
  const isAuthenticated = session?.isAuthenticated;
  const userId = session?.userId;
  return (
    <nav
      className={ `fixed left-0 right-0 top-0 z-50 mx-auto flex max-w-screen-lg justify-between shadow-md transition-transform duration-300 ease-in-out` }
    >
      <ul className="hidsden flex h-16 items-center gap-4">
        <NavLinks />
      </ul>
      <div className="flex items-center gap-2">
        { isAuthenticated && userId ? (
          <UserLoginMenu isAuthenticated={ isAuthenticated } userId={ userId } />
        ) : (
          <Link href="/login">Login</Link>
        ) }
        <ModeToggle />
      </div>
    </nav>
  );
};


export default NavigationBar;
