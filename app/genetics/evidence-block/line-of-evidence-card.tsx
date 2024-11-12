"use client";

import { evidenceData } from "../genetic-resources/criteria-testing";
import { EvidenceButton } from "./evidence-button";
import React from "react";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import EvidenceCard from "./evidences-card";
import { SharedEvidenceProps } from "./shared-evidence";

export type LinesOfEvidenceProps = {
  lineOfEvidence: string;
  setSharedState: React.Dispatch<React.SetStateAction<SharedEvidenceProps>>;
};

const LinesOfEvidence = ({
  lineOfEvidence,
  setSharedState,
}: LinesOfEvidenceProps) => {
  console.log(lineOfEvidence, "lineOfEvidence");
  const [selectedEvidence, setSelectedEvidence] = React.useState<string[]>([]);
  const evidence = evidenceData.find(
    (item) => item.evidenceCategory === lineOfEvidence,
  );
  console.log(evidence, "evidence");

  const handleEvidenceSelection = (evidenceCode: string) => {
    setSelectedEvidence([...selectedEvidence, evidenceCode]);
  };

  if (!evidence) {
    return <div>No evidence found for {lineOfEvidence}</div>;
  }

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6 p-0">
      <div className="mx-auto w-full max-w-4xl space-y-6 p-0">
        <div className="relative overflow-hidden rounded-lg shadow-lg">
          <div className="absolute inset-0 origin-top-right -skew-x-6 transform bg-gradient-to-br from-blue-500 to-purple-600" />
          <div className="relative z-10 bg-white bg-opacity-90 p-2">
            <h3 className="mb-4">{evidence.evidenceCategory}</h3>
            <p className="text-sm italic leading-4">
              {evidence.evidenceCategoryDescription}
            </p>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="evidence-codes">
                <AccordionTrigger>Evidence Codes</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                    {evidence.evidenceCodes.map((code, codeIndex) => (
                      <div key={codeIndex} className="space-y-2">
                        <EvidenceButton
                          evidenceLabel={code.label}
                          onClick={() => handleEvidenceSelection(code.code)}
                        />
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {selectedEvidence.length > 0 && (
              <div className="mt-6">
                <Label className="mb-2 block text-gray-800">
                  Selected Evidence:
                </Label>
                <div className="flex flex-wrap gap-2">
                  {selectedEvidence.map((code) => (
                    <EvidenceCard
                      updateEvidence={handleEvidenceSelection}
                      key={code}
                      lineOfEvidence={lineOfEvidence}
                      evidenceCode={code}
                      // Add any necessary props for EvidenceCard
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinesOfEvidence;
