export const convertShortcutToKeypress = (shortcut: string): string[] => {
  let keys = [];
  for (const key of shortcut.split('+')) {
    if (key === 'Ctrl') {
      keys.push('ctrl');
    } else if (key === 'Shift') {
      keys.push('shift');
    } else {
      keys.push(key.trim());
    }
  }
  return [keys.join('.')];
};
