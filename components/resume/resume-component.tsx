import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

import Link from "next/link";
import { DownloadIcon, ExternalLinkIcon } from "lucide-react";
import { Badge } from "../ui/badge";
import DownloadResumeButton from "./resume-download";
export type Skill = {
  skill: string;
};
export type Education = {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  primaryProject: string;
  duties: {
    description: string;
  }[];
};
export type Publication = {
  title: string;
  authors: string;
  journal: string;
  year: string;
  edition: string;
  type: string;
  doi: string;
  pmid: string;
  pmcid: string;

  pdf: string | null;
};

export type ProfessionalExperience = {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  duties: {
    description: string;
  }[];
};
export type CV = {
  cv: {
    title: string;
    phoneNumber: number;
    email: string;
    website: string;
    location: string;
    summary: string;
    experience: ProfessionalExperience[];
    publications: Publication[];
    education: Education[];
    skills: Skill[];
  };
};

const ResumeCard = ({ cv }: CV) => {
  // write a functrion that searches for my name in the authors. it appears as Hoskinson, D. C. or Hoskinson, D, or Hoskinson D.

  return (
    <div className="mx-auto max-w-4xl space-y-8 p-4">
      <h1 className="text-3xl font-bold">
        Derick Hoskinson&apos;s Curriculum Vitae
      </h1>
      <div className="flex justify-between">
        <p className="text-muted-foreground">
          download a copy of my curriculum vitae
        </p>
        <DownloadResumeButton />
      </div>
      <div id="resume-content" className="space-y-6">
        <header className="mb-4 text-center md:mb-6">
          <h1 className="text-3xl font-bold">{ cv.title }</h1>
          <p className="text-muted-foreground">{ cv.location }</p>
          <p className="text-muted-foreground">{ cv.email }</p>
          <Link
            href={ cv.website }
            prefetch={ true }
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground"
          >
            { cv.website }
          </Link>
        </header>
        <section id="summary">
          <div className="flex justify-between">
            <h2 className="mb-2 scroll-m-20 border-b border-primary pb-2 text-2xl font-semibold tracking-tight first:mt-0">
              Summary
            </h2>
          </div>
          <p className="text-muted-foreground">{ cv.summary }</p>
        </section>
        <section id="experience">
          <h2 className="mb-2 scroll-m-20 border-b border-primary pb-2 text-2xl font-semibold tracking-tight first:mt-0">
            Professional Experience
          </h2>
          { cv.experience.map((job, index) => (
            <Card
              key={ index }
              className="print-no-border mb-4 border-none print:shadow-none"
            >
              <CardHeader className="ml-0 mr-0 p-0">
                <CardTitle>{ job.title }</CardTitle>
                <p className="text-muted-foreground">
                  { job.company } - { job.location }
                </p>
                <p className="text-sm text-muted-foreground">
                  { job.startDate } - { job.endDate }
                </p>
              </CardHeader>

              <CardContent>
                <ul className="list-disc space-y-1 pl-1 md:pl-4">
                  { job.duties.map((duty, dutyIndex) => (
                    <li className="text-sm" key={ dutyIndex }>
                      { duty.description }
                    </li>
                  )) }
                </ul>
              </CardContent>
            </Card>
          )) }
        </section>
        <section id="publications">
          <h2 className="mb-2 scroll-m-20 border-b border-primary pb-2 text-2xl font-semibold tracking-tight first:mt-0">
            Publications
          </h2>

          { cv.publications.map((pub, pubIndex) => (
            <Card
              key={ pubIndex }
              className="print-no-border mb-2 print:shadow-none"
            >
              <CardHeader className="ml-0 mr-0 p-0">
                <CardTitle className="text-lg">{ pub.title }</CardTitle>
                <p className="text-muted-foreground">
                  { pub.journal }, { pub.year }
                </p>
              </CardHeader>

              <CardContent className="pb-2 pl-1">
                { authorHighlight(pub.authors) }
                <div className="flex gap-2">
                  <Link
                    href={ pub.doi }
                    prefetch={ true }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-2 text-primary underline md:gap-4"
                  >
                    Journal Information: &nbsp;
                    { pub.edition }
                  </Link>
                </div>

                <div className="flex justify-between gap-2">
                  { pub.pdf && (
                    <Link
                      href={ pub.pdf }
                      prefetch={ true }
                      className="flex gap-2 text-primary underline md:gap-4"
                    >
                      Download PDF <DownloadIcon />
                    </Link>
                  ) }

                  <Link
                    href={ pub.doi }
                    prefetch={ true }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-2 text-primary underline md:gap-4"
                  >
                    Read <ExternalLinkIcon />
                  </Link>
                </div>
              </CardContent>
            </Card>
          )) }
        </section>

        <section id="education">
          <h2 className="mb-2 scroll-m-20 border-b border-primary pb-2 text-2xl font-semibold tracking-tight first:mt-0">
            Education
          </h2>

          { cv.education.map((edu, index) => (
            <Card
              key={ index }
              className="print-no-border flex flex-col items-stretch gap-2 rounded-md border-none p-1 print:shadow-none"
            >
              <CardHeader className="ml-0 mr-0 p-0">
                <CardTitle>{ edu.degree }</CardTitle>
                <p className="text-muted-foreground">{ edu.institution }</p>
                <p className="text-sm text-muted-foreground">
                  { edu.startDate } - { edu.endDate }
                </p>
              </CardHeader>
              <CardDescription>{ edu.primaryProject }</CardDescription>
              <CardContent>
                <ul className="list-disc space-y-1 pl-5">
                  { edu.duties.map((duty, index) => (
                    <li className="text-sm" key={ index }>
                      { duty.description }
                    </li>
                  )) }
                </ul>
              </CardContent>
            </Card>
          )) }
        </section>

        <section id="skills">
          <h2 className="mb-2 scroll-m-20 border-b border-primary pb-2 text-2xl font-semibold tracking-tight first:mt-0">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            { cv.skills.map((skill, index) => (
              <Badge key={ index } variant="secondary">
                { skill.skill }
              </Badge>
            )) }
          </div>
        </section>
      </div>
    </div>
  );
};

export default ResumeCard;

// This code looks for my name from an array of possible combinations then it looks for a match in the authors string list.

const authorHighlight = (authors: string) => {
  const authorArray = authors.split(".");
  const myNames = ["Hoskinson D", "Hoskinson, DC.", "Hoskinson, D"];
  return (
    <span className="text-sm text-muted-foreground">
      { authorArray.map((author, index) => (
        <React.Fragment key={ index }>
          { myNames.some((name) => author.includes(name)) ? (
            <span className="font-bold text-primary">{ author }</span>
          ) : (
            <span className="italic">{ author }</span>
          ) }
        </React.Fragment>
      )) }
    </span>
  );
};
