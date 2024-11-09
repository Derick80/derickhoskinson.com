import Biography from "@/components/about/bio";
import HobbyComponent from "@/components/about/hobbies";
import ProfessionalSummary from "@/components/about/professiona-summary";
import Socials from "@/components/about/socials";
import NowReading from "@/components/about/now-reading";

const LandingAbout = () => {
  return (
    <>
      <div id="Introduction" className="grid gap-8 md:grid-cols-2">
        <div className="flex flex-col justify-between">
          <Biography />
          <Socials />
        </div>

        <HobbyComponent />
      </div>
      <NowReading />
      <ProfessionalSummary />
    </>
  );
};

export default LandingAbout;
