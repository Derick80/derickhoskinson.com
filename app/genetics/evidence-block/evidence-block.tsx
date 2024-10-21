'use client'
import { Slider } from '@/components/ui/slider'
import { Info, CircleX } from 'lucide-react'
import React from 'react'
import { EvidencePointScale } from '../genetic-resources/acmg-criteria-v4'
import { Separator } from '@/components/ui/separator'
import { Label } from '@/components/ui/label'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { SelectPortal } from '@radix-ui/react-select'



const EvidenceBlock = () => {
    const handleEvidenceChange = (value: EvidencePointScale) => {
        console.log('Evidence value changed:', value)
        // Handle the change here
    }
    return (
        <div className='w-full max-w-md mx-auto'>
            <div className='border border-gray-300 rounded-lg shadow-lg p-4 space-y-4'>
                <div className="flex justify-between items-center">
                    <span className="font-semibold">Evidence Block</span>
                    <div>
                        <Info className='inline-block mr-2 cursor-pointer' size={ 14 } />
                        <CircleX className='inline-block cursor-pointer' size={ 14 } />
                    </div>
                </div>
                <Separator />
                <div className='space-y-2'>
                    <div className='flex items-center'>                        <Label htmlFor="evidence-code" className="w-1/3">Evidence Code</Label>
                        <div className="w-2/3">
                            <EvidenceDropDown />
                        </div>
                    </div>
                    <div className='flex items-center'>                        <Label htmlFor="evidence-strength" className="w-1/3">Evidence Strength</Label>
                        <div className="w-2/3">                            <EvidenceStrengthSelect onChange={ handleEvidenceChange } />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



interface EvidenceStrengthSelectProps {
    onChange: (value: EvidencePointScale) => void
    initialValue?: EvidencePointScale
}

const EvidenceStrengthSelect = ({ onChange, initialValue = EvidencePointScale.INDETERMINATE }: EvidenceStrengthSelectProps) => {
    const handleChange = (value: string) => {
        const evidenceValue = Number(value) as EvidencePointScale
        onChange(evidenceValue)
    }

    const getLabel = (value: EvidencePointScale): string => {
        switch (value) {
            case EvidencePointScale.INDETERMINATE: return 'Indeterminate'
            case EvidencePointScale.SUPPORTING: return 'Supporting'
            case EvidencePointScale.MODERATE: return 'Moderate'
            case EvidencePointScale.STRONG: return 'Strong'
            case EvidencePointScale.VERY_STRONG: return 'Very Strong'
            default: return ''
        }
    }

    return (
        <Select onValueChange={ handleChange } defaultValue={ initialValue.toString() }


        >
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Select strength" />
            </SelectTrigger>
            <SelectPortal >
                <SelectContent

                    className='SelectContent'
                >
                    { Object.values(EvidencePointScale).filter(v => !isNaN(Number(v))).map((value) => (
                        <SelectItem key={ value } value={ value.toString() }>
                            { getLabel(value as EvidencePointScale) } ({ value })
                        </SelectItem>
                    )) }
                </SelectContent>
            </SelectPortal>
        </Select>
    )
}

const EvidenceDropDown = () => {
    return (
        <Select>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="IMP_LOF" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="IMP_LOF">IMP_LOF</SelectItem>
                <SelectItem value="IMP_NSM">IMP_NSM</SelectItem>
                <SelectItem value="IMP_SYN">IMP_SYN</SelectItem>
            </SelectContent>
        </Select>
    )
}


export default EvidenceBlock