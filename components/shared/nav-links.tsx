"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLinks = () => {
  const pathname = usePathname();
  console.log(pathname, "pathname");
  return (
    <>
      { NavData.map((item, index) => (
        <li key={ index }>
          <Link
            prefetch
            href={ item.url }
            className={ `${pathname === item.url ? "underline" : ""}` }
          >
            { item.title }
          </Link>
        </li>
      )) }
    </>
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
    title: "Genetics",
    url: "/genetics",
  },

];

export default NavLinks;
