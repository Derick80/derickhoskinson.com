"use client";
import { Slider } from "@/components/ui/slider";
import { Info, CircleX } from "lucide-react";
import React from "react";
import { EvidencePointScale, MolecularImpactEvidence, PopulationEvidence } from "../genetic-resources/acmg-criteria-v4";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { SelectPortal } from "@radix-ui/react-select";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { evidenceSubCategories } from './evidence-container';


const EvidenceBlock = ({ title }: {
    title: string
}) => {

    const evidenceblockByTitle = evidenceSubCategories.filter((evidence) => evidence.categories.filter((category) => category.title === title).length > 0)[0];
    console.log(evidenceblockByTitle, 'evidenceblockByTitle');
    return (
        <div
            className="flex flex-col space-y-4">


        </div>
    )

}


export default EvidenceBlock;