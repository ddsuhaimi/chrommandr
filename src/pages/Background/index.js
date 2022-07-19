console.log('This is the background page.');

// Example for listening to tab switching/loading
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete') {
    console.log('Tab finished loading', tabId, tab);
    // do your things
  }
});

console.log('Put the background scripts here...');

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log('Incoming request', request);
  if (request.message === 'openSettings') {
    const settingsUrl = 'chrome://settings';
    chrome.tabs.create({ url: settingsUrl });
    sendResponse({ response: 'response from background' });
  }
  if (request.message === 'printPage') {
    // chrome.tabs.create({ url: chrome.runtime.getURL('print.html') });
    // window.print()
    sendResponse({ response: 'response from background' });
  }
  if (request.message === 'openNewTab') {
    chrome.tabs.create({})
    sendResponse({ response: 'response from background' });
  }
});
