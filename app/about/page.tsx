import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Socials from "../_components/about/socials";
import HobbyComponent from "../_components/about/hobbies";
import Biography from "../_components/about/bio";
import ProfessionalSummary from "../_components/about/professiona-summary";




export default function AboutMePage () {
    // helped by v0
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-6">
                    <Biography />
                    <Socials />
                </div>

                <HobbyComponent />
            </div>
            <ProfessionalSummary />
            <div className="mt-12 space-y-6">
                <h2 className="text-2xl font-bold tracking-tighter">Get in Touch</h2>
                <Card>
                    <CardHeader>
                        <CardTitle>Contact Me</CardTitle>
                        <CardDescription>I'd love to hear from you!</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <label
                                        htmlFor="name"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Name
                                    </label>
                                    <Input id="name" placeholder="Enter your name" />
                                </div>
                                <div className="space-y-2">
                                    <label
                                        htmlFor="email"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Email
                                    </label>
                                    <Input
                                        id="email"
                                        placeholder="Enter your email"
                                        type="email"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label
                                    htmlFor="message"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Message
                                </label>
                                <Textarea id="message" placeholder="Enter your message" />
                            </div>
                            <Button className="w-full">Send Message</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
