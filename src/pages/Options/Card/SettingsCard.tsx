import React from 'react';

type Props = {};

const SettingsCard = (props: Props) => {
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

export default SettingsCard;
