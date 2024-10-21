import React from "react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import EvidenceContainer from "./evidence-block/evidence-container";
import { EvidenceCategory } from './genetic-resources/acmg-criteria-v4';
export default async function GeneticsPage () {
  // get the inddivudal evidence type categories
  const evidenceTypes = Object.values(EvidenceCategory);
  return (
    <div id="home" className="flex min-h-screen flex-col space-y-8 py-2">
      <h1>Genetics</h1>
      <div className={ cn("flex flex-col space-y-4") }>

        {
          evidenceTypes.map((evidenceType) => {
            return (
              <EvidenceContainer
                key={ evidenceType }
                evidenceCategory={ evidenceType }
              />
            )
          }
          )
        }
      </div>
    </div>
  );
}
