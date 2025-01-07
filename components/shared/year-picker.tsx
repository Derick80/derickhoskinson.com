'use client'
import React from 'react'
import { Label } from '../ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '../ui/select'

type YearPickerProps = {
    value: string
    onChange: (value: string) => void
}

function getYear(dateString: string) {
    const date = new Date(dateString)
    // get the year as a long string
    const year = date.getFullYear()
    console.log(year, 'year')

    return year.toString()
}

const YearPicker = ({ value, onChange }: YearPickerProps) => {
    const currentYear = new Date().getFullYear() // Current year
    console.log(currentYear, 'currentYear')
    const startYear = 1904

    const endYear = 2025

    const inputYear = 2017

    const [currentValue, setCurrentValue] = React.useState(value)
    console.log(currentValue, 'currentValue year')

    return (
        <div className='grid gap-2'>
            <Label htmlFor='year'>Year</Label>
            <Select
                onValueChange={(value) => {
                    setCurrentValue(value)
                    onChange(value)
                }}
                value={getYear(currentValue)}
            >
                <SelectTrigger id='year'>
                    <SelectValue placeholder='Year' />
                </SelectTrigger>
                <SelectContent>
                    {Array.from({ length: endYear - startYear }, (_, i) => {
                        const year = startYear + i
                        return (
                            <SelectItem key={year} value={year.toString()}>
                                {year}
                            </SelectItem>
                        )
                    })}
                </SelectContent>
            </Select>
        </div>
    )
}

export default YearPicker
