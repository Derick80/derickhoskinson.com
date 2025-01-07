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

type WorkPeriodProps = {
    value: string
    onChange: (value: string) => void
}

const WorkPeriod = ({ value, onChange }: WorkPeriodProps) => {
    function getMonth (dateString: string) {
        const date = new Date(dateString)

        const monthName = date.toLocaleString('en-US', { month: 'long' })

        return monthName
    }
    const [currentValue, setCurrentValue] = React.useState(value)

    const [month, setMonth] = React.useState(getMonth(value))
    const [year, setYear] = React.useState(
        new Date(value).getFullYear().toString()
    )

    const currentYear = new Date().getFullYear() // Current year for the year picker

    return (
        <div className='flex w-full justify-between gap-2'>
            <div className='grid gap-2'>
                <Label htmlFor='Month'>Month</Label>

                <Select
                    value={ month }
                    onValueChange={ (value) => {
                        setMonth(value)
                        setCurrentValue(new Date(`${value}-${year}`).toString())
                        onChange(new Date(`${value}-${year}`).toString())
                    } }
                >
                    <SelectTrigger id='yearmonth' className='w-32'>
                        <SelectValue placeholder='Month' />
                    </SelectTrigger>
                    <SelectContent>
                        { [
                            'January',
                            'February',
                            'March',
                            'April',
                            'May',
                            'June',
                            'July',
                            'August',
                            'September',
                            'October',
                            'November',
                            'December'
                        ].map((monthName, index) => (
                            <SelectItem key={ index } value={ monthName }>
                                { monthName }
                            </SelectItem>
                        )) }
                    </SelectContent>
                </Select>
            </div>

            <div className='grid  gap-2'>
                <Label htmlFor='year'>Year</Label>
                <Select

                    onValueChange={ (value) => {
                        setYear(value)
                        new Date(`${month}-${year}`).toString()
                        setCurrentValue(
                            new Date(`${month}-${value}`).toString()
                        )
                        onChange(new Date(`${month}-${value}`).toString())
                    } }
                    name='content'
                    value={ year }
                >
                    <SelectTrigger
                        className='w-32'
                        id='year'>
                        <SelectValue placeholder='Year' />
                    </SelectTrigger>
                    <SelectContent>
                        { Array.from({ length: currentYear - 1904 }, (_, i) => {
                            const year = currentYear - i
                            return (
                                <SelectItem key={ year } value={ year.toString() }>
                                    { year > currentYear ? 'Present' : year }
                                </SelectItem>
                            )
                        }) }
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}

export default WorkPeriod
