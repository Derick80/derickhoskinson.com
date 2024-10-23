/**
 * Represents the main categories of evidence in ACMG criteria.
 */
export const EvidenceCategory = {
    POPULATION_EVIDENCE: 'Population Evidence',
    MOLECULAR_IMPACT_EVIDENCE: 'Molecular Impact Evidence',
    CLINICAL_EVIDENCE: 'Clinical Evidence',
} as const

export type EvidenceCategory = typeof EvidenceCategory[keyof typeof EvidenceCategory]

/**
 * Represents the types of population evidence.
 */
export const PopulationEvidence = {
    POP_FRQ: 'Population Freq.',

} as const

export type PopulationEvidence = typeof PopulationEvidence[keyof typeof PopulationEvidence]

/**
 * Represents the types of molecular impact evidence.
 */
export const MolecularImpactEvidence = {
    IMP_LOF: 'Loss of function variants',
    IMP_NSM: 'Missense variants',
    IMP_SYN: 'Synonymous',
    IMP_INF: 'In-frame delins',
    IMP_SPL: 'Splicing assessment',
    IMP_FXN: 'Variant-specific Funct Assays',
} as const

export type MolecularImpactEvidence = typeof MolecularImpactEvidence[keyof typeof MolecularImpactEvidence]

/**
 * Represents the types of clinical evidence.
 */
export const ClinicalEvidence = {
    CLN_CCR: 'Case:control ratio',
    CLN_COB: 'Case observation counts',
    CLN_LNK: 'Linkage',
    CLN_PHE: 'Specific Phenotype',
    CLN_DNV: 'De novo',
    CLN_CTG: 'Cis and trans genotypes',
} as const

export type ClinicalEvidence = typeof ClinicalEvidence[keyof typeof ClinicalEvidence]

/**
 * Union type representing all possible evidence types.
 */
export type EvidenceType = PopulationEvidence | MolecularImpactEvidence | ClinicalEvidence

/**
 * Represents the strength of evidence in ACMG criteria.
 */
export enum EvidenceStrength {
    INDETERMINATE = 'Indeterminate',
    SUPPORTING = 'Supporting',
    MODERATE = 'Moderate',
    STRONG = 'Strong',
    VERY_STRONG = 'Very Strong',
}

/**
 * Represents the direction of evidence in ACMG criteria.
 */
export enum EvidenceDirection {
    PATHOGENIC = 'Pathogenic',
    BENIGN = 'Benign',
}

/**
 * Represents the numerical scale for evidence points in ACMG criteria.
 */
export enum EvidencePointScale {
    INDETERMINATE = 0,
    SUPPORTING = 1,
    MODERATE = 2,
    STRONG = 4,
    VERY_STRONG = 8,
}

/**
 * Options for evidence weight selection.
 */
export const EvidenceWeightOptions = [
    { label: 'Indeterminate', value: EvidencePointScale.INDETERMINATE },
    { label: 'Supporting', value: EvidencePointScale.SUPPORTING },
    { label: 'Moderate', value: EvidencePointScale.MODERATE },
    { label: 'Strong', value: EvidencePointScale.STRONG },
    { label: 'Very Strong', value: EvidencePointScale.VERY_STRONG },
] as const