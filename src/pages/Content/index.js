import React from 'react';

import { ChakraProvider } from '@chakra-ui/react';

import ReactDOM from 'react-dom';
import CommandPopup from './Command/CommandPopup';
import { printLine } from './modules/print';

console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

printLine("Using the 'printLine' at pages/Content/index.js");

const app = document.createElement('div');
app.id = 'my-extension-root';
document.body.appendChild(app);
function App() {
  return (
    <ChakraProvider>
      <div>
        <CommandPopup />
      </div>
    </ChakraProvider>
  );
}
ReactDOM.render(<App />, app);

console.log('content 12!');
console.log('content 13');

// chrome.runtime.sendMessage({ greeting: 'hello from content script' });

// (function () {
//   console.log('execute.js executed');
//   chrome.runtime.sendMessage({ greeting: 'hello' });
// })();
