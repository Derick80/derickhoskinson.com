"use client";

import { Button } from "@/components/ui/button";
import { ChevronUp, HomeIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Separator } from "../ui/separator";

const PageOverLayBar = ({ sectionIds }: { sectionIds: string[] }) => {
  const [showScrollTop, setShowScrollTop] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      id="resume-nav-bar"
      className="fixed bottom-4 left-0 right-0 z-50 mx-auto flex max-w-[80%] items-center justify-between rounded-xl bg-muted/90 p-2 px-3 shadow-lg backdrop-blur-sm sm:max-w-[60%] md:max-w-[40%] md:justify-around print:hidden"
    >
      {sectionIds.map((sectionId) => (
        <Button
          key={sectionId}
          variant="ghost"
          size="sm"
          onClick={() => scrollToSection(sectionId)}
          className="text-xs"
        >
          {sectionId}
        </Button>
      ))}
      <Separator
        orientation="vertical"
        className="h-4 w-0.5 bg-muted-foreground"
      />
      <Button variant="ghost" size="sm" className="text-xs" asChild>
        <Link href="/">
          <HomeIcon className="h-4 w-4" aria-label="Home" />
        </Link>
      </Button>

      <Button
        variant="ghost"
        size="icon"
        aria-label="Scroll to top"
        onClick={scrollToTop}
        className="ml-2"
        disabled={!showScrollTop}
      >
        <ChevronUp className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default PageOverLayBar;
