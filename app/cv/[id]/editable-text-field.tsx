import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'


type EditableTextFieldProps = {
    initialValue?: string
    onUpdate?: (value: string) => void
    updateInitialValue?: (value: string) => void
    label?: string
}

const EditableTextField = ({
    initialValue = '',
    onUpdate,
    updateInitialValue,
    label
}: EditableTextFieldProps) => {
    const [isEditing, setIsEditing] = React.useState(false)
    const [value, setValue] = React.useState(initialValue)

    const handleUpdate = () => {
        setIsEditing(false)
        if (onUpdate) {
            onUpdate(value)
        }
    }

    const handleCancel = () => {
        setIsEditing(false)
        setValue(initialValue)
    }

    return (
        <div className='flex items-center space-x-2'>
            <Label className='text-sm font-medium'>{ label }</Label>
            { isEditing ? (
                <div className='flex items-center space-x-2'>
                    <Input
                        value={ value }
                        onChange={ (e) => setValue(e.target.value) }
                    />
                    <Button onClick={ handleUpdate }>Save</Button>
                    <Button onClick={ handleCancel }>Cancel</Button>
                </div>
            ) : (
                <div className='flex items-center space-x-2'>
                    <span>{ value }</span>
                    <Button onClick={ () => setIsEditing(true) }>Edit</Button>
                </div>
            ) }
        </div>
    )
}