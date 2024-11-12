import { aboutMeDetails } from "./about";

const Biography = () => {
  return (
    <div className="space-y-2">
      <div>
        <h1>{aboutMeDetails.fullname}</h1>
        <p>{aboutMeDetails.title}</p>
      </div>
    </div>
  );
};

export default Biography;
