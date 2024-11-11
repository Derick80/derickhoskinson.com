"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,

} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import React from 'react';
import { Menu, SquareX, X } from 'lucide-react';

const NavLinks = () => {
  const pathname = usePathname();
  return (
    <>
      { navData.map((item, index) => (
        <Link
          key={ index }
          prefetch
          href={ item.url }
          className={ `text-lg md:text-xl ${pathname === item.url ? "underline" : ""}` }
        >
          { item.title }
        </Link>
      )) }
    </>
  );
};

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




const MobileNavigationBar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleMenu = () => setIsOpen(!isOpen)
  const pathname = usePathname();
  return (
    <DropdownMenu
      open={ isOpen }
      onOpenChange={ setIsOpen }
    >
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
          onClick={
            () => toggleMenu()
          }
        >
          { isOpen ? (
            <X className="block h-4 w-4" aria-hidden="true" />
          ) : (
            <Menu className="block h-4 w-4" aria-hidden="true" />
          ) }
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-56"
      >
        {
          navData.map((item, index) => (
            <DropdownMenuItem
              key={ index }
              asChild>
              <Link
                prefetch
                href={ item.url }
                className={ `w-full text-lg md:text-xl ${pathname === item.url ? "underline" : ""}` }
              >
                { item.title }
              </Link>
            </DropdownMenuItem>
          ))
        }
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


export { NavLinks, MobileNavigationBar };