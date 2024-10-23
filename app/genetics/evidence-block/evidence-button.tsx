"use client";
import { Button } from "@/components/ui/button";

type EvidenceButtonProps = {
  evidenceLabel: string;
  onClick?: () => void;
};
export const EvidenceButton = ({
  evidenceLabel,
  onClick,
}: EvidenceButtonProps) => {
  return (
    <Button
      size="sm"
      aria-label={`Set evidence to ${evidenceLabel}`}
      onClick={onClick}
    >
      {evidenceLabel}
    </Button>
  );
};
