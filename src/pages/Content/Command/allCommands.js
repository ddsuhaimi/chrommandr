const allCommands = [
  {
    id: 'openSettings',
    label: 'Open Settings',
    action: () => chrome.runtime.sendMessage({ message: 'openSettings' }, (response) => {
      console.log('response from background', response);
    }),
    is_tab: false,
  },
  {
    id: 'openNewTab',
    label: 'Open New Tab',
    action: () => chrome.runtime.sendMessage({ message: 'openNewTab' }, (response) => {
      console.log('response from background', response);
    }),
    is_tab: false,
  },
  {
    id: 'closeBrowser',
    label: 'Close Browser',
    action: () =>  chrome.runtime.sendMessage({ message: 'closeBrowser' }, (response) => {
      console.log('response from background', response);
    }),
    is_tab: false,
  },
];

export default allCommands;
