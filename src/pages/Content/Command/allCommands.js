const allCommands = [
  {
    id: 'settings',
    label: 'Settings',
    action: () => chrome.runtime.sendMessage({ message: 'openSettings' }, (response) => {
      console.log('response from background', response);
    }),
  },
];

export default allCommands;
