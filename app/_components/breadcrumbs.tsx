"use client";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

const Breadcrumbs = () => {
  const segments = useSelectedLayoutSegments();

  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-4 ml-2 text-sm text-muted-foreground"
    >
      <ol className="inline-flex list-none p-0">
        <li className="flex items-center">
          <Link
            href="/"
            className="transition-colors duration-200 ease-in-out hover:text-gray-700"
          >
            <Home className="h-4 w-4" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {segments.map((segment, index) => {
          const href = `/${segments.slice(0, index + 1).join("/")}`;
          const label = segment.charAt(0).toUpperCase() + segment.slice(1);
          const isLast = index === segments.length - 1;

          return (
            <li key={href} className="flex items-center">
              <ChevronRight className="mx-2 h-4 w-4" />
              {isLast ? (
                <span aria-current="page" className="font-medium text-gray-700">
                  {label}
                </span>
              ) : (
                <Link
                  href={href}
                  className="transition-colors duration-200 ease-in-out hover:text-gray-700"
                >
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
