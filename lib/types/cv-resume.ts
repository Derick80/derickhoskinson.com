import {
    Education,
    EducationProjects,
    CurriculumVitae as PrismaCV,
    Experience,
    Publication,
    Duty,
    JobSkill
} from '@prisma/client'
import { z } from 'zod'

export type ResumeType = ResumeBaseType
export type ResumeBaseType = PrismaCV & {
    education: ResumeEducation[]
    experience: Omit<ResumeExperience, 'createdAt' | 'updatedAt'>[]
    skills: JobSkill[]
    publications: Publication[]
}

type ResumeEducation = Education & {
    projects: EducationProjects[]
}

export type ResumeExperience = Experience & {
    duties: Duty[]
}

export const ExperienceDutySchema = z.object({
    id: z.string(),
    title: z.string().min(1),
    position: z.number()
})

export const ExperienceSchema = z.object({
    id: z.string(),
    company: z.string().min(1),
    jobTitle: z.string().min(1),
    location: z.string().min(1),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    duties: z.array(ExperienceDutySchema)
})

export type ExperienceSchema = z.infer<typeof ExperienceSchema>
