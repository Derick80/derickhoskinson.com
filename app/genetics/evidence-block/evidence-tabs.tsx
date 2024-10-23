"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { evidenceData } from '../genetic-resources/criteria-testing';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';
import { EvidenceButton } from './evidence-button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import SharedEvidence, { EvidenceState } from './shared-evidence';
import EvidenceCard from './evidences-card';

const EvidenceTabs: React.FC = () => {
    const [evidenceState, setEvidenceState] = useState<EvidenceState>({});

    const updateEvidence = (evidenceCode: string, score: number, lineOfEvidence: string) => {
        setEvidenceState(prevState => ({
            ...prevState,
            [evidenceCode]: { score, lineOfEvidence }
        }));
    };

    const handleEvidenceSelection = (category: string, evidenceCode: string) => {
        if (evidenceState[evidenceCode]) {
            const { [evidenceCode]: _, ...rest } = evidenceState;
            setEvidenceState(rest);
        } else {
            updateEvidence(evidenceCode, 0, category);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto space-y-6">
            <SharedEvidence evidenceState={ evidenceState } />
            <Tabs defaultValue="Population Evidence" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    { evidenceData.map(category => (
                        <TabsTrigger key={ category.evidenceCategory } value={ category.evidenceCategory }>
                            { category.evidenceCategory }
                        </TabsTrigger>
                    )) }
                </TabsList>
                { evidenceData.map(category => (
                    <TabsContent key={ category.evidenceCategory } value={ category.evidenceCategory }>
                        <Card>
                            <CardHeader>
                                <CardTitle>{ category.evidenceCategory }</CardTitle>
                                <CardDescription>{ category.evidenceCategoryDescription }</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Accordion type="single" collapsible className="w-full">
                                    <AccordionItem value="evidence-codes">
                                        <AccordionTrigger>Evidence Codes</AccordionTrigger>
                                        <AccordionContent>
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                                { category.evidenceCodes.map((code) => (
                                                    <EvidenceButton
                                                        key={ code.code }
                                                        evidenceLabel={ code.label }
                                                        onClick={ () => handleEvidenceSelection(category.evidenceCategory, code.code) }
                                                        isSelected={ !!evidenceState[code.code] }
                                                    />
                                                )) }
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </CardContent>
                            <CardFooter className="flex flex-wrap gap-4">
                                { Object.entries(evidenceState)
                                    .filter(([_, data]) => data.lineOfEvidence === category.evidenceCategory)
                                    .map(([code, _]) => (
                                        <EvidenceCard
                                            key={ code }
                                            evidenceCode={ code }
                                            lineOfEvidence={ category.evidenceCategory }
                                            updateEvidence={ (code, score) => updateEvidence(code, score, category.evidenceCategory) }
                                        />
                                    )) }
                            </CardFooter>
                        </Card>
                    </TabsContent>
                )) }
            </Tabs>
        </div>
    );
};

export default EvidenceTabs;