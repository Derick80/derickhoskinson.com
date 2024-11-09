import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { aboutMeDetails } from "./about";
import Link from "next/link";

const NowReading = () => {
  return (
    <div className="mt-12 space-y-6">
      <h2 className="text-2xl font-bold tracking-tighter">
        What I am reading now
      </h2>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Now reading</CardTitle>
            <CardDescription>
              I am going to hook this up to something like a database or
              goodreads.
            </CardDescription>
          </CardHeader>
          <CardContent>and I will put details of the novel here.</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Have read</CardTitle>
            <CardDescription>
              I am going to hook this up to something like a database or
              goodreads.
            </CardDescription>
          </CardHeader>
          <CardContent>
            and I will put details of the novel here. and after reading maybe I
            will put a review here. and a star rating.
            <Link
              href="https://bookshop.org/a/82157/9780735224049"
              target="_blank"
              rel="noreferrer"
            >
              Buy the book
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NowReading;
