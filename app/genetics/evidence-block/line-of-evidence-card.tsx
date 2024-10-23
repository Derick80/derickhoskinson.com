'use client'

import {
    Card,
    CardHeader,
    CardContent,
    CardFooter,
    CardTitle,
    CardDescription,

} from '@/components/ui/card'
import { evidenceData } from '../genetic-resources/criteria-testing';
import { EvidenceButton } from './evidence-button';
import React from 'react';
import { Label } from '@/components/ui/label';
import EvidenceSelector from './evidence-selector-test';
import SlantedCard from './slanted-card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import EvidenceCard from './evidences-card';


export type LinesOfEvidenceProps = {
    lineOfEvidence: string;
}

const LinesOfEvidence = (
    { lineOfEvidence }: LinesOfEvidenceProps
) => {
    const [selectedEvidence, setSelectedEvidence] = React.useState<string[]>([])
    const evidence = evidenceData.find(item => item.evidenceCategory === lineOfEvidence);
    console.log(evidence, 'evidence');

    const handleEvidenceSelection = (evidenceCode: string) => {
        //    look for the evidence code in the selected evidence array. If it exists, remove it. If it doesn't exist, add it. This should be able to handle multiple selections and be used in 3 different instances on the same page without interfering with each other.

        const newSelectedEvidence = selectedEvidence.includes(evidenceCode)
            ? selectedEvidence.filter((item: string) => item !== evidenceCode)
            : [...selectedEvidence, evidenceCode];
        setSelectedEvidence(newSelectedEvidence);

        console.log(newSelectedEvidence, 'newSelectedEvidence');


    }

    if (!evidence) {
        return <div>No evidence found for { lineOfEvidence }</div>;
    }

    return (
        <div className="w-full max-w-4xl mx-auto p-2 space-y-6">
            <div className="w-full max-w-4xl mx-auto p-2 space-y-6">
                <div className="relative overflow-hidden rounded-lg shadow-lg">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 transform -skew-x-6 origin-top-right" />
                    <div className="relative z-10 p-2 bg-white bg-opacity-90">
                        <h3 className="mb-4">{ evidence.evidenceCategory }</h3>
                        <p className="italic text-sm leading-4">{ evidence.evidenceCategoryDescription }</p>

                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="evidence-codes">
                                <AccordionTrigger>Evidence Codes</AccordionTrigger>
                                <AccordionContent>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        { evidence.evidenceCodes.map((code, codeIndex) => (
                                            <div key={ codeIndex } className="space-y-2">
                                                <EvidenceButton
                                                    evidenceLabel={ code.label }
                                                    onClick={ () => handleEvidenceSelection(code.code) }
                                                />
                                            </div>
                                        )) }
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>

                        { selectedEvidence.length > 0 && (
                            <div className="mt-6">
                                <Label className="text-gray-800 mb-2 block">Selected Evidence:</Label>
                                <div className="flex flex-wrap gap-2">
                                    { selectedEvidence.map((code) => (
                                        <EvidenceCard
                                            key={ code }
                                        // Add any necessary props for EvidenceCard
                                        />
                                    )) }
                                </div>
                            </div>
                        ) }
                    </div>
                </div>
            </div>
        </div>

    )
}

export default LinesOfEvidence;