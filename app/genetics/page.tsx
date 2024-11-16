import EvidenceTabs from './evidence-block/evidence-tabs'

export default function Page() {
    // get unique primary categories
    return (
        <div id='home' className='flex min-h-screen flex-col gap-2 py-2'>
            <h1>Genetics</h1>
            <p>
                Genetics is the study of genes, genetic variation, and heredity
                in living organisms.
            </p>

            <EvidenceTabs />
        </div>
    )
}
