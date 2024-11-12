import {
  GitHubLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import { Button } from "../ui/button";
import { MailIcon } from "lucide-react";

const Socials = () => {
  return (
    <div className="mt-auto flex flex-col gap-4">
      <p
        className="text-muted-foreground"
      >Connect with me on social media</p>

      <div className="flex flex-wrap gap-4">
        { socialsArray.map((soc) => (
          <Button key={ soc.social } variant="outline" size="icon" asChild>
            <Link
              href={ soc.link }
              target="_blank"
              aria-label={ `Visit ${soc.social}` }
            >
              { soc.icon }
            </Link>
          </Button>
        )) }
      </div>
    </div>
  );
};

export default Socials;

const socialsArray = [
  {
    social: "LinkedIn",
    link: "https://www.linkedin.com/in/dhoskinson/",
    icon: <LinkedInLogoIcon className="h-4 w-4" />,
  },
  {
    social: "GitHub",
    link: "https://github.com/Derick80",
    icon: <GitHubLogoIcon className="h-4 w-4" />,
  },
  {
    social: "Twitter",
    link: "https://www.twitter.com/GeneticsStar",
    icon: <TwitterLogoIcon className="h-4 w-4" />,
  },
  {
    social: "Email",
    link: "mailto:derickchoskinson@gmail.com",
    icon: <MailIcon className="h-4 w-4" />,
  },
];
