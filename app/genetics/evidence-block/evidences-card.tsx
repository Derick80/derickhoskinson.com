"use client";
import React from "react";
import {
  EvidenceDirection,
  EvidencePointScale,
  EvidenceWeightOptions,
} from "../genetic-resources/acmg-criteria-v4";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { SharedState } from "./evidence-tabs";

export type EvidenceCardProps = {
  lineOfEvidence: string;
  setSharedState: React.Dispatch<React.SetStateAction<SharedState>>;
};

const EvidenceCard = ({ lineOfEvidence, setSharedState }: EvidenceCardProps) => {
  console.log(lineOfEvidence, "lineOfEvidence");

  function calculateLoE (lineOfEvidence: string) {
    // calculate the shorthand for the line of evidence
    let loE = "";
    if (lineOfEvidence === 'Population Evidence') {
      loE = "population";
    } else if (lineOfEvidence === 'Molecular Impact Evidence') {
      loE = "molecular";
    } else if (lineOfEvidence === 'Clinical Evidence') {
      loE = "clinical";
    }
    return loE;
  }

  const [selectedWeight, setSelectedWeight] =
    React.useState<EvidencePointScale>(EvidencePointScale.INDETERMINATE);
  const [isPathogenic, setIsPathogenic] = React.useState(true);
  const [loEScore, setLoEScore] = React.useState(0);

  const calculateLoEScore = (weight: number, isPathogenic: boolean) => {
    const score = isPathogenic ? weight : -weight;
    setLoEScore(score);
  };

  const handleWeightChange = (value: string) => {
    console.log(calculateLoE(lineOfEvidence), "lineOfEvidence");
    const newWeight = parseInt(value) as EvidencePointScale;
    setSelectedWeight(newWeight);
    calculateLoEScore(newWeight, isPathogenic);
    setSharedState((prevState) => ({
      ...prevState,
      [calculateLoE(lineOfEvidence)]: {
        score: newWeight,
        evidenceCodes: [],
      },
    }));

  };

  const handleDirectionChange = (checked: boolean) => {

    setIsPathogenic(checked);
    calculateLoEScore(selectedWeight, checked);
    setSharedState((prevState) => ({
      ...prevState,
      [calculateLoE(lineOfEvidence)]: {
        score: ((selectedWeight as number) * (checked ? 1 : -1)),
        evidenceCodes: [],
      },
    }));

  };

  return (
    <div className="mx-auto w-full max-w-md space-y-4 rounded-lg border bg-background p-4 shadow-md">
      <div className="flex items-center space-x-2">
        <Label htmlFor="evidence-weight" className="text-sm font-medium">
          Evidence Weight:
        </Label>
        <Select
          onValueChange={ handleWeightChange }
          value={ selectedWeight.toString() }
        >
          <SelectTrigger id="evidence-weight" className="w-full">
            <SelectValue placeholder="Select weight" />
          </SelectTrigger>
          <SelectContent>
            { EvidenceWeightOptions.map((option) => (
              <SelectItem key={ option.value } value={ option.value.toString() }>
                { option.label }
              </SelectItem>
            )) }
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col space-y-2">
        <Label htmlFor="evidence-direction" className="text-sm font-medium">
          Evidence Direction:
        </Label>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="evidence-direction"
              checked={ isPathogenic }
              onCheckedChange={ handleDirectionChange }
            />
            <span className="text-sm">
              { isPathogenic
                ? EvidenceDirection.PATHOGENIC
                : EvidenceDirection.BENIGN }
            </span>
          </div>
        </div>
      </div>

      <div className="text-center">
        <span className="text-sm font-medium">Evidence Value:</span>
        <span
          className={ `text - 2xl font - bold ml - 2 ${isPathogenic ? "text-blue-500" : "text-red-600"} ` }
        >
          { loEScore }
        </span>
      </div>
    </div>
  );
};

export default EvidenceCard;
