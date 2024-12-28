import { GripVerticalIcon } from 'lucide-react'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import { Duty } from '@/lib/types'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from "@dnd-kit/utilities"

type SortableDutyItemProps = {
    id: string
    value: string
    onChange: (id: string, value: string) => void
    position: number
}

const SortableDutyItem = (
    { id, value, position, onChange }: SortableDutyItemProps
) => {

    const style = {

    }

    return (
        <li
            style={ style }
            className="flex items-start gap-2 group bg-background rounded-lg hover:bg-accent/50 p-2"

        >
            { position }
            <Button
                variant='ghost'

            >
                <GripVerticalIcon className='w-4 h-4' />
            </Button>
            <Textarea

                value={ value }
                onChange={
                    (e) => onChange(id, e.target.value)
                }
                className="min-h-[60px] border-transparent hover:border-input focus:border-input resize-none"

            />
        </li >
    )
}

export default SortableDutyItem