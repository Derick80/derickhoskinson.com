type ResumeSkillsProps = {
    skills: {
        id: string
        title: string
        cvId: string
        createdAt: Date
        updatedAt: Date
    }[]
}

const ResumeSkills = ({ skills }: ResumeSkillsProps) => {
    return (
        <div className='flex flex-col items-center space-y-2'>
            <h2 className='text-2xl font-bold'>Skills</h2>
            <div className='flex flex-col gap-2'>
                { skills.map((skill) => (
                    <div key={ skill.id }>{ skill.title }</div>
                )) }
            </div>
        </div>
    )
}
export default ResumeSkills
