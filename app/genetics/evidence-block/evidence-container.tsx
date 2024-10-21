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
    label: string;
};


const EvidenceContainer = (
    { evidenceCategory }: { evidenceCategory: string },
) => {
    const [selectedCategories, setSelectedCategories] = React.useState<string[]>([]);
    const subcategories = evidenceSubCategories.find((evidence) => evidence.primaryCategory === evidenceCategory)?.categories || [];

    const handleCategorySelection = (category: string) => {
        setSelectedCategories((prevCategories) =>
            prevCategories.includes(category)
                ? prevCategories.filter((c) => c !== category)
                : [...prevCategories, category]
        );
    };

    return (
        <div className="flex h-full flex-col gap-2 space-y-4 rounded-md border border-red-500 p-4">
            <h2
            >
                { evidenceCategory }
            </h2>

            <div className="flex flex-col">
                Analaysis select a category to view the evidence block
                <div
                    className="flex flex-wrap gap-2"
                >
                    {
                        subcategories.map((category) => {
                            return (
                                <Button
                                    key={ category.title }
                                    onClick={ () => handleCategorySelection(category.title) }
                                    variant={ selectedCategories.includes(category.title) ? "default" : "secondary" }
                                    className="flex items-center space-x-2"
                                >
                                    <span>{ category.label }</span>

                                </Button>

                            )
                        }
                        )
                    }





                </div>
                <Separator />
                { selectedCategories.length > 0 && (
                    <>
                        <Separator className="my-4" />
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">Selected Categories:</h3>
                            { selectedCategories.map((categoryTitle) => {
                                const category = subcategories.find((c) => c.title === categoryTitle);
                                return (
                                    <div key={ categoryTitle } className="rounded-md border p-4">
                                        <h4 className="text-md text-red-400 font-semibold mb-2">{ category?.label }</h4>
                                    </div>
                                );
                            }) }
                        </div>
                    </>
                ) }
            </div>
        </div>
    );
};

export default EvidenceContainer;
