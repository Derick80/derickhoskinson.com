"use client";

import { evidenceData } from "../genetic-resources/criteria-testing";
import { EvidenceButton } from "./evidence-button";
import React from "react";
import { Label } from "@/components/ui/label";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import EvidenceCard from "./evidences-card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LinesOfEvidence from "./line-of-evidence-card";
export interface SharedState {
    population: {
        score: number | null;
        evidenceCodes: string[];
    };
    molecular: {
        score: number | null;
        evidenceCodes: string[];
    };
    clinical: {
        score: number | null;
        evidenceCodes: string[];
    };
}
export type EvidenceTabsProps = {
    lineOfEvidence: string;
    sharedEvidence: string[];
};

const EvidenceTabs = () => {
    const [sharedState, setSharedState] = React.useState<SharedState>({
        population: {
            score: null,
            evidenceCodes: [],
        },
        molecular: {
            score: null,
            evidenceCodes: [],
        },
        clinical: {
            score: null,
            evidenceCodes: [],
        },
    });

    const uniquePrimaryCategories = [
        ...new Set(evidenceData.map((item) => item.evidenceCategory)),
    ];
    console.log(uniquePrimaryCategories, "uniquePrimaryCategories");

    // if (!evidence) {
    //     return <div>No evidence found for { lineOfEvidence }</div>;
    // }

    return (
        <Tabs defaultValue="overview" className="w-400">
            <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                { uniquePrimaryCategories.map((category, index) => (
                    <TabsTrigger key={ category } value={ category }>
                        { category }
                    </TabsTrigger>
                )) }
            </TabsList>
            { evidenceData.map((evidence, index) => (
                <TabsContent
                    key={ evidence.evidenceCategory }
                    value={ evidence.evidenceCategory }
                >
                    <LinesOfEvidence
                        setSharedState={ setSharedState }
                        lineOfEvidence={ evidence.evidenceCategory } />
                </TabsContent>
            )) }
            <div>
                { sharedState.population && (
                    <div className="w-full">
                        <Label className="text-gray-800 mb-2 block">Selected Evidence:</Label>
                        <div className="flex flex-wrap gap-2">
                            { sharedState.population.score }
                            { sharedState.molecular.score }
                            { sharedState.clinical.score }
                        </div>
                    </div>
                ) }
            </div>
        </Tabs>
    );
};

export default EvidenceTabs;
