import Biography from "@/app/_components/about/bio";
import HobbyComponent from "@/app/_components/about/hobbies";
import ProfessionalSummary from "@/app/_components/about/professiona-summary";
import Socials from "@/app/_components/about/socials";
import NowReading from '@/app/_components/about/now-reading';

const LandingAbout = () => {
    return (
        <>
            <div
                id='Introduction'
                className="grid gap-8 md:grid-cols-2">
                <div className="space-y-6">
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
