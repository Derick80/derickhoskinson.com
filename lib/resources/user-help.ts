export interface userHelp {
    id: string
    title: string
    content: string[]
}

const userHelp: userHelp[] = [
    {
        id: 'evidence-direction',
        title: 'Evidence direction',
        content: [
            '1. Select the evidence strength using the dropdown menu.',
            '2. Select an evidence weight from the dropdown menu.',
            '3. Note that the default direcition is pathogenic.',
            '4. Click the expand button to view additional information.'
        ]
    },
    {
        id: 'artificial-intelligence',
        title: 'Artificial Intelligence Statement',
        content: [
            'I use artificial intelligence to suggest code and styling improvments.',
            'Some early posts might contain some AI suggested words and phrases',
            'Eventually I will mark content that was AI generated.'
        ]
    }
]

export default userHelp
