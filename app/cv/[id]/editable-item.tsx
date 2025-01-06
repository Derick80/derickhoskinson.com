import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { formatDate, formatDateTime } from '@/lib/utils'
import { ExitIcon } from '@radix-ui/react-icons'
import { CircleCheck, CircleX, XIcon } from 'lucide-react'
import React from 'react'

const EditableField = ({
    label,
    value,
    id,
    type,
    onUpdate
}: {
    label: string
    value: string
    id: string
    type: string
    onUpdate: (value: string) => void
}) => {
    const [editing, setEditing] = React.useState(false)
    const [currentValue, setCurrentValue] = React.useState(value)

    const handleUpdate = (

    ) => {
        onUpdate(currentValue)
        setEditing(false)
    }
    const handleDateUpdate = (

    ) => {
        onUpdate(new Date(currentValue).toISOString())
        setEditing(false)
    }


    const handleCancel = () => {
        setCurrentValue(value)
        setEditing(false)
    }
    const inputField = () => {
        return (<div className='flex flex-col  gap-2 relative w-full
                    '>
            <Label htmlFor={ label }>{ label }</Label>
            <Input
                id={ id }
                value={ currentValue }
                onChange={ (e) => setCurrentValue(e.target.value) }
                onBlur={ handleUpdate }
                onKeyDown={ (e) => {
                    if (e.key === 'Enter') handleUpdate()
                    if (e.key === 'Escape') handleCancel()
                } }
            />
            <div
                className='absolute bottom-0 right-0  flex items-center'>
                <Button
                    variant='ghost'
                    onClick={ handleUpdate }
                    title='Cancel'
                >
                    <CircleCheck
                        className='text-green-500'
                    />
                </Button>
                <Button
                    type='button'
                    variant='ghost'
                    onClick={ handleCancel }
                    title='Cancel'
                >
                    <CircleX
                        className='text-red-500'
                    />
                </Button>
            </div>
        </div >)
    }

    const textareaField = () => {
        return (
            <div className='flex flex-col  gap-2 relative w-full
                    '>
                <Label htmlFor={ label }>{ label }</Label>
                <Textarea
                    className='pr-28 w-full flex items-center'
                    id={ id }
                    rows={ 3 }

                    value={ currentValue }
                    onChange={ (e) => setCurrentValue(e.target.value)


                    }
                    onBlur={ handleUpdate }
                    onKeyDown={ (e) =>
                        e.key === 'Enter' && handleUpdate()
                    }
                />
                <div
                    className='absolute bottom-0 top-0 right-0  flex items-center'>
                    <Button
                        variant='ghost'
                        onClick={ handleUpdate }
                        title='save'
                    >
                        <CircleCheck
                            className='text-green-500'
                        />
                    </Button>
                    <Button
                        type='button'
                        variant='ghost'
                        onClick={ handleCancel }
                        title='Cancel'
                    >
                        <CircleX
                            className='text-red-500'
                        />
                    </Button>
                </div>
            </div>
        )
    }
    const dateField = () => {
        console.log('currentValue', currentValue)
        return (
            <div className='flex flex-col  gap-2 relative
                    '>
                <Label htmlFor={ label }>{ label }</Label>
                <Input
                    className='pr-28  flex items-center'
                    id={ id }
                    type='date'
                    value={ formatDateTime(currentValue) }
                    onChange={ (e) => setCurrentValue(
                        e.target.value
                    )


                    }
                    onBlur={ handleDateUpdate }
                    onKeyDown={ (e) =>
                        e.key === 'Enter' && handleDateUpdate()
                    }
                />
                <div
                    className='absolute bottom-0 top-0 right-0  flex items-center'>
                    <Button
                        variant='ghost'
                        onClick={ handleDateUpdate }
                        title='save'
                    >
                        <CircleCheck
                            className='text-green-500'
                        />
                    </Button>
                    <Button
                        type='button'
                        variant='ghost'
                        onClick={ handleCancel }
                        title='Cancel'
                    >
                        <CircleX
                            className='text-red-500'
                        />
                    </Button>
                </div>
            </div>
        )
    }
    return (
        <>
            { editing ? (
                type === 'textarea' && textareaField()
                || type === 'text' && inputField()
                || type === 'date' && dateField()
            ) : (
                <>
                    <Label htmlFor={ label }>{ label }</Label>
                    <p onClick={ () => setEditing(true) }>{ currentValue }</p>
                </>
            ) }
        </>
    )
}

export default EditableField

