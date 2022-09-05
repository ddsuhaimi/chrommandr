export const convertShortcutToKeypress = (shortcut: string): string[] => {
  let keys = [];
  let shortCut = shortcut.split('+').map((item) => item.trim().toLowerCase());
  keys = [];
  if (shortCut[0].toLowerCase() === 'ctrl') {
    keys.push('ControlLeft');
  }
  keys.push(`Key${shortCut[1].toUpperCase()}`);
  return keys;
};
