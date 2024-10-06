import ResumeCard from "@/components/resume/resume-component";
import ResumeNavBar from '@/components/resume/resume-nav-bar';
import { resume_basics } from "@/lib/resources/resume";

export default function ResumeRoute () {
  return (
    <div
      className="flex flex-col items-center mt-4 min-h-screen py-2"
    >
      <ResumeCard cv={ resume_basics } />
      <ResumeNavBar />
    </div>
  );
}
