import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import userHelp from '@/lib/resources/user-help';
import { HelpCircle } from 'lucide-react'

type HelpInfoComponentProps = {
    contentId: string;
}

const HelpInfoComponent = (
    { contentId }: HelpInfoComponentProps
) => {

    const content = userHelp.find(item => item.id === contentId);

    if (!content) {
        console.warn(`Help content not found for id: ${contentId}`);
        return null;
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <button
                    className="p-1 rounded-full hover:bg-gray-200 transition-colors duration-200"
                    aria-label={ `Show instructions for ${content.title}` }
                >
                    <HelpCircle size={ 20 } className="text-primary" />
                </button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <div className="space-y-2">
                    <h3 className="font-semibold">{ content.title }</h3>
                    { content.content.map((item, index) => (
                        <p key={ index }>{ item }</p>
                    )) }
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default HelpInfoComponent;