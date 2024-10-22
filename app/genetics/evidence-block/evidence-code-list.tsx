import { Button } from '@/components/ui/button'
import { evidenceData } from '../genetic-resources/criteria-testing'


const EvidenceCodeList = ({ primaryCategory,

    onChooseEvidenceCode
}: {
    primaryCategory: string

    onChooseEvidenceCode: (evidenceCode: string) => void
}) => {

    const evidenceCodes = evidenceData.find((category) => category.evidenceCategory === primaryCategory)?.evidenceCodes

    return (
        <>
            {
                evidenceCodes?.map((evidenceCode) => (
                    <Button
                        onClick={ () => onChooseEvidenceCode(evidenceCode.code) }
                        key={ evidenceCode.code }

                    >
                        <div
                            className='font-semibold'>
                            { evidenceCode.label }
                        </div>

                    </Button>
                ))
            }
        </>
    )
}

export default EvidenceCodeList