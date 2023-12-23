import {
  IconAddress,
  IconCalendar,
  IconEmployees,
  IconEye,
  IconUser,
} from '@/assets/icons';
import React from 'react';
import './index.scss';

const AboutTab = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-15 items-start'>
      <div>
        <div className='font-bold text-sm text-primary-500 mb-5 md:mb-6'>
          Information
        </div>
        <div>
          <div className='flex items-center justify-between gap-4 mb-6'>
            <div className='flex items-center gap-1'>
              <IconUser />
              <div className='font-bold text-sm text-grey-700'>CEO</div>
            </div>
            <div className='font-bold text-sm text-grey-700'>Thanh Le</div>
          </div>
          <div className='flex items-center justify-between gap-4 mb-6'>
            <div className='flex items-center gap-1'>
              <IconEmployees />
              <div className='font-bold text-sm text-grey-700'>Employees</div>
            </div>
            <div className='font-bold text-sm text-grey-700'>11-50</div>
          </div>
          <div className='flex items-center justify-between gap-4 mb-6'>
            <div className='flex items-center gap-1'>
              <IconAddress />
              <div className='font-bold text-sm text-grey-700'>Address</div>
            </div>
            <div className='font-bold text-sm text-grey-700'>Vietnam</div>
          </div>
          <div className='flex items-center justify-between gap-4 mb-6'>
            <div className='flex items-center gap-1'>
              <IconCalendar />
              <div className='font-bold text-sm text-grey-700'>Founded</div>
            </div>
            <div className='font-bold text-sm text-grey-700'>20/12/2022</div>
          </div>
          <div className='flex items-center justify-between gap-4 mb-6'>
            <div className='flex items-center gap-1'>
              <IconEye />
              <div className='font-bold text-sm text-grey-700'>Views</div>
            </div>
            <div className='font-bold text-sm text-grey-700'>125,415,456</div>
          </div>
        </div>
      </div>
      <div className='about-right-content'>
        <div className='font-bold text-primary-500 mb-6'>Information</div>
        <div className='text-grey-700'>
          {`Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing.`}
        </div>
      </div>
    </div>
  );
};

export default AboutTab;
