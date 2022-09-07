import React, { useState, useEffect } from 'react';
import { useAsyncEffect } from 'rooks';
import Toast from '../../../components/Toast';
import { getSettings, saveSettings } from '../../../service/storage';
type Props = {};
// Saves options to chrome.storage

// document.addEventListener('DOMContentLoaded', restoreOptions);

const SettingsCard = (props: Props) => {
  const [settings, setSettings] = useState<any>({
    browserShortcut: '',
    tabShortcut: '',
  });

  const handleChangeShortcut = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };
  const handleClickSaveSettings = async (e: React.MouseEvent<HTMLButtonElement>) => {
    await saveSettings(settings);
  };

  useEffect(() => {
    // declare the data fetching function
    console.log('call useeffect');
    const getLatestSettings = async () => {
      const data = await getSettings();
      console.log('data', data);
      setSettings(data);
    };

    // call the function
    getLatestSettings()
      // make sure to catch any error
      .catch(console.error);
  }, []);

  return (
    <>
      {JSON.stringify(settings)}
      {/* {JSON.stringify(async () => await restoreOptions())}   */}
      {/* <button
        onClick={async () => {
          const hasil = await restoreOptions();
          console.log('hasil', hasil);
        }}
      >
        get latest
      </button>
      <button
        onClick={() => {
          chrome.storage.local.clear(function () {
            var error = chrome.runtime.lastError;
            if (error) {
              console.error(error);
            }
            // do something more
          });
          chrome.storage.sync.clear(); // callback is optional
        }}
      >
        clear
      </button> */}
      <h3 className="my-2 text-xl font-bold">Shortcut</h3>
      <label>Browser command activation shortcut:</label>
      <input
        value={settings.browserShortcut}
        name="browserShortcut"
        onChange={handleChangeShortcut}
        type="text"
        placeholder="Type here"
        className="w-full max-w-xs input input-sm input-bordered"
      />
      <br />
      <label>Tab command activation shortcut:</label>
      <input
        value={settings.tabShortcut}
        name="tabShortcut"
        onChange={handleChangeShortcut}
        type="text"
        placeholder="Type here"
        className="w-full max-w-xs input input-sm input-bordered"
      />
      <br />
      <span>
        You can get list of possible key combination{' '}
        <a
          target="_blank"
          rel="noreferrer"
          className="link"
          href="https://www.freecodecamp.org/news/javascript-keycode-list-keypress-event-key-codes/"
        >
          here
        </a>{' '}
      </span>
      {/* <input
        value={settings.tabShortcut}
        name="tabShortcut"
        onChange={handleChangeShortcut}
        type="text"
        placeholder="Type here"
        className="w-full max-w-xs input input-sm input-bordered"
      /> */}
      <div className="divider"></div>
      <h3 className="my-2 text-xl font-bold">Theme</h3>
      <div className="shadow-lg alert">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="flex-shrink-0 w-6 h-6 stroke-info">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>Coming soon.</span>
        </div>
      </div>
      <div className="divider"></div>
      <div className="flex items-center justify-end gap-2">
        <button className=" btn btn-primary btn-sm" onClick={handleClickSaveSettings}>
          Save
        </button>
      </div>
    </>
  );
};

export default SettingsCard;
