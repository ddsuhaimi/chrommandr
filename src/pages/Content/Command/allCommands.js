const allCommands = [
  {
    id: 'openSettings',
    label: 'Open Settings',
    action: () => chrome.runtime.sendMessage({ message: 'openSettings' }, (response) => {
      console.log('response from background', response);
    }),
  },
  {
    id: 'openNewTab',
    label: 'Open New Tab',
    action: () => chrome.runtime.sendMessage({ message: 'openNewTab' }, (response) => {
      console.log('response from background', response);
    }),
  },
];

export default allCommands;