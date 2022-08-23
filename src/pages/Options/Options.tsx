import React, { useState } from 'react';
import './Options.css';
import clsx from 'clsx';

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
const SettingsCard = () => {
  return (
    <>
      <h3 className="my-2 text-xl font-bold">Shortcut</h3>
      <label>Browser command activation shortcut:</label>
      <input type="text" placeholder="Type here" className="w-full max-w-xs input input-sm input-bordered" />
      <br />
      <label>Tab command activation shortcut:</label>
      <input type="text" placeholder="Type here" className="w-full max-w-xs input input-sm input-bordered" />
      <div className="divider"></div>

      <h3 className="my-2 text-xl font-bold">Theme</h3>
      <div className="shadow-lg alert">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="flex-shrink-0 w-6 h-6 stroke-info">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>Coming soon.</span>
        </div>
      </div>
    </>
  );
};

const AboutCard = () => {
  return (
    <>
      <p>Thank you for using Chrommandr.</p>
      <p><strong>Chrommandr</strong> is a command palette built right into your browser. It allows you to execute action or move to tab quickly.</p>
      <br />
      <p>For more information, you can visit chrommandr's <a className="link" href="https://github.com/ddsuhaimi/chrommandr">repository</a>.</p>
    </>
  );
};
const HelpCard = () => {
  return (
    <>
      <p>If you have any issues, please submit your question to: <a className="link" href="https://github.com/ddsuhaimi/chrommandr/issues">project issues page</a>.</p>
    </>
  );
};
const Options: React.FC<Props> = ({ title }: Props) => {
  const [activeTab, setActiveTab] = useState('settings');
  const handleClickTabTitle = (key: string) => {
    setActiveTab(key);
  };
  return (
    <div className="p-2">
      {/* <h1 className="my-2 text-2xl font-bold">{title} Page</h1> */}
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
          {activeTab === "settings" && <SettingsCard />}
          {activeTab === "about" && <AboutCard />}
          {activeTab === "help" && <HelpCard />}
        </div>
      </div>
      {/* <div className="shadow-xl card w-96 bg-base-100">
        <figure>
          <img src="https://placeimg.com/400/225/arch" alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Shoes!</h2>

          <div className="justify-end card-actions">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Options;
