import Socials from "@/components/about/socials";
import { aboutMeDetails, hobbies } from "../about/about";
import { Briefcase, GraduationCap, Heart, MapPin } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import Image from "next/image";
import { Button } from "../ui/button";

const LandingAbout = ({ preview = true }: { preview?: boolean }) => {
  return (
    <>
      <div
        id="Introduction"
        className="flex items-center gap-8 overflow-hidden"
      >
        <div className="flex h-full flex-col justify-between space-y-4 md:justify-normal">
          <div className="space-y-1">
            <h3>{aboutMeDetails.fullname}</h3>
            <p className="text-xl italic text-muted-foreground">
              {aboutMeDetails.title}
            </p>

            <Card>
              <CardContent className="flex pt-6">
                <div className="space-y-1 md:space-y-4">
                  <p className="mb-4 text-lg">{aboutMeDetails.description}</p>
                  <div className="mb-4 flex items-center text-muted-foreground">
                    <MapPin className="mr-2 h-4 w-4" />
                    <span>Chicago, IL</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="mt-auto"
                  >
                    <a href="about">Read more about me</a>
                  </Button>
                </div>
              </CardContent>
              <CardFooter>
                <Socials />
              </CardFooter>
            </Card>
          </div>
        </div>
        <div className="mt-20 hidden items-center md:flex md:flex-col">
          <div className="relative aspect-square overflow-hidden rounded-lg shadow-lg">
            <Image
              src="https://res.cloudinary.com/dch-photo/image/upload/c_crop,ar_3:4/v1731380562/blog_test_photos_23/voted24_lsaf4p.jpg"
              alt={`Photo of ${aboutMeDetails.fullname}`}
              priority
              style={{
                width: "100%",
                height: "auto",
              }}
              width={500}
              height={300}
              className="object-contain transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>
      </div>

      {!preview && (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="mr-2 h-5 w-5" /> Hobbies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{aboutMeDetails.hobbies}</p>
              <div className="space-y-4">
                {hobbies.map((hobby, index) => (
                  <div key={index}>
                    <Badge variant="secondary" className="mb-2">
                      {hobby.hobby}
                    </Badge>
                    <p className="text-sm text-muted-foreground">
                      {hobby.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Briefcase className="mr-2 h-5 w-5" /> Origin
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>{aboutMeDetails.origin}</p>
            </CardContent>
          </Card>

          <div className="col-span-2 space-y-6">
            <h2 className="mb-4 text-2xl font-bold">Professional Summary</h2>
            <div className="flex w-full flex-row gap-4">
              {aboutMeDetails.summary.map((item, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      {index === 0 ? (
                        <Briefcase className="mr-2 h-5 w-5" />
                      ) : (
                        <GraduationCap className="mr-2 h-5 w-5" />
                      )}
                      {item.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {item.duration}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <p>{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default LandingAbout;