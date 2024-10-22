import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import HelpInfoComponent from './help-user';

type EvidenceCheckBoxProps = {
    setModifier: (value: boolean) => void;
    modifier: boolean;
}

const EvidenceCheckBox = (
    {
        modifier,
        setModifier
    }: EvidenceCheckBoxProps
) => {

    return (
        <>
            <p>
                Evidence direction
            </p>
            <HelpInfoComponent contentId="evidence-direction" />

            <div
                className="flex items-center">
                <Checkbox id="EvidenceCheckBox"
                    defaultChecked={ modifier }
                    onChange={ () => setModifier(!modifier) }
                />
                <Label
                    htmlFor="EvidenceCheckBox"

                >
                    [P]
                </Label>
            </div>
        </ >
    )
}

export default EvidenceCheckBox;