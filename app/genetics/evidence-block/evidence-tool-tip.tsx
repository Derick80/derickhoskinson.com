import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Info } from 'lucide-react'


const EvidenceToolTip = ({
  tooltip,
  children
}: {
  tooltip: string
  children: React.ReactNode
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {
            children
          }
        </TooltipTrigger>
        <TooltipContent>
          {
            tooltip
          }
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}


export default EvidenceToolTip