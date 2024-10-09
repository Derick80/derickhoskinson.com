import {
  GitHubLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";

const Socials = () => {
  return (
    <div className="flex items-center space-x-4">
      {socialsArray.map((soc) => (
        <Link key={soc.social} href={soc.link} target="_blank">
          {soc.icon}
          <p className="text-xs text-muted-foreground">{soc.social}</p>
        </Link>
      ))}
    </div>
  );
};

export default Socials;

const socialsArray = [
  {
    social: "LinkedIn",
    link: "https://www.linkedin.com/in/dhoskinson/",
    icon: <LinkedInLogoIcon />,
  },
  {
    social: "GitHub",
    link: "https://github.com/Derick80",
    icon: <GitHubLogoIcon />,
  },
  {
    social: "Twitter",
    link: "https://www.twitter.com/GeneticsStar",
    icon: <TwitterLogoIcon />,
  },
];
