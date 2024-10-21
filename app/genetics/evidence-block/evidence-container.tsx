"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from '@/components/ui/separator';
import React from "react";
import EvidenceBlock from './evidence-block';
import { EvidenceCategory, EvidenceType } from '../genetic-resources/acmg-criteria-v4';

type SubCategory = {
    title: EvidenceType;
    label: string;
}

type EvidenceSubCategory = {
    primaryCategory: EvidenceCategory;
    categories: SubCategory[];
}
export const evidenceSubCategories: EvidenceSubCategory = [
    {
        primaryCategory: EvidenceCategory.MOLECULAR_IMPACT_EVIDENCE,
        categories: [
            {
                title: "IMP_LOF",
                label: "Loss of function variants",
            },
            {
                title: "IMP_NSM",
                label: "Missense variants",
            },
            {
                title: "IMP_SYN",
                label: "Synonymous",
            },
            {
                title: "IMP_INF",
                label: "In-frame delins",
            },
            {
                title: "IMP_SPL",
                label: "Splicing assessment",
            },
            {
                title: "IMP_FXN",
                label: "Variant-specific Funct Assays",
            },
        ],
    },
    {
        primaryCategory: EvidenceCategory.POPULATION_EVIDENCE,
        categories: [
            {
                title: "POP_FRQ",
                label: "Population Frequency",
            },
        ],
    },
    {
        primaryCategory: EvidenceCategory.CLINICAL_EVIDENCE,
        categories: [
            {
                title: "CLN_CCR",
                label: "Case:control ratio",
            },
            {
                title: "CLN_COB",
                label: "Case observation counts",
            },
            {
                title: "CLN_LNK",
                label: "Linkage",
            },
            {
                title: "CLN_PHE",
                label: "Specific Phenotype",
            },
            {
                title: "CLN_DNV",
                label: "De novo",
            },
            {
                title: "CLN_CTG",
                label: "Cis and trans genotypes",
            },
        ],
    },
];



interface EvidenceContainerProps {
    evidenceCategory: EvidenceCategory;
}
const EvidenceContainer = (
    { evidenceCategory }: EvidenceContainerProps
) => {
    const [selectedCategories, setSelectedCategories] = React.useState<EvidenceType[]>([])

    const subcategories = React.useMemo(() =>
        evidenceSubCategories.find((evidence) => evidence.primaryCategory === evidenceCategory)?.categories || [],
        [evidenceCategory]
    )

    const handleCategorySelection = (category: EvidenceType) => {
        setSelectedCategories((prevCategories) =>
            prevCategories.includes(category)
                ? prevCategories.filter((c) => c !== category)
                : [...prevCategories, category]
        )
    }
    return (
        <div className="flex h-full flex-col gap-2 space-y-4 rounded-md border border-primary p-4">
            <h2 className="text-2xl font-bold" id={ `evidence-category-${evidenceCategory}` }>
                { evidenceCategory }
            </h2>

            <div className="flex flex-col">
                <p className="mb-2">Select a category to view the evidence block:</p>
                <div className="flex flex-wrap gap-2" role="group" aria-labelledby={ `evidence-category-${evidenceCategory}` }>
                    { subcategories.map((category) => (
                        <Button
                            key={ category.title }
                            onClick={ () => handleCategorySelection(category.title) }
                            variant={ selectedCategories.includes(category.title) ? "default" : "secondary" }
                            className="flex items-center space-x-2"
                            aria-pressed={ selectedCategories.includes(category.title) }
                        >
                            <span>{ category.label }</span>
                        </Button>
                    )) }
                </div>
                <Separator className="my-4" />
                { selectedCategories.length > 0 && (
                    <>
                        <h3 className="text-lg font-medium mb-2">Selected Evidence Blocks:</h3>
                        <div className="space-y-4">
                            { selectedCategories.map((categoryTitle) => (
                                <EvidenceBlock key={ categoryTitle } evidenceCode={ categoryTitle } />
                            )) }
                        </div>
                    </>
                ) }
            </div>
        </div>
    );
};

export default EvidenceContainer;
