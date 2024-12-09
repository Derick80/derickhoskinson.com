'use client'

import { Button } from '@/components/ui/button'

const EvidenceButton = ({ experienceId }: { experienceId: string }) => {
    return (
        <Button
            type='button'
            onClick={(event) => {
                event.preventDefault()
                console.log('edit company')
            }}
        >
            Edit
        </Button>
    )
}

export default EvidenceButton
