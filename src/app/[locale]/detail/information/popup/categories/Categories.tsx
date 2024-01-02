const Categories = () => {
  return (
    <div className='font-jm font-medium w-full md:max-w-[380px]'>
      <div className='text-base text-grey-700 font-bold font-jm pb-4 mb-4 border-b border-grey-300'>
        NanoBit Categories
      </div>
      <div className='mb-6'>
        <div className='mb-3 text-grey-700 text-sm'>Category</div>
        <div className='flex flex-wrap gap-3'>
          {...Array.from(Array(20).keys()).map((item) => {
            return (
              <span
                key={item}
                className='flex items-center px-2 py-0.5 rounded text-xs text-grey-500 font-medium bg-grey-200 whitespace-nowrap cursor-pointer'
              >
                Wallet
              </span>
            );
          })}
        </div>
      </div>
      <div>
        <div className='mb-3 text-grey-700 text-sm'>SubCategory</div>
        <div className='flex flex-wrap gap-3'>
          {...Array.from(Array(20).keys()).map((item) => {
            return (
              <span
                key={item}
                className='flex items-center px-2 py-0.5 rounded text-xs text-grey-500 font-medium bg-grey-200 whitespace-nowrap cursor-pointer'
              >
                Wallet
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Categories;
