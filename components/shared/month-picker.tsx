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

type MonthPickerProps = {
    value: string
    onChange: (value: string) => void
}

function getMonthName(dateString: string) {
    const date = new Date(dateString)

    // Get the month (0-based, so add 1 if you want 1-based)
    const month = date.getUTCMonth() - 1

    const monthNames = [
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
    ]
    //    find the month name from the month  input
    const monthName = monthNames[month]

    return monthName
}
const MonthPicker = ({ value, onChange }: MonthPickerProps) => {
    const [currentValue, setCurrentValue] = React.useState(value)
    console.log(currentValue, 'Month currentValue in month picker')
    return (
        <div className='grid gap-2'>
            <Label htmlFor='Month'>Month</Label>

            <Select
                onValueChange={(value) => {
                    setCurrentValue(value)
                    onChange(value)
                }}
                value={getMonthName(currentValue.toString())}
            >
                <SelectTrigger id='yearmonth'>
                    <SelectValue placeholder='Month' />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value='January'>January</SelectItem>
                    <SelectItem value='February'>February</SelectItem>
                    <SelectItem value='March'>March</SelectItem>
                    <SelectItem value='April'>April</SelectItem>
                    <SelectItem value='May'>May</SelectItem>
                    <SelectItem value='June'>June</SelectItem>
                    <SelectItem value='July'>July</SelectItem>
                    <SelectItem value='August'>August</SelectItem>

                    <SelectItem value='September'>September</SelectItem>
                    <SelectItem value='October'>October</SelectItem>
                    <SelectItem value='November'>November</SelectItem>
                    <SelectItem value='December'>December</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}

export default MonthPicker
