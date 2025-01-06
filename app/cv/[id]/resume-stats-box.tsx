'use client'
import { Button } from '@/components/ui/button'
import { ResumeType } from '@/lib/types/cv-resume'
import { scrollToSection } from '@/lib/utils'

type ResumeStatsProps = {
    countOfExperience: number
    countOfEducation: number
    countOfSkills: number
    countOfPublications: number
    countOfDuties: number
    countOfProjects: number

}
const ResumeStats = (
    {
        countOfExperience,
        countOfEducation,
        countOfSkills,
        countOfPublications,
        countOfDuties,
        countOfProjects

    }: ResumeStatsProps

) => {


    return (
        <div
            className='flex flex-col gap-4 w-full '>
            <h2>Section Summary</h2>
            <div
                className='flex gap-1 md:gap-2'>
                {
                    countOfExperience > 0 && (
                        <Button
                            variant='ghost'
                            size='sm'
                            onClick={ () => scrollToSection('experience') }
                            className='text-xs'
                        >
                            Experience { countOfExperience }
                        </Button>
                    )
                }
                {
                    countOfEducation > 0 && (
                        <Button
                            variant='ghost'
                            size='sm'
                            onClick={ () => scrollToSection('education') }
                            className='text-xs'
                        >
                            Education   { countOfEducation }
                        </Button>
                    )
                }
                {
                    countOfSkills > 0 && (
                        <Button
                            variant='ghost'
                            size='sm'
                            onClick={ () => scrollToSection('skills') }
                            className='text-xs'
                        >
                            Skills { countOfSkills }
                        </Button>
                    )

                }

                {
                    countOfPublications > 0 && (
                        <Button
                            variant='ghost'
                            size='sm'
                            onClick={ () => scrollToSection('publications') }
                            className='text-xs'
                        >
                            Publications { countOfPublications }
                        </Button>
                    )



                }
                {
                    countOfDuties > 0 && (
                        <Button
                            variant='ghost'
                            size='sm'
                            onClick={ () => scrollToSection('experience') }
                            className='text-xs'
                        >
                            Duties { countOfDuties }
                        </Button>
                    )
                }
                {
                    countOfProjects > 0 && (
                        <Button
                            variant='ghost'
                            size='sm'
                            onClick={ () => scrollToSection('education') }
                            className='text-xs'
                        >
                            Projects { countOfProjects }
                        </Button>
                    )

                }
            </div>
        </div>
    )
}



export default ResumeStats