import Image from "next/image";

const HobbyComponent = () => {
  return (
    <div className="grid gap-8">
      <Image
        src={`https://res.cloudinary.com/dch-photo/image/upload/v1731123876/blog_testing_24/voted24_ejx32j.jpg`}
        alt="Hobbies"
        width={500}
        height={200}
        className="mt-0 rounded-md md:mt-2"
      />
    </div>
  );
};

export default HobbyComponent;
