import Image from 'next/image';

const Backers = () => {
  return (
    <div className='flex flex-wrap gap-5 w-full md:max-w-[220px]'>
      {...Array.from(Array(20).keys()).map((item) => {
        return (
          <Image
            src='/coin-info/backers-1.png'
            width={28}
            height={28}
            alt='backers-1'
            key={item}
          />
        );
      })}
    </div>
  );
};

export default Backers;
