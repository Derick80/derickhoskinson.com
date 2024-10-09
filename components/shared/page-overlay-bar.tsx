"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronUp, HomeIcon } from "lucide-react";
import Link from "next/link";

const PageOverLayBar = ({ sectionIds }: { sectionIds: string[] }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
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
      className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 transform"
    >
      <div className="flex flex-col items-center rounded-full bg-background/80 p-2 shadow-lg backdrop-blur-sm print:hidden">
        <div className="flex gap-1 md:gap-2">
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
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-xs" asChild>
            <Link prefetch href="/">
              <HomeIcon className="h-4 w-4" />
            </Link>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={scrollToTop}
            className="ml-2"
            disabled={!showScrollTop}
          >
            <ChevronUp className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PageOverLayBar;
