import { projects } from '@/lib/resources/projects';
import ProjectCard from './project-card';
import generateProjectsMetadata from './generate-projects-metadata';

export const metadata = generateProjectsMetadata();
export default function ProjectPages () {
  return (
    <div className="container mx-auto px-4 py-8 gap-4 flex flex-col">

      <h1>Projects</h1>
      <p>
        Here are some of the projects that I have worked on. You can find more of my projects on Github.
      </p>
      <p>
        I may change the layout of this page as I consolidate my projects into one central application.
      </p>
      {
        projects.map((project) => (
          <ProjectCard key={ project.title } projects={ project } />
        ))
      }


    </div>
  );
}
