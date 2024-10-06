import ResumeCard from "@/components/resume/resume-component";
import ResumeNavBar from "@/components/resume/resume-nav-bar";
import { resume_basics } from "@/lib/resources/resume";

export default function ResumeRoute() {
  return (
    <div className="mt-4 flex min-h-screen flex-col items-center py-2">
      <ResumeCard cv={resume_basics} />
      <ResumeNavBar />
    </div>
  );
}
