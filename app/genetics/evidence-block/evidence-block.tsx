"use client";

import React, { useMemo, useCallback } from "react";
import { Slider } from "@/components/ui/slider";
import { Info, CircleX, ChevronDown, ChevronRight } from "lucide-react";
import {
    EvidencePointScale,
    EvidenceType,
} from "../genetic-resources/acmg-criteria-v4";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import EvidenceCheckBox from './evidence-check-box';
import { Checkbox } from '@/components/ui/checkbox';

interface EvidenceStrengthSelectProps {
    onChange: (value: EvidencePointScale) => void;
    initialValue?: EvidencePointScale;
}

const EvidenceStrengthSelect: React.FC<EvidenceStrengthSelectProps> = ({
    onChange,
    initialValue = EvidencePointScale.INDETERMINATE,
}) => {

    // State to track selected evidence point and pathogenicity
    const [selectedScale, setSelectedScale] = React.useState<EvidencePointScale>(EvidencePointScale.INDETERMINATE);
    const [isPathogenic, setIsPathogenic] = React.useState<boolean>(true);

    // Calculate the displayed value based on pathogenic/benign toggle
    const displayedValue = isPathogenic ? selectedScale : -selectedScale;


    // Function to dynamically change the option label based on pathogenic or benign
    const getLabel = React.useCallback((value: EvidencePointScale) => {
        const label = isPathogenic ? value : -value;
        switch (value) {
            case EvidencePointScale.INDETERMINATE:
                return `Indeterminate (${label})`;
            case EvidencePointScale.SUPPORTING:
                return `Supporting (${label})`;
            case EvidencePointScale.MODERATE:
                return `Moderate (${label})`;
            case EvidencePointScale.STRONG:
                return `Strong (${label})`;
            case EvidencePointScale.VERY_STRONG:
                return `Very Strong (${label})`;
            default:
                return '';
        }
    }, [isPathogenic]);

    return (
        <div className="p-4">
            <div className="flex flex-col space-y-4">
                {/* Select box for picking evidence point */ }
                <Label className="block">
                    <span className="text-gray-700">Select Evidence Point Scale:</span>
                    <Select onValueChange={
                        (value) => {
                            setSelectedScale(Number(value) as EvidencePointScale);
                            onChange(Number(value) as EvidencePointScale);
                        }
                    } defaultValue={ initialValue.toString() }>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select strength" />
                        </SelectTrigger>
                        <SelectContent>
                            { Object.values(EvidencePointScale)
                                .filter((v) => !isNaN(Number(v)))
                                .map((value) => (
                                    <SelectItem key={ value }
                                        value={ value.toString() }

                                    >
                                        {
                                            getLabel(Number(value))

                                        }
                                    </SelectItem>
                                )) }
                        </SelectContent>
                    </Select>
                </Label>

                {/* Checkbox for pathogenic/benign toggle */ }
                <EvidenceCheckBox
                    modifier={ isPathogenic }
                    setModifier={ setIsPathogenic }
                />

                {/* Display the final value */ }
                <div>
                    <p className="text-lg font-semibold">
                        Evidence Score: { displayedValue }
                    </p>
                </div>
            </div>
        </div>
    );
};

interface EvidenceBlockProps {
    evidenceCode?: EvidenceType;
}

const EvidenceBlock: React.FC<EvidenceBlockProps> = ({ evidenceCode }) => {
    const [evidenceStrength, setEvidenceStrength] =
        React.useState<EvidencePointScale>(EvidencePointScale.INDETERMINATE);
    const [isExpanded, setIsExpanded] = React.useState(false);
    const handleStrengthChange = useCallback((value: EvidencePointScale) => {
        setEvidenceStrength(value);
    }, []);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };
    return (
        <div className="mx-auto w-full max-w-4xl">
            <div className="rounded-lg border border-gray-300 shadow-lg bg-card text-card-foreground overflow-hidden">
                <div className="p-4">
                    <div className="flex items-center justify-between">

                        <span className="font-semibold">{ evidenceCode }</span>
                        <div className="flex items-center">
                            <Info
                                className="mr-2 inline-block cursor-pointer"
                                size={ 14 }
                                aria-label="More information"
                            />
                            <CircleX
                                className="inline-block cursor-pointer"
                                size={ 14 }
                                aria-label="Close"
                            />
                            <button
                                onClick={ toggleExpand }
                                className="p-1 rounded-full hover:bg-gray-200 transition-colors duration-200"
                                aria-label={ isExpanded ? "Collapse additional information" : "Expand additional information" }
                            >
                                { isExpanded ? (
                                    <ChevronDown size={ 20 } className="text-primary" />
                                ) : (
                                    <ChevronRight size={ 20 } className="text-primary" />
                                ) }
                            </button>
                        </div>
                    </div>
                    <Separator />
                    <div className="space-y-2">

                        <EvidenceStrengthSelect onChange={ handleStrengthChange }

                        />

                    </div>
                </div>
                { isExpanded && (
                    <div className="p-4 bg-muted">
                        <Separator className="mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Additional Information</h3>
                        <p className="text-muted-foreground">
                            This section contains additional details or actions related to the evidence.
                            You can customize this content based on your specific requirements.
                        </p>
                        <div className="mt-4">
                            <h4 className="text-md font-semibold mb-2">Evidence Details</h4>
                            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                <li>Source: [Evidence Source]</li>
                                <li>Date: [Evidence Date]</li>
                                <li>Confidence Level: [Confidence Level]</li>
                            </ul>
                        </div>
                    </div>
                ) }
            </div>
        </div >
    );
};

export default EvidenceBlock;
