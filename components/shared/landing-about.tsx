import Biography from "@/components/about/bio";
import AboutImage from "@/components/about/about-image";
import ProfessionalSummary from "@/components/about/professiona-summary";
import Socials from "@/components/about/socials";
import NowReading from "@/components/about/now-reading";
import { aboutMeDetails } from "../about/about";

const LandingAbout = () => {
  return (
    <>
      <div id="Introduction" className="grid gap-8 md:grid-cols-2">
        <div className="flex flex-col justify-between">
          <div>
            <h1>{ aboutMeDetails.fullname }</h1>
            <p className="italic">{ aboutMeDetails.title }</p>
            <p className="mt-4">{ aboutMeDetails.description }</p>
          </div>

          <p>
            I&apos;m a scientist in my forties, living and working in beautiful
            Chicago.
          </p>
          <ul className="list-inside">
            <li className="mt-2">
              <h3>Origin</h3>
              <p>{ aboutMeDetails.origin }</p>
            </li>
            <li className="mt-2">
              <h3>Hobbies</h3>
              <p>{ aboutMeDetails.hobbies }</p>
            </li>
          </ul>
          <Socials />
        </div>

        <AboutImage />
      </div>

      <ProfessionalSummary />
    </>
  );
};

export default LandingAbout;
