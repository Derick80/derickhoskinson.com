import Link from "next/link";
import { ModeToggle } from "../theme/theme-toggle";
import { verifySession } from '@/app/actions/auth';
import { DropdownMenu, DropdownMenuTrigger } from '../ui/dropdown-menu';
import UserLoginMenu from './nav-user-bar';

const NavigationBar = async () => {
  const session = await verifySession();
  const isAuthenticated = session?.isAuthenticated;
  const userId = session?.userId




  return (
    <nav
      className={ `fixed left-0 right-0 top-0 z-50 mx-auto flex max-w-screen-lg justify-between shadow-md transition-transform duration-300 ease-in-out` }
    >
      { " " }
      <ul className="hidsden flex h-16 items-center gap-4">
        { NavData.map((item, index) => (
          <li key={ index }>
            <Link prefetch href={ item.url }>
              { item.title }
            </Link>
          </li>
        )) }
      </ul>
      <div className="flex items-center gap-2">
        {
          isAuthenticated && userId ? (
            <UserLoginMenu isAuthenticated={ isAuthenticated } userId={ userId } />
          ) : (
            <Link href="/login">
              Login
            </Link>
          )
        }
        <ModeToggle />
      </div>
    </nav>
  );
};

const NavData = [
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
    title: "About",
    url: "/about",
  },
];

export default NavigationBar;

