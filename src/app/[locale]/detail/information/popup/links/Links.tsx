import IconWeb from '@/assets/icons/IconWeb';

const Links = () => {
  return (
    <div className='flex flex-wrap gap-5 w-full md:max-w-[220px]'>
      {...Array.from(Array(20).keys()).map((item) => {
        return <IconWeb key={item} />;
      })}
    </div>
  );
};

export default Links;
