import { IconBell, IconCopy, IconSave, IconStar } from '@/assets/icons';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import InformationUnlock from '../information-unlock';
import { Select } from 'antd';
import './style.scss';

const CoinInformation = () => {
  return (
    <div className='container mx-auto'>
      <div className='bg-white p-6 coin'>
        <div className='flex justify-between coin__header'>
          <div className='flex coin__header-logo'>
            <Image
              src='/coin-info/logo.png'
              alt=''
              width={76}
              height={76}
              className='rounded-full mr-4'
            />
            <div>
              <div className='flex items-center mb-3 coin__header-info'>
                <h1 className='coin__name'>
                  Coin98 <span className='coin__tag ml-2'>C98</span>
                  <span className='coin__vertical-line'></span>
                </h1>
                <div className='coin__rating'>
                  <IconStar />
                  <IconStar />
                  <IconStar />
                  <IconStar />
                  <IconStar />
                  <span className='text-primary-500'>5.0</span>
                </div>
                <span className='coin__circle'></span>
                <span className='text-primary-500'>1.2K Ratings</span>
              </div>
              <div className='flex item-center coin__header-tag'>
                <span className='coin__tag mr-2'>#319</span>
                <span className='coin__tag mr-6'>#8 in Wallet</span>
                <span className='coin__tag'>
                  <Image
                    src='/coin-info/accumulating.png'
                    alt=''
                    width={12}
                    height={12}
                    className='mr-2'
                  />
                  Accumulating
                </span>
              </div>
            </div>
          </div>
          <div className='flex item-center coin__header-tag-mb'>
            <span className='coin__tag'>#319</span>
            <span className='coin__tag'>#8 in Wallet</span>
            <span className='coin__tag'>
              <Image
                src='/coin-info/accumulating.png'
                alt=''
                width={12}
                height={12}
                className='mr-2'
              />
              Accumulating
            </span>
          </div>
          <div className='coin__header-category'>
            <div className='flex justify-end gap-4 coin__actions mb-3'>
              <button className='action'>
                <IconSave />
              </button>
              <button className='action'>
                <PencilSquareIcon className='w-5 h-5' />
              </button>
              <button className='action'>
                <IconBell />
              </button>
            </div>
            <div className='flex justify-end gap-2 coin__tags'>
              <span>Categories</span>
              <span className='coin__tag'>Wallet</span>
              <span className='coin__tag'>BNB</span>
              <span className='coin__tag'>Defi</span>
              <span className='coin__tag coin__tag--all'>See All</span>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-6'>
          <div className='col-span-6 xl:col-span-5'>
            <div className='coin__body mt-6 flex'>
              <div className='coin__value'>
                <div className='flex items-center'>
                  <span className='price'>$ 0.0000006269</span>
                  <span className='price--increase'>+2.83%</span>
                </div>
                <div className='flex items-center coin__range'>
                  <span>$0.0000006057</span>
                  <div className='price__range'>
                    <div className='price__range--active'></div>
                  </div>
                  <span>$0.0000006057</span>
                  <Select
                    defaultValue='24'
                    style={{ width: 60 }}
                    options={[
                      { value: '24h', label: '24h' },
                      { value: '7d', label: '7D' },
                      { value: '30d', label: '30D' },
                      { value: '1y', label: '1Y' },
                      { value: 'all', label: 'All' },
                    ]}
                  />
                </div>
                <div className='flex items-center coin__sub-price'>
                  <span className='coin__label'>IDO Price:</span>
                  <span className='sub-price'> $0.075</span>
                  <span className='price-change'>(3.05x)</span>
                </div>
                <div className='flex items-center coin__sub-price'>
                  <span className='coin__label'>Private Price:</span>
                  <span className='sub-price'> $0.025</span>
                  <span className='price-change'>(9.5x)</span>
                </div>
              </div>
              <div className='coin__category'>
                <div className='category'>
                  <div className='coin__title'>Market Cap</div>
                  <div className='category__number'>
                    $1,88B
                    <span className='category__number--increase'>+2.83%</span>
                  </div>
                </div>
                <div className='category'>
                  <div className='coin__title'>Volume 24h</div>
                  <div className='category__number'>
                    $ 1,889 M
                    <span className='category__number--increase'>+2.83%</span>
                  </div>
                </div>
                <div className='category'>
                  <div className='coin__title'>Vol/MCap 24h</div>
                  <div className='category__number'>0.689</div>
                </div>
                <div className='category'>
                  <div className='coin__title'>
                    FDV
                    <svg
                      width='16'
                      height='15'
                      viewBox='0 0 16 15'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M8.93555 10.3636C8.79243 10.377 8.64874 10.3447 8.52509 10.2713C8.43475 10.1786 8.39144 10.0498 8.40738 9.92133C8.41071 9.81436 8.42348 9.70788 8.44555 9.60315C8.46691 9.48301 8.4945 9.36406 8.52827 9.24678L8.90372 7.95496C8.94244 7.82745 8.96804 7.69631 8.98009 7.56358C8.98009 7.42041 8.99918 7.32176 8.99918 7.2645C9.00716 7.0093 8.8982 6.76441 8.70327 6.5995C8.46349 6.41542 8.16489 6.32494 7.86327 6.34496C7.64711 6.34821 7.43263 6.38359 7.22689 6.44996C7.00205 6.51996 6.76552 6.60374 6.51735 6.70133L6.40918 7.12133C6.48235 7.09587 6.57146 7.06724 6.67327 7.03541C6.77039 7.00665 6.87107 6.99164 6.97235 6.99087C7.11443 6.97548 7.25744 7.01037 7.37644 7.0895C7.45727 7.18594 7.49519 7.31123 7.48144 7.43633C7.48108 7.54332 7.46935 7.64999 7.44644 7.7545C7.42415 7.86587 7.39552 7.98359 7.36052 8.10767L6.98189 9.40584C6.95138 9.52651 6.92696 9.64863 6.90872 9.77176C6.89385 9.87717 6.88641 9.98348 6.88644 10.0899C6.88488 10.3469 7.00238 10.5901 7.20461 10.7486C7.44808 10.9355 7.75094 11.0282 8.05732 11.0095C8.27307 11.0139 8.48807 10.9827 8.6937 10.9172C8.874 10.8557 9.11476 10.7676 9.41598 10.6531L9.51781 10.2522C9.43622 10.286 9.35219 10.3137 9.26644 10.3349C9.15799 10.3597 9.04665 10.3693 8.93555 10.3636Z'
                        fill='#9FA4B7'
                      />
                      <path
                        d='M9.33299 4.23862C9.15982 4.07958 8.93167 3.99403 8.69662 3.99999C8.46171 3.99468 8.23377 4.08016 8.06025 4.23862C7.74219 4.51287 7.70667 4.99306 7.98095 5.31115C8.0054 5.3395 8.03189 5.366 8.06025 5.39044C8.42261 5.71455 8.97063 5.71455 9.33296 5.39044C9.65103 5.11348 9.68436 4.63114 9.40739 4.31307C9.38437 4.28658 9.35949 4.26169 9.33299 4.23862Z'
                        fill='#9FA4B7'
                      />
                      <path
                        d='M8 0.5C4.134 0.5 1 3.634 1 7.5C1 11.366 4.134 14.5 8 14.5C11.866 14.5 15 11.366 15 7.5C15 3.634 11.866 0.5 8 0.5ZM8 13.8636C4.48545 13.8636 1.63637 11.0145 1.63637 7.5C1.63637 3.98545 4.48545 1.13637 8 1.13637C11.5145 1.13637 14.3636 3.98545 14.3636 7.5C14.3636 11.0145 11.5145 13.8636 8 13.8636Z'
                        fill='#9FA4B7'
                        stroke='#9FA4B7'
                        strokeWidth='0.5'
                      />
                    </svg>
                  </div>
                  <div className='category__number'>$ 1,88 T</div>
                </div>
                <div className='category'>
                  <div className='coin__title'>Circ.Supply</div>
                  <div className='category__number'>
                    1,515K
                    <span className='category__number--code'>C98</span>
                    <small>(69.96%)</small>
                  </div>
                </div>
                <div className='category'>
                  <div className='coin__title'>Total Supply</div>
                  <div className='category__number'>
                    1,889B <span className='category__number--code'>C98</span>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex items-center coin__social'>
              <div className='coin__contract'>
                <span className='coin__label mb-1'>Contracts</span>
                <div className='flex items-center gap-4 px-3 py-2 contract'>
                  <svg
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <g clipPath='url(#clip0_168_80176)'>
                      <path
                        d='M19.2016 10.3564L12.7349 13.7549C12.5935 13.8292 12.4238 13.7266 12.4238 13.567V0.212721C12.4238 0.00358117 12.6944 -0.0795229 12.8118 0.0935841L19.3555 9.74241C19.4966 9.94959 19.4277 10.2378 19.2016 10.3564Z'
                        fill='#08B5FF'
                      />
                      <path
                        d='M11.8024 16.6917L4.79743 13.0104C4.58988 12.9013 4.51007 12.6447 4.61912 12.4371C4.72828 12.2296 4.98497 12.1498 5.19247 12.2588L11.9999 15.8363L18.8073 12.2588C19.0148 12.1497 19.2716 12.2296 19.3807 12.4371C19.4897 12.6447 19.4099 12.9013 19.2024 13.0104L12.1974 16.6917C12.0738 16.7567 11.9261 16.7567 11.8024 16.6917Z'
                        fill='#08B5FF'
                      />
                      <path
                        d='M11.5752 0.212721V13.567C11.5752 13.7266 11.4055 13.8292 11.2642 13.7549L4.79739 10.3564C4.571 10.2376 4.5027 9.94922 4.64349 9.74241L11.1873 0.0935841C11.3047 -0.0795229 11.5752 0.00358117 11.5752 0.212721Z'
                        fill='#08B5FF'
                      />
                      <path
                        d='M19.1831 15.5106L12.8052 23.9155C12.6822 24.0775 12.4238 23.9906 12.4238 23.7872V18.3217C12.4238 18.2432 12.4671 18.1712 12.5363 18.1343L18.6455 14.8791C18.8217 14.7852 19.0387 14.8266 19.1682 14.9783C19.2977 15.1301 19.3035 15.3514 19.1831 15.5106Z'
                        fill='#08B5FF'
                      />
                      <path
                        d='M11.5752 18.3219V23.7874C11.5752 23.9908 11.3168 24.0777 11.1938 23.9157L4.81595 15.5108C4.69549 15.3516 4.70133 15.1304 4.83081 14.9786C4.9603 14.8268 5.17788 14.7854 5.35353 14.8793L11.4627 18.1346C11.5319 18.1715 11.5752 18.2435 11.5752 18.3219Z'
                        fill='#08B5FF'
                      />
                    </g>
                    <defs>
                      <clipPath id='clip0_168_80176'>
                        <rect width='24' height='24' fill='white' />
                      </clipPath>
                    </defs>
                  </svg>
                  <Select
                    defaultValue='ETH'
                    style={{ width: 120 }}
                    options={[
                      { value: 'ETH', label: 'Ethereum' },
                      { value: 'BTC', label: 'Bitcoin' },
                    ]}
                  />
                  <span className='copy-text'>0x2df3...c8h3h5</span>
                  <IconCopy />
                  <Image
                    src='/coin-info/fox.png'
                    width={24}
                    height={24}
                    alt='fox'
                  />
                </div>
              </div>
              <div className='coin__links'>
                <p className='coin__label'>Links</p>
                <div className='flex gap-4 xl:gap-5 py-[6px]'>
                  <svg
                    width='28'
                    height='28'
                    viewBox='0 0 28 28'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <g clipPath='url(#clip0_168_80208)'>
                      <path
                        d='M19.0259 8.09506C18.0412 3.52155 15.9411 0.628113 13.9988 0.628113C12.0565 0.628113 9.95638 3.52155 8.97168 8.09506H19.0259Z'
                        fill='#26C8B2'
                      />
                      <path
                        d='M8.39893 13.6953C8.3987 14.9439 8.48195 16.1912 8.64814 17.4287H19.3501C19.5163 16.1912 19.5996 14.9439 19.5993 13.6953C19.5996 12.4466 19.5163 11.1993 19.3501 9.96179H8.64814C8.48195 11.1993 8.3987 12.4466 8.39893 13.6953Z'
                        fill='#26C8B2'
                      />
                      <path
                        d='M8.97168 19.2955C9.95638 23.869 12.0565 26.7625 13.9988 26.7625C15.9411 26.7625 18.0412 23.869 19.0259 19.2955H8.97168Z'
                        fill='#26C8B2'
                      />
                      <path
                        d='M20.9404 8.09518H26.8206C25.9371 6.08448 24.5947 4.30883 22.901 2.91063C21.2073 1.51244 19.2095 0.530627 17.0679 0.0439453C18.8385 1.60174 20.2273 4.48211 20.9404 8.09518Z'
                        fill='#26C8B2'
                      />
                      <path
                        d='M27.4918 9.96179H21.2382C21.3922 11.2003 21.4692 12.4472 21.4688 13.6953C21.4689 14.9433 21.3916 16.1902 21.2373 17.4287H27.4909C28.1715 14.9863 28.1725 12.4042 27.4918 9.96179Z'
                        fill='#26C8B2'
                      />
                      <path
                        d='M17.0679 27.3468C19.2099 26.8603 21.208 25.8787 22.902 24.4804C24.5961 23.0822 25.9388 21.3064 26.8225 19.2955H20.9423C20.2273 22.9086 18.8385 25.789 17.0679 27.3468Z'
                        fill='#26C8B2'
                      />
                      <path
                        d='M7.05747 19.2955H1.17725C2.06095 21.3064 3.40368 23.0822 5.0977 24.4804C6.79173 25.8787 8.78989 26.8603 10.9319 27.3468C9.15941 25.789 7.77056 22.9086 7.05747 19.2955Z'
                        fill='#26C8B2'
                      />
                      <path
                        d='M10.9319 0.0439453C8.78989 0.530363 6.79173 1.51206 5.0977 2.91026C3.40368 4.30847 2.06095 6.08427 1.17725 8.09518H7.05747C7.77243 4.48211 9.16128 1.60174 10.9319 0.0439453Z'
                        fill='#26C8B2'
                      />
                      <path
                        d='M6.5326 13.6953C6.53248 12.4472 6.60978 11.2003 6.76407 9.96179H0.510507C-0.170169 12.4042 -0.170169 14.9863 0.510507 17.4287H6.76407C6.60978 16.1902 6.53248 14.9433 6.5326 13.6953Z'
                        fill='#26C8B2'
                      />
                    </g>
                    <defs>
                      <clipPath id='clip0_168_80208'>
                        <rect width='28' height='28' fill='white' />
                      </clipPath>
                    </defs>
                  </svg>
                  <svg
                    width='28'
                    height='28'
                    viewBox='0 0 28 28'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M8.78825 24.5C5.55325 24.5 2.53769 23.5932 -0.000488281 22.0285C2.1545 22.1629 5.95758 21.8411 8.32309 19.6665C4.76459 19.5091 3.15977 16.8788 2.95045 15.7547C3.25281 15.8671 4.69481 16.002 5.50885 15.6873C1.41541 14.6981 0.787439 11.2359 0.926988 10.1793C1.69451 10.6964 2.99697 10.8762 3.50865 10.8313C-0.305695 8.20096 1.06654 4.24423 1.74102 3.38994C4.47834 7.04485 8.58071 9.09759 13.6559 9.21177C13.5602 8.80729 13.5097 8.38618 13.5097 7.95366C13.5097 4.84963 16.1129 2.33331 19.3242 2.33331C21.0021 2.33331 22.5139 3.02024 23.5752 4.11902C24.6964 3.86581 26.3838 3.27305 27.2087 2.76046C26.7929 4.19927 25.4984 5.39953 24.7154 5.84439C24.709 5.82919 24.7219 5.85953 24.7154 5.84439C25.4032 5.74412 27.2643 5.39941 27.9995 4.91867C27.6359 5.72698 26.2635 7.07094 25.1372 7.82334C25.3468 16.7301 18.276 24.5 8.78825 24.5Z'
                      fill='#1DA1F2'
                    />
                  </svg>
                  <svg
                    width='28'
                    height='28'
                    viewBox='0 0 28 28'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <circle cx='14' cy='14' r='14' fill='#03A8E2' />
                    <path
                      d='M20.9866 8.20879C21.1112 7.40332 20.3454 6.76755 19.6292 7.082L5.36482 13.3448C4.85123 13.5703 4.8888 14.3483 5.42147 14.5179L8.36315 15.4547C8.92458 15.6335 9.53253 15.541 10.0228 15.2023L16.655 10.6203C16.855 10.4821 17.073 10.7665 16.9021 10.9426L12.1281 15.8646C11.665 16.3421 11.7569 17.1512 12.314 17.5005L17.659 20.8523C18.2585 21.2282 19.0297 20.8506 19.1418 20.1261L20.9866 8.20879Z'
                      fill='#F5F7FA'
                    />
                  </svg>
                  <span className='more'>+3</span>
                </div>
              </div>
              <div className='coin__links'>
                <p className='coin__label'>Backers</p>
                <div className='flex gap-4 xl:gap-5 py-[6px]'>
                  <Image
                    src='/coin-info/backers-1.png'
                    width={28}
                    height={28}
                    alt='backers-1'
                  />
                  <Image
                    src='/coin-info/backers-2.png'
                    width={28}
                    height={28}
                    alt='backers-1'
                  />
                  <Image
                    src='/coin-info/backers-3.png'
                    width={28}
                    height={28}
                    alt='backers-1'
                  />

                  <span className='more'>+9</span>
                </div>
              </div>
            </div>
          </div>
          <div className='col-span-6 xl:col-span-1'>
            <InformationUnlock />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinInformation;
