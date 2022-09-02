export async function saveSettings(settings: object): Promise<any> {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.set(
      {
        ...settings,
      },
      () => {
        if (chrome.runtime.lastError) {
          return reject({ success: false, error: chrome.runtime.lastError });
        }
        resolve({ success: true });
      }
    );
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
export async function getSettings() {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(null, (items) => {
      if (chrome.runtime.lastError) {
        return reject(chrome.runtime.lastError);
      }
      resolve(items);
    });
  });
}
