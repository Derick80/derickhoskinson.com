"use client";
import { usePathname } from "next/navigation";

const NavigationPath = () => {
  const pathname = usePathname();

  return (
    <p className="uppercase text-muted-foreground underline underline-offset-2 md:hidden">
      {/* write some regex to remove the / at the begining  */}
      {pathname.replace(/^\/+/g, "")}
    </p>
  );
};

export default NavigationPath;
