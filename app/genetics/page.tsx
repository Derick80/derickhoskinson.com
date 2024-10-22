'use client'
import React from "react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { evidenceData } from './genetic-resources/criteria-testing';
import { Button } from '@/components/ui/button';
import EvidenceCodeList from './evidence-block/evidence-code-list';





const initialState = {
  parentCategory: '',

  export default function GeneticsPage() {
    const [selectedEvidence, setSelectedEvidence] = React.useState()
  const uniqueCategories = evidenceData.map((evidenceCategory) => evidenceCategory.evidenceCategory);


const handleEvidenceCodeClick = (evidenceCode: string) => {
  // find out if the evidence code is in the list of evidence codes
  // if it is, set the selected evidence to the evidence code
  // if not, set the selected evidence to null
  const evidenceCodeExists = evidenceData.some((evidenceCategory) => evidenceCategory.evidenceCodes.some((code) => code.code === evidenceCode));
  if (evidenceCodeExists) {
    const evidence = evidenceData.find((evidenceCategory) => evidenceCategory.evidenceCodes.some((code) => code.code === evidenceCode));
    if (evidence) {
      setSelectedEvidence({
        category: evidence.evidenceCategory,
        code: evidenceCode
      });
    }
  } else {
    setSelectedEvidence(null);
  }

}



return (
  <div id="home" className="flex min-h-screen flex-col space-y-8 py-2">
    {
      uniqueCategories.map((evidenceCategory, idx) => (
        <div
          key={ idx }
          className="flex flex-col space-y-4 border"
        >
          <h2>
            { evidenceCategory }
          </h2>

          <div
            className='flex flex-rwo flex-wrap space-x-4'>
            <EvidenceCodeList

              primaryCategory={ evidenceCategory }
              onChooseEvidenceCode={ handleEvidenceCodeClick }
            />
          </div>
          <div
            className='flex flex-col '>
            <div
              className='font-semibold leading-tight'>
              stuff
            </div>
            {
              selectedEvidence && (
                <div>
                  <Separator />
                  <div>
                    { selectedEvidence.category }
                  </div>
                  <div>
                    { selectedEvidence.code }
                  </div>
                </div>
              )

            }
          </div>
        </div>
      ))

    }


  </div>
)
}
