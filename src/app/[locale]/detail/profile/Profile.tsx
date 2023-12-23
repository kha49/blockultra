import React from 'react';
import AboutTab from './tabs/about/About';
import TeamTab from './tabs/team/Team';
import { Tabs } from 'antd';

const Profile = () => {
  const tabs = [
    {
      id: '1',
      disable: false,
      label: 'About',
      component: <AboutTab />,
    },
    {
      id: '2',
      disable: false,
      label: 'Team',
      component: <TeamTab />,
    },
    {
      id: '3',
      disable: false,
      label: 'Advisors',
      component: <TeamTab />,
    },
    {
      id: '4',
      disable: false,
      label: 'Unique Selling Proposition (USP)',
      component: <TeamTab />,
    },
    {
      id: '5',
      disable: false,
      label: 'Partners',
      component: (
        <div className='text-sm font-medium text-grey-700'>
          {`Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum k. It has survived not only five
          centuries, but also the leap into electronic typesetting, remaining
          essentially unchanged. It was popularised in the 1960s with the
          release of Letraset sheets containing Lorem Ipsum passages, and more
          recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum`}
        </div>
      ),
    },
  ];

  return (
    <div className='fade-top bh-white rounded-lg p-2'>
      <Tabs
        defaultActiveKey='1'
        tabPosition={'top'}
        items={tabs?.map((tab) => {
          return {
            label: tab.label,
            key: tab.id,
            disabled: tab.disable,
            children: tab.component,
          };
        })}
      />
    </div>
  );
};

export default Profile;
