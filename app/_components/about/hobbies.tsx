import Image from 'next/image';

const HobbyComponent = () => {
  return (
    <div
      className="grid gap-8">

      <Image
        src="/assets/images/dch_24_blot.jpeg"
        alt="Hobbies"
        width={ 500 }
        height={ 500 }
        className='mt-0 md:mt-2'
      />

    </div>
  );
};

export default HobbyComponent;
