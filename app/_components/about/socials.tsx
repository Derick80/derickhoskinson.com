import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { LinkedinIcon, MailIcon } from "lucide-react";
import Link from "next/link";

const Socials = () => {
  return (
    <div className="flex items-center space-x-4">
      {socialsArray.map((soc, socialIndex) => (
        <Link
          key={soc.social}
          href={soc.link}
          rel="noopener noreferrer"
          target="_blank"
        >
          {soc.icon}
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
    icon: <LinkedinIcon />,
  },
  {
    social: "GitHub",
    link: "https://github.com/Derick80",
    icon: <GitHubLogoIcon />,
  },
  {
    social: "Email",
    link: "mailto:iderick@gmail.com",
    icon: <MailIcon />,
  },
];
