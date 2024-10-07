import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { aboutMeDetails } from './about';
import Link from 'next/link';

const ProfessionalSummary = () => {
    return (
        <div className="mt-12 space-y-6">
            <h2 className="text-2xl font-bold tracking-tighter">
                Professional & Educational Summary
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
                {
                    aboutMeDetails.summary.map((summary, index) => (<Card
                        key={ index }
                    >
                        <CardHeader>
                            <CardTitle>
                                { summary.title }
                            </CardTitle>
                            <CardDescription
                                className="flex items-center justify-between"
                            >
                                { summary.duration }
                                <Link
                                    href={ summary.resume }
                                    prefetch
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    View Resume
                                </Link>
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p >
                                { summary.description }
                            </p>
                        </CardContent>
                    </Card>
                    ))
                }

            </div>
        </div>
    );
};

export default ProfessionalSummary;
