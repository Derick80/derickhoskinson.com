import prisma from '@/lib/prisma'
import { getExperienceByCvId } from '../actions/cv'
import { ExperienceItem } from './experience-item'

const ExperienceList = async ({ cvId }: { cvId: string }) => {
    const experiences = await getExperienceByCvId({ cvId })
    console.log(experiences, 'experiences')
    return (
        <div>
            <h2 className='mb-4 text-2xl font-bold'>Experience</h2>
            {experiences.map((experience) => (
                <ExperienceItem key={experience.id} experience={experience} />
            ))}
        </div>
    )
}

export default ExperienceList
