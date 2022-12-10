import React, { KeyboardEventHandler, useState, useRef, KeyboardEvent } from 'react';


type Props = {
  onChange: (name: string, newShortcut: string) => void;
  value: string;
  name: string;
};

const ShortcutInput = (props: Props) => {
  const ref = useRef(null);
  const [inputValue, setInputValue] = useState('');
  const [isFocus, setIsFocus] = useState(false);

  const handleChangeShortcut: KeyboardEventHandler<HTMLInputElement> = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.repeat) return;
    if (!isFocus) return;

    e.preventDefault();
    if (e.key.toLowerCase() === "control") {
      e.key = "Ctrl"
    }

    setInputValue((input) => (input === '' ? e.key.toString() : input.toString() + '+' + e.key.toString()));
  };

  const handleReleaseShortcut = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!isFocus) return;

    if (document.activeElement instanceof HTMLInputElement) {
      document.activeElement.blur();
    }
    props.onChange(props.name, inputValue);
  };

  const deleteShortcut = (e: any) => {
      props.onChange(props.name, inputValue);
      setInputValue('');
  };

  return (
    <div className="flex w-64">
      <div className="relative w-full">
        <input
          className="block p-2.5 z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-100 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500 box-border w-full max-w-xs input input-sm input-bordered"
          ref={ref}
          value={props.value}
          name="browserShortcut"
          onChange={(e) => {}}
          onKeyDown={handleChangeShortcut}
          onKeyUp={handleReleaseShortcut}
          onFocus={(e) => setIsFocus(true)}
          onBlur={(e) => setIsFocus(false)}
          type="text"
          placeholder="Type here"
        />
        <button className="absolute top-1 right-1 p-0.5 text-xs  rounded-r-lg" onClick={deleteShortcut}>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ShortcutInput;
