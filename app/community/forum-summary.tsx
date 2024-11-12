import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { getAllForums } from "../actions/forums";

const ForumSummary = async () => {
  const forums = await getAllForums();
  if (!forums) return null;

  return (
    <div className="flex flex-col gap-2 gap-x-4">
      <h2 className="text-2xl font-semibold">Base</h2>
      <p className="text-sm italic text-muted-foreground">
        Select a forum (Base) to view posts in that forum.
      </p>
      {forums.map((forum) => (
        <Card key={forum.id} className="rounded-none">
          <CardHeader className="space-y-0 p-2">
            <CardTitle className="flex justify-between">
              {forum.title}
            </CardTitle>
          </CardHeader>
          <CardDescription className="p-2 italic">
            {forum.description}
          </CardDescription>

          <CardContent className="flex justify-between p-2">
            <div>stuff</div>
            Posts {9}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ForumSummary;
