import React, { useState } from 'react';
import './content.styles.css';

import CommandPopup from './Command/CommandPopup';

import ReactDOM from 'react-dom';
import { printLine } from './modules/print';
import Modal from '../../components/Modal';
console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

printLine("Using the 'printLine' at pages/Content/index.js");

const app = document.createElement('div');
app.id = 'my-extension-root';
document.body.appendChild(app);
function App() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false)

  const toggleVisible = () => {
    setVisible(!visible)
  }
  return (
    <div>
      <CommandPopup />
    </div>

  );
}
// ReactDOM.render(<App />, app);

// my injected code
// window.addEventListener('load', () => {
//   const injectDiv = document.createElement('div')
//   injectDiv.id = 'extension-host'
//   const shadowRoot = injectDiv.attachShadow({ mode: 'open' })

//   // note inline use of webpack raw-loader, so that the css
//   // file gets inserted as raw text, instead of attached to <head>
//   // as with the webpack style-loader

//   shadowRoot.innerHTML = // just using template string
//     `
//      <div id='shadowReactRoot' />
//      `
//   document.body.appendChild(injectDiv)
//   ReactDOM.render(
//         <App />,
//         // note you have to start your query in the shadow DOM
//         // in order to find your root
//         shadowRoot.querySelector('#shadowReactRoot')
//       )
// })

window.addEventListener('load', () => {
  let extensionRoot = document.getElementById('extension-host');
  if (extensionRoot) {
    // Create the shadow root
    const shadowRoot = extensionRoot.shadowRoot;

    if (shadowRoot) {
      let div = shadowRoot.getElementById('extension');
      if (!div) {
        // Create a div element
        div = document.createElement('div');
        div.setAttribute('id', 'extension');

        // Append div to shadow DOM
        shadowRoot.appendChild(div);
        ReactDOM.render(<App />, div);
      }
    }
  }
});

console.log('content 12!');
console.log('content 13');

// chrome.runtime.sendMessage({ greeting: 'hello from content script' });

// (function () {
//   console.log('execute.js executed');
//   chrome.runtime.sendMessage({ greeting: 'hello' });
// })();
