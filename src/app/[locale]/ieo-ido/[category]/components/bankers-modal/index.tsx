import { Avatar, Flex, Image, Modal } from 'antd';
import React from 'react';
import { IIeoIdoData } from '../../types';
import _ from 'lodash';

type IChildrenCallback = {
  onOpen: () => void;
  onClose: () => void;
  isOpen: boolean;
};

type BankersModalProps = {
  children: (props: IChildrenCallback) => React.ReactNode;
  data: IIeoIdoData['backers'];
};

export default function BankersModal(props: BankersModalProps) {
  const { children, data } = props;
  const [isOpen, setIsOpen] = React.useState(false);
  const showModal = () => {
    setIsOpen(true);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };
  const childrenCallback: IChildrenCallback = {
    onOpen: showModal,
    onClose: handleCancel,
    isOpen,
  };

  return (
    <>
      {children(childrenCallback)}
      <Modal
        title='Backers'
        onCancel={handleCancel}
        centered
        open={isOpen}
        footer={null}
        styles={{
          content: {
            height: 500,
            overflowY: 'auto',
          },
        }}
      >
        <Flex vertical gap={24} className='mt-6'>
          {data.map((item, index) => (
            <Flex align='center' gap={8} key={index}>
              <Avatar src={item.image} alt='avatar' size={32} />
              <span className='text-sm font-normal text-[#333747]'>
                {item.name}
              </span>
            </Flex>
          ))}
        </Flex>
      </Modal>
    </>
  );
}
