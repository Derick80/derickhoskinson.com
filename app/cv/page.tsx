import ResumeCard from "@/components/resume/resume-component";
import { resume_basics } from "@/lib/resources/resume";

export default function ResumeRoute() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <ResumeCard cv={resume_basics} />
    </div>
  );
}
