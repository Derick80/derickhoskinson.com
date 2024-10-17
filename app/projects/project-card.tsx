import { GitHubLogoIcon, ExternalLinkIcon } from "@radix-ui/react-icons";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Project } from "@/lib/resources/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type ProjectCardProps = {
  projects: Project;
};

const ProjectCard = ({ projects }: ProjectCardProps) => {
  return (
    <Card className="flex h-full flex-col border-2 shadow-md">
      <CardHeader>
        <CardTitle>{projects.title}</CardTitle>
        <CardDescription>{projects.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5 md:flex-row">
        <div className="flex w-full flex-col gap-5 md:w-1/2">
          <div>
            <h3 className="border-b-2 md:border-none">Technlogy Stack</h3>
            <ul className="flex flex-wrap gap-2">
              {projects.technologyStacks.map((tech) => {
                return (
                  <li key={tech.value}>
                    <Badge>
                      <a
                        href={tech.url}
                        referrerPolicy="no-referrer"
                        target="_blank"
                      >
                        {tech.value}
                      </a>
                    </Badge>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="border-b-2 md:border-none">Features</h3>
            <ul className="flex flex-wrap gap-2">
              {projects.features.map((feature) => {
                return (
                  <li key={feature.value}>
                    <Badge variant="secondary">{feature.value}</Badge>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="hidden flex-col gap-2 md:flex md:w-1/2">
          <h3 className="border-b-2 md:border-none">Preview</h3>
          <Image
            src={projects.primaryImage || "/images/placeholder.png"}
            alt={projects.title}
            width={500}
            height={300}
          />
        </div>
      </CardContent>
      <CardFooter className="flex w-full flex-col items-baseline gap-3">
        <h3 className="border-b-2">Resources</h3>
        <div className="flex w-full justify-between gap-2 md:justify-normal">
          <a
            href={projects.githubUrl}
            referrerPolicy="no-referrer"
            target="_blank"
          >
            <Button variant="secondary" className="flex items-center gap-2">
              <GitHubLogoIcon />
              View Code
            </Button>
          </a>{" "}
          <a
            href={projects.projectUrl}
            referrerPolicy="no-referrer"
            target="_blank"
          >
            <Button variant="secondary" className="flex items-center gap-2">
              <ExternalLinkIcon />
              View Project
            </Button>
          </a>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="border-b-2">Status</h3>
          <Badge>{projects.status.toUpperCase()}</Badge>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
