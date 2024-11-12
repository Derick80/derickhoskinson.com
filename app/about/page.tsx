import LandingAbout from "@/components/shared/landing";
import ContactForm from "@/components/about/contact-form";

export default function AboutPage() {
  return (
    <div className="container mx-auto space-y-8 px-4 py-8">
      <LandingAbout preview={false} />
      <ContactForm />
    </div>
  );
}
