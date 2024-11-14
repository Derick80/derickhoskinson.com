'use client'

import { Label } from '@/components/ui/label'
import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@/components/ui/accordion'
export type EvidenceState = {
    [evidenceCode: string]: {
        score: number
        lineOfEvidence: string
    }
}

export type SharedEvidenceProps = {
    evidenceState: EvidenceState
}

const SharedEvidence: React.FC<SharedEvidenceProps> = ({ evidenceState }) => {
    const totalScore = Object.values(evidenceState).reduce(
        (acc, curr) => acc + curr.score,
        0
    )

    const scoresByLineOfEvidence = Object.entries(evidenceState).reduce(
        (acc, [code, data]) => {
            if (!acc[data.lineOfEvidence]) {
                acc[data.lineOfEvidence] = 0
            }
            acc[data.lineOfEvidence] += data.score
            return acc
        },
        {} as { [key: string]: number }
    )

    return (
        <div className='mx-auto w-full max-w-4xl space-y-6 rounded-md border p-4 pt-1'>
            <Accordion type='single' collapsible className='w-full'>
                <AccordionItem value='total-score'>
                    <AccordionTrigger className='p-0'>
                        <div className='flex items-center justify-between'>
                            <Label className='text-lg font-bold'>
                                Total Score:
                            </Label>
                            <span>{totalScore}</span>
                        </div>
                        <div className='flex items-center justify-between'>
                            <Label className='text-lg font-bold'>
                                ACMG Classification
                            </Label>
                            <span>{totalScore > 0 ? 'wow' : 'vus'}</span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className='space-y-2 overflow-scroll'>
                            <Label className='text-lg font-bold'>
                                Breakdown by Evidence Code:
                            </Label>
                            {Object.entries(evidenceState).map(
                                ([code, data]) => (
                                    <div
                                        key={code}
                                        className='flex justify-between'
                                    >
                                        <Label>{code}:</Label>
                                        <span>{data.score}</span>
                                    </div>
                                )
                            )}
                        </div>
                        {Object.entries(scoresByLineOfEvidence).map(
                            ([loe, score]) => (
                                <div key={loe} className='flex justify-between'>
                                    <Label>{loe}:</Label>
                                    <span>{score}</span>
                                </div>
                            )
                        )}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

export default SharedEvidence
