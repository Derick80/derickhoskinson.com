import Image from "next/image";

const AboutImage = () => {
  return (
    <div className="grid gap-8">
      <Image
        src="/assets/images/voted24.jpg"
        alt="Image of me"
        width={500}
        height={200}
        className="mt-0 rounded-md md:mt-2"
      />
    </div>
  );
};

export default AboutImage;
