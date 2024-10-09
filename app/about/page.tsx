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
import Socials from "../../components/about/socials";
import HobbyComponent from "../../components/about/hobbies";
import Biography from "../../components/about/bio";
import ProfessionalSummary from "../../components/about/professiona-summary";
import ContactForm from "../../components/about/contact-form";

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
            <CardDescription>I&apos;d love to hear from you!</CardDescription>
          </CardHeader>
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
