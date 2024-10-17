import Image from "next/image";

const HobbyComponent = () => {
  return (
    <div className="grid gap-8">
      <Image
        src={ `https://res.cloudinary.com/dch-photo/image/upload/v1709093876/blog-testing-24/bookskusama.webp` }
        alt="Hobbies"
        width={ 500 }
        height={ 500 }
        className="mt-0 md:mt-2"
      />
    </div>
  );
};

export default HobbyComponent;
