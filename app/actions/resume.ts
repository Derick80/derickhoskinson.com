"use server";

import { resume_basics } from "@/lib/resources/resume";

type ASTResume = {
  type: string;
  value?: string;
  children?: ASTResume[];
};
const generateASTResume = async () => {
  const cv = resume_basics;
  const generateResumeAST = (): ASTResume => {
    return {
      type: "resume",
      children: [
        {
          type: "header",
          children: [
            { type: "name", value: cv.title },
            { type: "location", value: cv.location },
            { type: "contact", value: `${cv.email} | ${cv.phoneNumber}` },
            { type: "website", value: cv.website },
          ],
        },
        {
          type: "summary",
          value: cv.summary,
        },
        {
          type: "experience",
          children: cv.experience.map(
            (job: {
              title: string;
              company: string;
              location: string;
              startDate: string;
              endDate: string;
              duties: {
                description: string;
              }[];
            }) => ({
              type: "job",
              children: [
                { type: "title", value: job.title },
                { type: "company", value: job.company },
                { type: "location", value: job.location },
                {
                  type: "duration",
                  value: `${job.startDate} - ${job.endDate}`,
                },
                {
                  type: "duties",
                  children: job.duties.map((duty: { description: string }) => ({
                    type: "duty",
                    value: duty.description,
                  })),
                },
              ],
            }),
          ),
        },
        {
          type: "skills",
          children: cv.skills.map((skill: { skill: string }) => ({
            type: "skill",
            value: skill.skill,
          })),
        },
        {
          type: "education",
          children: cv.education.map(
            (edu: {
              degree: string;
              field: string;
              institution: string;
              startDate: string;
              endDate: string;
              duties: {
                description: string;
              }[];
            }) => ({
              type: "education_entry",
              children: [
                { type: "degree", value: `${edu.degree} in ${edu.field}` },
                { type: "institution", value: edu.institution },
                {
                  type: "duration",
                  value: `${edu.startDate} - ${edu.endDate}`,
                },
                {
                  type: "duties",
                  children: edu.duties.map((duty: { description: string }) => ({
                    type: "duty",
                    value: duty.description,
                  })),
                },
              ],
            }),
          ),
        },
        {
          type: "publications",
          children: cv.publications.map(
            (pub: {
              title: string;
              journal: string;
              year: string;
              authors: string;
              edition: string;
              doi: string;
            }) => ({
              type: "publication",
              children: [
                { type: "title", value: pub.title },
                { type: "journal", value: pub.journal },
                { type: "year", value: pub.year },
                { type: "authors", value: pub.authors },
                { type: "edition", value: pub.edition },
                { type: "url", value: pub.doi },
              ],
            }),
          ),
        },
      ],
    };
  };

  const downloadResumeAST = async () => {
    const ast = generateResumeAST();
    const jsonString = JSON.stringify(ast, null, 2);
    const blob = new Blob([jsonString], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "dch_resume.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return downloadResumeAST;
};

export { generateASTResume };
