"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from '@/components/ui/separator';
import React from "react";
import EvidenceBlock from './evidence-block';

export const evidenceSubCategories = [
    {
        primaryCategory: "Molecular Impact Evidence",
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
        primaryCategory: "Population Evidence",
        categories: [
            {
                title: "POP_FRQ",
                label: "Population Frequency",
            },
        ],
    },
    {
        primaryCategory: "Clinical Evidence",
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

type EvidenceCategory = {

    title: string;
};


const EvidenceContainer = (
    { evidenceCategory }: { evidenceCategory: string },
) => {
    const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
    const subcategories = evidenceSubCategories.filter((evidence) => evidence.primaryCategory === evidenceCategory)[0].categories;
    return (
        <div className="flex h-full flex-col gap-2 space-y-4 rounded-md border border-red-500 p-4">
            <h2
            >
                { evidenceCategory }
            </h2>

            <div className="flex flex-col">
                Analaysis select a category to view the evidence block
                <div>
                    {
                        subcategories.map((category) => {
                            return (
                                <Button
                                    key={ category.title }
                                    onClick={ () => setSelectedCategory(category.title) }
                                    variant="secondary"
                                >
                                    { category.label }
                                </Button>

                            )
                        }
                        )
                    }





                </div>
                <Separator />
                {
                    selectedCategory
                }
            </div>
        </div>
    );
};

export default EvidenceContainer;
