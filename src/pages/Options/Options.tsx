import React, { useState } from 'react';
import './Options.css';
import clsx from 'clsx';
import SettingsCard from './Card/SettingsCard';
import AboutCard from './Card/AboutCard';
import HelpCard from './Card/HelpCard';

interface Props {
  title: string;
}
const tabList = [
  {
    label: 'Settings',
    key: 'settings',
  },
  {
    label: 'About',
    key: 'about',
  },
  {
    label: 'Help',
    key: 'help',
  },
];

const Options: React.FC<Props> = ({ title }: Props) => {
  const [activeTab, setActiveTab] = useState('settings');
  const handleClickTabTitle = (key: string) => {
    setActiveTab(key);
  };
  return (
    <div className="p-2">
      <div className="tabs">
        {tabList.map((tab) => (
          <span
            onClick={() => handleClickTabTitle(tab.key)}
            key={tab.key}
            className={clsx('tab tab-bordered', activeTab === tab.key && 'tab-active')}
          >
            {tab.label}
          </span>
        ))}
      </div>
      <div className="w-full card bg-base-100">
        <div className="px-2 card-body">
          {activeTab === 'settings' && <SettingsCard />}
          {activeTab === 'about' && <AboutCard />}
          {activeTab === 'help' && <HelpCard />}
        </div>
      </div>
    </div>
  );
};

export default Options;
