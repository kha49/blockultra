'use client';

import Image from 'next/image';
import Allocation from '../allocation';
import './index.scss';
import React, { useState } from 'react';
import { Modal, Popover } from 'antd';
import Link from 'next/link';

const CoinInformation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(true);
  };
  return (
    <div className='w-full mx-auto'>
      <Modal
        title={<div className='text-2xl'>Token Allocation</div>}
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        footer=''
      >
        <div className='popup__contents'>
          <div className='popup__contents-index'>
            <svg
              width='18'
              height='20'
              viewBox='0 0 18 20'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M8 0.57735C8.6188 0.220085 9.3812 0.220085 10 0.57735L16.6603 4.42265C17.2791 4.77992 17.6603 5.44017 17.6603 6.1547V13.8453C17.6603 14.5598 17.2791 15.2201 16.6603 15.5774L10 19.4226C9.3812 19.7799 8.6188 19.7799 8 19.4226L1.33975 15.5774C0.720943 15.2201 0.339746 14.5598 0.339746 13.8453V6.1547C0.339746 5.44017 0.720943 4.77992 1.33975 4.42265L8 0.57735Z'
                fill='#B5E612'
              />
            </svg>
            <div className='index__detail'>Blockchain Services: 60.02%</div>
          </div>
          <div className='popup__contents-index'>
            <svg
              width='18'
              height='20'
              viewBox='0 0 18 20'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M8 0.57735C8.6188 0.220085 9.3812 0.220085 10 0.57735L16.6603 4.42265C17.2791 4.77992 17.6603 5.44017 17.6603 6.1547V13.8453C17.6603 14.5598 17.2791 15.2201 16.6603 15.5774L10 19.4226C9.3812 19.7799 8.6188 19.7799 8 19.4226L1.33975 15.5774C0.720943 15.2201 0.339746 14.5598 0.339746 13.8453V6.1547C0.339746 5.44017 0.720943 4.77992 1.33975 4.42265L8 0.57735Z'
                fill='#00D06C'
              />
            </svg>

            <div className='index__detail'>DeFi: 11.90%</div>
          </div>
          <div className='popup__contents-index'>
            <svg
              width='18'
              height='20'
              viewBox='0 0 18 20'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M8 0.57735C8.6188 0.220085 9.3812 0.220085 10 0.57735L16.6603 4.42265C17.2791 4.77992 17.6603 5.44017 17.6603 6.1547V13.8453C17.6603 14.5598 17.2791 15.2201 16.6603 15.5774L10 19.4226C9.3812 19.7799 8.6188 19.7799 8 19.4226L1.33975 15.5774C0.720943 15.2201 0.339746 14.5598 0.339746 13.8453V6.1547C0.339746 5.44017 0.720943 4.77992 1.33975 4.42265L8 0.57735Z'
                fill='#0A9882'
              />
            </svg>

            <div className='index__detail'>Chain: 7.80%</div>
          </div>
          <div className='popup__contents-index'>
            <svg
              width='18'
              height='20'
              viewBox='0 0 18 20'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M8 0.57735C8.6188 0.220085 9.3812 0.220085 10 0.57735L16.6603 4.42265C17.2791 4.77992 17.6603 5.44017 17.6603 6.1547V13.8453C17.6603 14.5598 17.2791 15.2201 16.6603 15.5774L10 19.4226C9.3812 19.7799 8.6188 19.7799 8 19.4226L1.33975 15.5774C0.720943 15.2201 0.339746 14.5598 0.339746 13.8453V6.1547C0.339746 5.44017 0.720943 4.77992 1.33975 4.42265L8 0.57735Z'
                fill='#05B4C9'
              />
            </svg>

            <div className='index__detail'>NFT: 6.80%</div>
          </div>
          <div className='popup__contents-index'>
            <svg
              width='18'
              height='20'
              viewBox='0 0 18 20'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M8 0.57735C8.6188 0.220085 9.3812 0.220085 10 0.57735L16.6603 4.42265C17.2791 4.77992 17.6603 5.44017 17.6603 6.1547V13.8453C17.6603 14.5598 17.2791 15.2201 16.6603 15.5774L10 19.4226C9.3812 19.7799 8.6188 19.7799 8 19.4226L1.33975 15.5774C0.720943 15.2201 0.339746 14.5598 0.339746 13.8453V6.1547C0.339746 5.44017 0.720943 4.77992 1.33975 4.42265L8 0.57735Z'
                fill='#6699C3'
              />
            </svg>

            <div className='index__detail'>Social: 5.70%</div>
          </div>
          <div className='popup__contents-index'>
            <svg
              width='18'
              height='20'
              viewBox='0 0 18 20'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M8 0.57735C8.6188 0.220085 9.3812 0.220085 10 0.57735L16.6603 4.42265C17.2791 4.77992 17.6603 5.44017 17.6603 6.1547V13.8453C17.6603 14.5598 17.2791 15.2201 16.6603 15.5774L10 19.4226C9.3812 19.7799 8.6188 19.7799 8 19.4226L1.33975 15.5774C0.720943 15.2201 0.339746 14.5598 0.339746 13.8453V6.1547C0.339746 5.44017 0.720943 4.77992 1.33975 4.42265L8 0.57735Z'
                fill='#6847A7'
              />
            </svg>

            <div className='index__detail'>GameFi: 4.45%</div>
          </div>
          <div className='popup__contents-index'>
            <svg
              width='18'
              height='20'
              viewBox='0 0 18 20'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M8 0.57735C8.6188 0.220085 9.3812 0.220085 10 0.57735L16.6603 4.42265C17.2791 4.77992 17.6603 5.44017 17.6603 6.1547V13.8453C17.6603 14.5598 17.2791 15.2201 16.6603 15.5774L10 19.4226C9.3812 19.7799 8.6188 19.7799 8 19.4226L1.33975 15.5774C0.720943 15.2201 0.339746 14.5598 0.339746 13.8453V6.1547C0.339746 5.44017 0.720943 4.77992 1.33975 4.42265L8 0.57735Z'
                fill='#9B42AC'
              />
            </svg>

            <div className='index__detail'>CeFi: 3.33%</div>
          </div>
          <div className='popup__contents-index'>
            <svg
              width='18'
              height='20'
              viewBox='0 0 18 20'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M8 0.57735C8.6188 0.220085 9.3812 0.220085 10 0.57735L16.6603 4.42265C17.2791 4.77992 17.6603 5.44017 17.6603 6.1547V13.8453C17.6603 14.5598 17.2791 15.2201 16.6603 15.5774L10 19.4226C9.3812 19.7799 8.6188 19.7799 8 19.4226L1.33975 15.5774C0.720943 15.2201 0.339746 14.5598 0.339746 13.8453V6.1547C0.339746 5.44017 0.720943 4.77992 1.33975 4.42265L8 0.57735Z'
                fill='#A01865'
              />
            </svg>

            <div className='index__detail'>Currency: 1.80%</div>
          </div>
          <div className='popup__contents-index'>
            <svg
              width='18'
              height='20'
              viewBox='0 0 18 20'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M8 0.57735C8.6188 0.220085 9.3812 0.220085 10 0.57735L16.6603 4.42265C17.2791 4.77992 17.6603 5.44017 17.6603 6.1547V13.8453C17.6603 14.5598 17.2791 15.2201 16.6603 15.5774L10 19.4226C9.3812 19.7799 8.6188 19.7799 8 19.4226L1.33975 15.5774C0.720943 15.2201 0.339746 14.5598 0.339746 13.8453V6.1547C0.339746 5.44017 0.720943 4.77992 1.33975 4.42265L8 0.57735Z'
                fill='#FF5D56'
              />
            </svg>

            <div className='index__detail'>Stablecoin: 0.50%</div>
          </div>
          <div className='popup__contents-index'>
            <svg
              width='18'
              height='20'
              viewBox='0 0 18 20'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M8 0.57735C8.6188 0.220085 9.3812 0.220085 10 0.57735L16.6603 4.42265C17.2791 4.77992 17.6603 5.44017 17.6603 6.1547V13.8453C17.6603 14.5598 17.2791 15.2201 16.6603 15.5774L10 19.4226C9.3812 19.7799 8.6188 19.7799 8 19.4226L1.33975 15.5774C0.720943 15.2201 0.339746 14.5598 0.339746 13.8453V6.1547C0.339746 5.44017 0.720943 4.77992 1.33975 4.42265L8 0.57735Z'
                fill='#FF5D56'
              />
            </svg>

            <div className='index__detail'>Others: 0.20%</div>
          </div>
        </div>
      </Modal>

      <div className='coins bg-white p-6 pb-4'>
        <div className='coins__header flex justify-between'>
          <div className='coins__header-logo flex justify-center items-center'>
            <svg
              width='76'
              height='76'
              viewBox='0 0 76 76'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <g clip-path='url(#clip0_3766_261569)'>
                <path
                  d='M38 76C58.9868 76 76 58.9868 76 38C76 17.0132 58.9868 0 38 0C17.0132 0 0 17.0132 0 38C0 58.9868 17.0132 76 38 76Z'
                  fill='#F3BA2F'
                />
                <path
                  d='M28.7755 34.2095L38 24.985L47.2292 34.2143L52.5967 28.8468L38 14.25L23.408 28.842L28.7755 34.2095ZM14.25 38L19.6175 32.6325L24.985 38L19.6175 43.3675L14.25 38ZM28.7755 41.7905L38 51.015L47.2292 41.7857L52.5967 47.1509L38 61.75L23.408 47.158L23.4009 47.1509L28.7755 41.7905ZM51.015 38L56.3825 32.6325L61.75 38L56.3825 43.3675L51.015 38ZM43.4435 37.9953H43.4483V38L38 43.4483L32.5589 38.0095L32.5494 38L32.5589 37.9929L33.5112 37.0381L33.9744 36.575L38 32.5518L43.4459 37.9976L43.4435 37.9953Z'
                  fill='white'
                />
              </g>
              <defs>
                <clipPath id='clip0_3766_261569'>
                  <rect width='76' height='76' fill='white' />
                </clipPath>
              </defs>
            </svg>
            <div className='ml-4 '>
              <div className='flex items-center mb-3 coins__header-info'>
                <div className='coins__name text-zinc-700 text-2xl font-bold leading-loose'>
                  Binance
                </div>
              </div>
              <div className='flex item-center coins__header-tag'>
                <span className='coins__tag mr-1'>
                  <p className='coins__tag-text px-2 items-center'>Tier 1</p>
                </span>

                <span className='coins__tag mr-2 items-center'>
                  <p className='coins__tag-text px-2'>
                    Year of Foundation: 2017
                  </p>
                </span>
                <span className='coins__tag items-center'>
                  <Popover
                    content={
                      <div className='text-right text-zinc-700 text-xs font-medium leading-tight'>
                        Singapore
                      </div>
                    }
                    trigger='hover'
                  >
                    <svg
                      width='32'
                      height='18'
                      viewBox='0 0 32 18'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path d='M31.9999 0H0V18H31.9999V0Z' fill='white' />
                      <path d='M10.5215 0H0V18H10.5215V0Z' fill='#0363C7' />
                      <path
                        d='M31.9999 0H21.4784V18H31.9999V0Z'
                        fill='#EF2525'
                      />
                    </svg>
                  </Popover>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className='coins__info grid grid-cols-8 mt-1.5'>
          <div className='col-span-8 xl:col-span-5'>
            <div className='coins__body grid grid-cols-2'>
              <div className='coins__left col-span-2 xl:col-span-1'>
                <div className='coins__value'>
                  <div className='items-center'>
                    <p className='text-xs text-gray-400'>Spot Trading Volume</p>
                  </div>
                  <div className='flex items-center mt-1.5'>
                    <span className='price text-4xl font-extrabold mr-4'>
                      $88.13B
                    </span>
                    <span className='price--increase'>+2.83%</span>
                  </div>
                  <div className='mt-2'>
                    <p className='text-sm font-medium'>385,636.41 BTC</p>
                  </div>
                </div>
                <div className='coins__socials mt-8 flex'>
                  <div className='coins__links'>
                    <p className='coins__label'>Links</p>
                    <div className='flex mt-2 gap-4 xl:gap-5 py-[6px]'>
                      <Link href=''>
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
                      </Link>
                      <Link href=''>
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
                      </Link>
                      <Link href=''>
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
                      </Link>
                      <Popover
                        trigger='click'
                        placement='bottom'
                        content={
                          <div className='flex items-center gap-5'>
                            <svg
                              width='28'
                              height='28'
                              viewBox='0 0 28 28'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
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
                            <svg
                              width='28'
                              height='28'
                              viewBox='0 0 28 28'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path
                                d='M1.75 10.15C1.75 7.20972 1.75 5.73959 2.32222 4.61655C2.82555 3.6287 3.6287 2.82555 4.61655 2.32222C5.73959 1.75 7.20972 1.75 10.15 1.75H17.85C20.7903 1.75 22.2604 1.75 23.3835 2.32222C24.3713 2.82555 25.1744 3.6287 25.6778 4.61655C26.25 5.73959 26.25 7.20972 26.25 10.15V17.85C26.25 20.7903 26.25 22.2604 25.6778 23.3835C25.1744 24.3713 24.3713 25.1744 23.3835 25.6778C22.2604 26.25 20.7903 26.25 17.85 26.25H10.15C7.20972 26.25 5.73959 26.25 4.61655 25.6778C3.6287 25.1744 2.82555 24.3713 2.32222 23.3835C1.75 22.2604 1.75 20.7903 1.75 17.85V10.15Z'
                                fill='#7289DA'
                              />
                              <path
                                d='M21.2408 8.77333C19.9163 7.65333 18.3268 7.09333 16.6491 7L16.3842 7.28C17.8853 7.65333 19.2099 8.4 20.4461 9.42667C18.945 8.58667 17.2672 8.02667 15.5011 7.84C14.9713 7.74667 14.5298 7.74667 14 7.74667C13.4702 7.74667 13.0287 7.74667 12.4989 7.84C10.7328 8.02667 9.05505 8.58667 7.5539 9.42667C8.79014 8.4 10.1147 7.65333 11.6158 7.28L11.3509 7C9.67317 7.09333 8.08372 7.65333 6.75917 8.77333C5.25803 11.76 4.4633 15.12 4.375 18.5733C5.69954 20.0667 7.5539 21 9.49656 21C9.49656 21 10.1147 20.2533 10.5562 19.6C9.40826 19.32 8.34862 18.6667 7.6422 17.64C8.26032 18.0133 8.87844 18.3867 9.49656 18.6667C10.2913 19.04 11.086 19.2267 11.8807 19.4133C12.5872 19.5067 13.2936 19.6 14 19.6C14.7064 19.6 15.4128 19.5067 16.1193 19.4133C16.914 19.2267 17.7087 19.04 18.5034 18.6667C19.1216 18.3867 19.7397 18.0133 20.3578 17.64C19.6514 18.6667 18.5917 19.32 17.4438 19.6C17.8853 20.2533 18.5034 21 18.5034 21C20.4461 21 22.3005 20.0667 23.625 18.5733C23.5367 15.12 22.742 11.76 21.2408 8.77333ZM11.086 16.8933C10.203 16.8933 9.40826 16.0533 9.40826 15.0267C9.40826 14 10.203 13.16 11.086 13.16C11.969 13.16 12.7638 14 12.7638 15.0267C12.7638 16.0533 11.969 16.8933 11.086 16.8933ZM16.914 16.8933C16.031 16.8933 15.2362 16.0533 15.2362 15.0267C15.2362 14 16.031 13.16 16.914 13.16C17.797 13.16 18.5917 14 18.5917 15.0267C18.5917 16.0533 17.797 16.8933 16.914 16.8933Z'
                                fill='white'
                              />
                            </svg>
                            <svg
                              width='28'
                              height='28'
                              viewBox='0 0 28 28'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <circle
                                cx='14'
                                cy='14'
                                r='12.25'
                                fill='#1877F2'
                              />
                              <path
                                d='M18.562 17.7464L19.1061 14.2888H15.7021V12.0461C15.7021 11.1 16.1767 10.1772 17.7014 10.1772H19.25V7.23362C19.25 7.23362 17.8452 7 16.5027 7C13.698 7 11.8665 8.65632 11.8665 11.6536V14.2888H8.75V17.7464H11.8665V26.1052C12.4921 26.201 13.1322 26.25 13.7843 26.25C14.4363 26.25 15.0764 26.201 15.7021 26.1052V17.7464H18.562Z'
                                fill='white'
                              />
                            </svg>
                            <svg
                              width='28'
                              height='28'
                              viewBox='0 0 28 28'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <circle
                                cx='14'
                                cy='14'
                                r='12.25'
                                fill='#FF4500'
                              />
                              <path
                                d='M7.62891 17.5L5.63281 20.043V20.3301H10.5547V20.043L8.57227 17.5V10.9375L12.8242 20.3301H13.4258L17.0625 10.9375V18.6484L15.5723 20.043V20.3301H22.0938V20.043L20.6445 18.6484V8.94141L22.0938 7.58789V7.25977H17.5957L14.3145 15.3125L10.6504 7.25977H5.86523V7.58789L7.62891 9.67969V17.5Z'
                                fill='white'
                              />
                            </svg>
                            <svg
                              width='28'
                              height='28'
                              viewBox='0 0 28 28'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path
                                d='M14 1.75C7.23187 1.75 1.75 7.23187 1.75 14C1.75 19.4206 5.25656 23.9991 10.1259 25.6222C10.7384 25.7294 10.9681 25.3619 10.9681 25.0403C10.9681 24.7494 10.9528 23.7847 10.9528 22.7587C7.875 23.3253 7.07875 22.0084 6.83375 21.3194C6.69594 20.9672 6.09875 19.88 5.57812 19.5891C5.14937 19.3594 4.53688 18.7928 5.56281 18.7775C6.5275 18.7622 7.21656 19.6656 7.44625 20.0331C8.54875 21.8859 10.3097 21.3653 11.0141 21.0437C11.1213 20.2475 11.4428 19.7116 11.795 19.4053C9.06938 19.0991 6.22125 18.0425 6.22125 13.3569C6.22125 12.0247 6.69594 10.9222 7.47687 10.0647C7.35437 9.75844 6.92562 8.50281 7.59937 6.81844C7.59937 6.81844 8.62531 6.49687 10.9681 8.07406C11.9481 7.79844 12.9894 7.66062 14.0306 7.66062C15.0719 7.66062 16.1131 7.79844 17.0931 8.07406C19.4359 6.48156 20.4619 6.81844 20.4619 6.81844C21.1356 8.50281 20.7069 9.75844 20.5844 10.0647C21.3653 10.9222 21.84 12.0094 21.84 13.3569C21.84 18.0578 18.9766 19.0991 16.2509 19.4053C16.695 19.7881 17.0778 20.5231 17.0778 21.6716C17.0778 23.31 17.0625 24.6269 17.0625 25.0403C17.0625 25.3619 17.2922 25.7447 17.9047 25.6222C20.3365 24.8012 22.4497 23.2383 23.9468 21.1534C25.4438 19.0685 26.2493 16.5667 26.25 14C26.25 7.23187 20.7681 1.75 14 1.75Z'
                                fill='#171515'
                              />
                            </svg>
                          </div>
                        }
                      >
                        <div className='w-7 h-7 bg-slate-100 rounded-3xl flex-col justify-center items-center gap-2.5 inline-flex'>
                          <div className='text-zinc-700 text-xs font-semibold leading-tight hover:cursor-pointer'>
                            +5
                          </div>
                        </div>
                      </Popover>
                    </div>
                  </div>
                </div>
              </div>
              <div className='coins__right col-span-2 xl:col-span-1'>
                <div className='coins__category w-4/5 flex-wrap flex gap-y-6'>
                  <div className='category'>
                    <div className='coins__title'>Market Share</div>
                    <div className='category__number'>8.16%</div>
                  </div>
                  <div className='category'>
                    <div className='coins__title'>Financial Reserves</div>
                    <div className='category__number'>$61.72B</div>
                  </div>
                  <div className='category'>
                    <div className='coins__title'>Coin</div>
                    <div className='category__number'>363</div>
                  </div>
                  <div className='category'>
                    <div className='coins__title'>Trading Pairs</div>
                    <div className='category__number'>3454</div>
                  </div>
                  <div className='category'>
                    <div className='coins__title'>Native Token</div>
                    <div className='category__link flex'>
                      <Image
                        src='/coin-info/nativetoken.png'
                        alt=''
                        width={20}
                        height={20}
                      />
                      <div className='ml-2 text-zinc-700 text-base font-semibold leading-normal'>
                        BNB
                      </div>
                    </div>
                  </div>
                  <div className='category'>
                    <div className='coins__title'>Fees</div>
                    <div className='category__link flex'>
                      <svg
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M13 11L21.2 2.80005'
                          stroke='#5766FF'
                          stroke-width='2'
                          stroke-linecap='round'
                          stroke-linejoin='round'
                        />
                        <path
                          d='M22 6.8V2H17.2'
                          stroke='#5766FF'
                          stroke-width='2'
                          stroke-linecap='round'
                          stroke-linejoin='round'
                        />
                        <path
                          d='M11 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15V13'
                          stroke='#5766FF'
                          stroke-width='2'
                          stroke-linecap='round'
                          stroke-linejoin='round'
                        />
                      </svg>
                      <Link href='/'>
                        <div className='items-center ml-2 text-zinc-700 text-base font-semibold underline'>
                          Source{' '}
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-span-8 xl:col-span-3 border-l border-gray-200'>
            <div className='ml-6' onClick={toggleModal}>
              <Allocation />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinInformation;
