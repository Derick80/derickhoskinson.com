"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLinks = () => {
  const pathname = usePathname();
  return (
    <>
      {NavData.map((item, index) => (
        <li key={index}>
          <Link
            prefetch
            href={item.url}
            className={`text-lg md:text-xl ${pathname === item.url ? "underline" : ""}`}
          >
            {item.title}
          </Link>
        </li>
      ))}
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
  {
    title: "Community",
    url: "/community",
  },
];

export default NavLinks;
