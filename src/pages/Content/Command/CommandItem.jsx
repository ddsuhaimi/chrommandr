import React, {useRef, useEffect} from 'react';
import clsx  from 'clsx';


const getIndicesOf = (searchStr, str, caseSensitive) => {
  var searchStrLen = searchStr.length;
  if (searchStrLen === 0) {
    return [];
  }
  var startIndex = 0,
    index,
    indices = [];
  if (!caseSensitive) {
    str = str.toLowerCase();
    searchStr = searchStr.toLowerCase();
  }
  while ((index = str.indexOf(searchStr, startIndex)) > -1) {
    indices.push(index);
    startIndex = index + searchStrLen;
  }
  return indices;
};

const BoldedText = ({ text, shouldBeBold, selected}) => {
  if (shouldBeBold[0] === '>') {
    shouldBeBold = shouldBeBold.substring(1);
  }
  const occurenceIndices = getIndicesOf(shouldBeBold, text[0] === '>' ? text.substring(1) : text);
  const arr = [];
  for (let i = 0; i < text.length; i++) {
    if (occurenceIndices.includes(i)) {
      arr.push(text.substring(i, i + shouldBeBold.length));
      i = i + shouldBeBold.length - 1;
    } else {
      arr.push(text[i]);
    }
  }
  // console.log(occurenceIndices, arr);
  return (
    <div className={clsx('block', selected && "active")}>
      {arr.map((item, index) => (
        <span key={Math.random()}>{item.toLowerCase() === shouldBeBold.toLowerCase() ? <b>{item}</b> : item}</span>
      ))}
    </div>
  );
};
const CommandItem = ({ command, onActionCompleted, commandRef, commandLabel }) => {
  const onClickCommand = () => {
    command.action();
    onActionCompleted();
  };

  // console.log("_> ", command.label, commandLabel);

  return (
    <li
      cursor={'pointer'}
      onClick={onClickCommand}
    >
      <BoldedText text={command.label} shouldBeBold={commandLabel} selected={command.selected} />
    </li>
  );
};

export default CommandItem;
