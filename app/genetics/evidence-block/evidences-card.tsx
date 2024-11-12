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

type EvidenceState = {
  score: number | null;
  evidenceCodes: string[];
};

export type EvidenceCardProps = {
  evidenceCode: string;
  lineOfEvidence: string;
  updateEvidence: (evidenceCode: string, score: number) => void;
};

const EvidenceCard = ({
  evidenceCode,
  lineOfEvidence,
  updateEvidence,
}: EvidenceCardProps) => {
  const [selectedWeight, setSelectedWeight] =
    React.useState<EvidencePointScale>(EvidencePointScale.INDETERMINATE);
  const [isPathogenic, setIsPathogenic] = React.useState(true);

  const calculateScore = (weight: number, pathogenic: boolean) =>
    pathogenic ? weight : -weight;

  const handleWeightChange = (value: string) => {
    const newWeight = parseInt(value) as EvidencePointScale;
    setSelectedWeight(newWeight);
    updateEvidence(evidenceCode, calculateScore(newWeight, isPathogenic));
  };

  const handleDirectionChange = (checked: boolean) => {
    setIsPathogenic(checked);
    updateEvidence(evidenceCode, calculateScore(selectedWeight, checked));
  };

  const score = calculateScore(selectedWeight, isPathogenic);

  return (
    <div className="mx-auto w-full max-w-md space-y-4 rounded-lg border bg-background p-4 shadow-md">
      <h3 className="text-lg font-semibold">{evidenceCode}</h3>
      <div className="flex items-center space-x-2">
        <Label htmlFor="evidence-weight" className="text-sm font-medium">
          Evidence Weight:
        </Label>
        <Select
          onValueChange={handleWeightChange}
          value={selectedWeight.toString()}
        >
          <SelectTrigger id="evidence-weight" className="w-full">
            <SelectValue placeholder="Select weight" />
          </SelectTrigger>
          <SelectContent>
            {EvidenceWeightOptions.map((option) => (
              <SelectItem key={option.value} value={option.value.toString()}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col space-y-2">
        <Label htmlFor="evidence-direction" className="text-sm font-medium">
          Evidence Direction:
        </Label>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="evidence-direction"
            checked={isPathogenic}
            onCheckedChange={handleDirectionChange}
          />
          <span className="text-sm">
            {isPathogenic
              ? EvidenceDirection.PATHOGENIC
              : EvidenceDirection.BENIGN}
          </span>
        </div>
      </div>

      <div className="text-center">
        <span className="text-sm font-medium">Evidence Value:</span>
        <span
          className={`ml-2 text-2xl font-bold ${isPathogenic ? "text-blue-500" : "text-red-600"}`}
        >
          {score}
        </span>
      </div>
    </div>
  );
};

export default EvidenceCard;
