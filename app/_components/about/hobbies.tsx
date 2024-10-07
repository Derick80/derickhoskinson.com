import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { hobbies } from "./about";
import { DotIcon } from "lucide-react";

const HobbyComponent = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hobbies</CardTitle>
        <CardDescription>
          Here are some things that I think are fun!
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        {hobbies.map((hobby, hobbyIndex) => (
          <div className="flex items-center space-x-2" key={hobbyIndex}>
            <HoverCard key={hobbyIndex}>
              <HoverCardTrigger>
                <div className="flex items-center">
                  <DotIcon />
                  <h3>{hobby.hobby}</h3>
                </div>
              </HoverCardTrigger>
              <HoverCardContent>
                <p>{hobby.description}</p>
              </HoverCardContent>
            </HoverCard>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default HobbyComponent;
