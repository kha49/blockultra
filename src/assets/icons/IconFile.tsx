import React from 'react';

type PropsType = {
  className?: string;
};

const IconFile = (props: PropsType = { className: '' }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='28'
      height='28'
      viewBox='0 0 28 28'
      fill='none'
      {...props}
    >
      <path
        d='M19.4682 6.125H23.625L19.25 1.75V5.90312C19.25 6.0254 19.3478 6.125 19.4682 6.125Z'
        fill='#7BB32E'
      />
      <path
        d='M19.2578 8.52287C18.419 8.52287 17.7365 7.82984 17.7365 6.97796V2.625H6.82363C5.4734 2.625 4.375 3.74056 4.375 5.11189V22.8881C4.375 24.2594 5.4734 25.375 6.82363 25.375H21.1764C22.5267 25.375 23.625 24.2594 23.625 22.8881V8.52287H19.2578ZM17.7577 19.8652H9.30508C8.94264 19.8652 8.64883 19.5668 8.64883 19.1987C8.64883 18.8306 8.94264 18.5322 9.30508 18.5322H17.7577C18.1203 18.5322 18.414 18.8306 18.414 19.1987C18.414 19.5668 18.1203 19.8652 17.7577 19.8652ZM8.64883 16.5327C8.64883 16.1646 8.94264 15.8662 9.30508 15.8662H16.8479C17.2104 15.8662 17.5041 16.1646 17.5041 16.5327C17.5041 16.9008 17.2102 17.1992 16.8479 17.1992H9.30508C8.94264 17.1992 8.64883 16.9008 8.64883 16.5327ZM18.5557 14.5332H9.30508C8.94264 14.5332 8.64883 14.2348 8.64883 13.8667C8.64883 13.4986 8.94264 13.2002 9.30508 13.2002H18.5557C18.9182 13.2002 19.212 13.4986 19.212 13.8667C19.212 14.2348 18.9182 14.5332 18.5557 14.5332Z'
        fill='#7BB32E'
      />
    </svg>
  );
};

export default IconFile;
