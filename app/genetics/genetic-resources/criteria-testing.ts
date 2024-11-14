interface EvidenceCode {
    code: string
    label: string
    definition: string
}

interface EvidenceCategory {
    evidenceCategory: string
    evidenceCategoryDescription: string
    evidenceCodes: EvidenceCode[]
}

export const evidenceData: EvidenceCategory[] = [
    {
        evidenceCategory: 'Population Evidence',
        evidenceCategoryDescription: `Population evidence is used to assess the frequency of a variant in the general population.`,
        evidenceCodes: [
            {
                code: 'POP_FRQ',
                label: 'Population frequency',
                definition: `Allele frequency of variant under assessment compared to
calculated disease allele frequency (DAF) threshold in the general population`
            }
        ]
    },
    {
        evidenceCategory: 'Molecular Impact Evidence',
        evidenceCategoryDescription: `Molecular impact evidence is used to assess the impact of a variant on the gene or protein.`,
        evidenceCodes: [
            {
                code: 'IMP_LOF',
                label: 'Loss of function variants',
                definition: `Loss of function variants are those that are predicted to
                `
            },
            {
                code: 'IMP_NSM',
                label: 'Missense variants',
                definition: `Missense variants`
            },

            {
                code: 'IMP_SVN',
                label: 'Synonymous variants',
                definition: `Synonymous variants`
            },
            {
                code: 'IMP_INF',
                label: 'Inframe delins',
                definition: `Inframe delins`
            },
            {
                code: 'IMP_SPL',
                label: 'Splice assessment',
                definition: `Splice assessment`
            },
            {
                code: 'IMP_FXN',
                label: 'Variant-specific functional evidence',
                definition: `Variant-specific functional evidence`
            }
        ]
    },
    {
        evidenceCategory: 'Clinical Evidence',
        evidenceCategoryDescription: `Clinical evidence is used to assess the impact of a variant on the phenotype of the individual.`,

        evidenceCodes: [
            {
                code: 'CLN_CCR',
                label: 'Case-control ratio',
                definition: `Case-control ratio`
            },
            {
                code: 'CLN_COB',
                label: 'Case observation counts',
                definition: `Case observation counts`
            },
            {
                code: 'CLN_LNK',
                label: 'Linkage',
                definition: `Linkage`
            },
            {
                code: 'CLN_PHE',
                label: 'specific phenotype',
                definition: `specific phenotype`
            },
            {
                code: 'CLN_DNV',
                label: 'de novo',
                definition: `de novo data`
            },
            {
                code: 'CLN_CTG',
                label: 'Cis and trans genotypes',
                definition: 'Cis and trans genotypes'
            }
        ]
    }
]
