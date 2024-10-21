"use client"

import React, { useMemo, useCallback } from "react"
import { Slider } from "@/components/ui/slider"
import { Info, CircleX } from "lucide-react"
import { EvidencePointScale, EvidenceType } from "../genetic-resources/acmg-criteria-v4"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select"

interface EvidenceStrengthSelectProps {
    onChange: (value: EvidencePointScale) => void
    initialValue?: EvidencePointScale
}

const EvidenceStrengthSelect: React.FC<EvidenceStrengthSelectProps> = ({ onChange, initialValue = EvidencePointScale.INDETERMINATE }) => {
    const handleChange = useCallback((value: string) => {
        const evidenceValue = Number(value) as EvidencePointScale
        onChange(evidenceValue)
    }, [onChange])

    const getLabel = useCallback((value: EvidencePointScale): string => {
        switch (value) {
            case EvidencePointScale.INDETERMINATE: return 'Indeterminate'
            case EvidencePointScale.SUPPORTING: return 'Supporting'
            case EvidencePointScale.MODERATE: return 'Moderate'
            case EvidencePointScale.STRONG: return 'Strong'
            case EvidencePointScale.VERY_STRONG: return 'Very Strong'
            default: return ''
        }
    }, [])

    return (
        <Select onValueChange={ handleChange } defaultValue={ initialValue.toString() }>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Select strength" />
            </SelectTrigger>
            <SelectContent>
                { Object.values(EvidencePointScale).filter(v => !isNaN(Number(v))).map((value) => (
                    <SelectItem key={ value } value={ value.toString() }>
                        { getLabel(value as EvidencePointScale) } ({ value })
                    </SelectItem>
                )) }
            </SelectContent>
        </Select>
    )
}

interface EvidenceBlockProps {
    evidenceCode?: EvidenceType
}

const EvidenceBlock: React.FC<EvidenceBlockProps> = ({ evidenceCode }) => {
    const [evidenceStrength, setEvidenceStrength] = React.useState<EvidencePointScale>(EvidencePointScale.INDETERMINATE)

    const handleStrengthChange = useCallback((value: EvidencePointScale) => {
        setEvidenceStrength(value)
    }, [])

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="border border-gray-300 rounded-lg shadow-lg p-4 space-y-4">
                <div className="flex justify-between items-center">
                    <span className="font-semibold">
                        { evidenceCode }
                    </span>
                    <div>
                        <Info className="inline-block mr-2 cursor-pointer" size={ 14 } aria-label="More information" />
                        <CircleX className="inline-block cursor-pointer" size={ 14 } aria-label="Close" />
                    </div>
                </div>
                <Separator />
                <div className="space-y-2">
                    <div className="flex items-center">
                        <Label htmlFor="evidence-strength" className="w-1/3">Evidence Strength</Label>
                        <div className="w-2/3">
                            <EvidenceStrengthSelect onChange={ handleStrengthChange } />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EvidenceBlock