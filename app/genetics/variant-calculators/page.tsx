import Link from 'next/link';



export default function CalculatorHome () {

    return (
        <div className="flex min-h-screen flex-col gap-5 py-2">
            <h1>Variant Calculators</h1>
            <p>Choose a calculator to get started</p>
            <div className="flex flex-col gap-2">
                <Link href="/genetics/variant-calculators/variant-allele-frequency">
                    <a className="p-4 bg-gray-100 rounded-md">Variant Allele Frequency</a>
                </Link>
                <Link href="/genetics/variant-calculators/variant-pathogenicity">
                    <a className="p-4 bg-gray-100 rounded-md">Variant Pathogenicity</a>
                </Link>
                <Link href="/genetics/variant-calculators/variant-penetrance">
                    <a className="p-4 bg-gray-100 rounded-md">Variant Penetrance</a>
                </Link>
            </div>
        </div>
    )
}