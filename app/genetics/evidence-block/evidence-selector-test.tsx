'use client'
import React from 'react';
import { EvidenceCategory, EvidenceDirection, EvidencePointScale, EvidenceType, EvidenceWeightOptions } from '../genetic-resources/acmg-criteria-v4';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import category from '@/components/blog/categories/category';
import { Checkbox } from '@/components/ui/checkbox';

interface EvidenceSelectorProps {

}

const EvidenceSelector = () => {
    const handleEvidenceChange = (weight: number, isPathogenic: boolean) => {
        console.log(`Weight: ${weight}, Evidence Direction is: ${isPathogenic}`)
        // Handle the change here (e.g., update state, send to server, etc.)
    }
    const [selectedWeight, setSelectedWeight] = React.useState<EvidencePointScale>(EvidencePointScale.INDETERMINATE)
    const [isPathogenic, setIsPathogenic] = React.useState(true)

    const handleWeightChange = (value: string) => {
        const newWeight = parseInt(value) as EvidencePointScale
        setSelectedWeight(newWeight)
        handleEvidenceChange(isPathogenic ? newWeight : -newWeight, isPathogenic)
    }

    const handleDirectionChange = (checked: boolean) => {
        setIsPathogenic(checked)
        handleEvidenceChange(checked ? selectedWeight : -selectedWeight, checked)
    }


    return (
        <div className="p-4 border rounded-lg w-full max-w-md mx-auto shadow-md bg-background space-y-4">

            <div className="flex items-center space-x-2">
                <Label htmlFor="evidence-weight" className="text-sm font-medium">Evidence Weight:</Label>
                <Select onValueChange={ handleWeightChange } value={ selectedWeight.toString() }>
                    <SelectTrigger id="evidence-weight" className="w-full">
                        <SelectValue placeholder="Select weight" />
                    </SelectTrigger>
                    <SelectContent>
                        { EvidenceWeightOptions.map((option) => (
                            <SelectItem key={ option.value } value={ option.value.toString() }>
                                { option.label }
                            </SelectItem>
                        )) }
                    </SelectContent>
                </Select>
            </div>


            <div className="flex flex-col space-y-2">
                <Label htmlFor="evidence-direction" className="text-sm font-medium">Evidence Direction:</Label>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="evidence-direction"
                            checked={ isPathogenic }
                            onCheckedChange={ handleDirectionChange }
                        />
                        <span className="text-sm">
                            { isPathogenic ? EvidenceDirection.PATHOGENIC : EvidenceDirection.BENIGN }

                        </span>
                    </div>

                </div>
            </div>


            <div className="text-center">
                <span className="text-sm font-medium">Evidence Value:</span>
                <span className={ `text-2xl font-bold ml-2 ${isPathogenic ? 'text-blue-500' : 'text-red-600'}` }>
                    { isPathogenic ? selectedWeight : -selectedWeight }
                </span>
            </div>
        </div>
    );
};

export default EvidenceSelector;
