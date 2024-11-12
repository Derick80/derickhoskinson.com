import Biography from "@/components/about/bio";
import AboutImage from "@/components/about/about-image";
import ProfessionalSummary from "@/components/about/professiona-summary";
import Socials from "@/components/about/socials";
import NowReading from "@/components/about/now-reading";
import { Briefcase, Heart, MapPin } from "lucide-react";

import Image from "next/image";
import { aboutMeDetails, hobbies } from "@/components/about/about";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import LandingAbout from "@/components/shared/landing-about";
import ContactForm from '@/components/about/contact-form';

export default function AboutPage () {
  return (
    <div className="container mx-auto space-y-8 px-4 py-8">
      <LandingAbout preview={ false } />
      <ContactForm
      />
    </div>
  );
}
