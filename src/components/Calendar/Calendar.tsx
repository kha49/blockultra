const Calendar = () => {
  return (
    <div className='w-[70px] max-w-[70px] min-w-[70px] shadow-[0_0_8.5px_0_rgba(51,55,71,0.15)] rounded-lg overflow-hidden'>
      <div className='bg-primary-500 text-white text-center relative p-1 text-xs font-semibold'>
        <div className='absolute top-[5px] left-[5px] w-[5px] h-[5px] bg-white rounded-full'></div>
        <div className='absolute top-[5px] right-[5px] w-[5px] h-[5px] bg-white rounded-full'></div>
        Apr
      </div>
      <div className='bg-white text-center p-1'>
        <div className='text-3xl font-bold font-jb'>25</div>
        <div className='text-xs font-semibold font-jsb'>2024</div>
      </div>
    </div>
  );
};

export default Calendar;
