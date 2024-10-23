"use client";

import { Label } from "@/components/ui/label";
import React from "react";

export type EvidenceState = {
  [evidenceCode: string]: {
    score: number;
    lineOfEvidence: string;
  };
};

export type SharedEvidenceProps = {
  evidenceState: EvidenceState;
};

const SharedEvidence: React.FC<SharedEvidenceProps> = ({ evidenceState }) => {
  const totalScore = Object.values(evidenceState).reduce((acc, curr) => acc + curr.score, 0);

  const scoresByLineOfEvidence = Object.entries(evidenceState).reduce((acc, [code, data]) => {
    if (!acc[data.lineOfEvidence]) {
      acc[data.lineOfEvidence] = 0;
    }
    acc[data.lineOfEvidence] += data.score;
    return acc;
  }, {} as { [key: string]: number });

  return (
    <div className="mx-auto border w-full max-w-4xl space-y-6 p-4 rounded-md">
      <div className='flex flex-row justify-between items-center'>
        <Label className='text-lg font-bold'>Total Score: { totalScore }</Label>
      </div>
      <div className='space-y-2'>
        { Object.entries(scoresByLineOfEvidence).map(([loe, score]) => (
          <div key={ loe } className='flex justify-between'>
            <Label>{ loe }:</Label>
            <span>{ score }</span>
          </div>
        )) }
      </div>
      <div className='space-y-2'>
        <Label className='text-lg font-bold'>Breakdown by Evidence Code:</Label>
        { Object.entries(evidenceState).map(([code, data]) => (
          <div key={ code } className='flex justify-between'>
            <Label>{ code }:</Label>
            <span>{ data.score }</span>
          </div>
        )) }
      </div>
    </div>
  );
};

export default SharedEvidence;