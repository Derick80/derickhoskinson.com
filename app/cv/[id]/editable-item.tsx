import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
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

    const handleCancel = () => {
        setCurrentValue(value)
        setEditing(false)
    }

    return (
        <>
            { editing ? (
                type === 'text' ? (
                    <div className='flex flex-col  gap-2 relative w-full
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
                    </div >
                ) : (
                    <div className='flex flex-col  gap-2 relative w-full
                    '>
                        <Label htmlFor={ label }>{ label }</Label>
                        <Textarea
                            className='pr-28 w-full flex items-center'
                            id={ id }
                            rows={ 3 }

                            value={ currentValue }
                            onChange={ (e) => setCurrentValue(e.target.value) }
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
