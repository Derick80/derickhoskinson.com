import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';


export const ContactForm = () => {


    return (
        <Card className="max-w-4xl w-full overflow-hidden shadow-2xl">
            <div className="md:flex">
                <div className="md:flex-1">
                    <CardHeader className="p-4 pb-0">
                        Contact Me
                    </CardHeader>
                    <CardContent className="p-4">

                    </CardContent>
                </div>

            </div>

            <CardFooter className="p-4">
                <div className="flex w-full flex-col justify-between gap-1 md:gap-2">

                </div>
            </CardFooter>
        </Card>
    )

}


export default ContactForm;