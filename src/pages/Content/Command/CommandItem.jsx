import React from 'react';
import { ListItem } from '@chakra-ui/react';

const getIndicesOf = (searchStr, str, caseSensitive) => {
  var searchStrLen = searchStr.length;
  if (searchStrLen == 0) {
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
}

const BoldedText = ({ text, shouldBeBold }) => {

  const occurenceIndices = getIndicesOf(shouldBeBold, text[0] === ">" ? text.substring(1) : text);
  const arr = [];
  for (let i = 0; i < text.length; i++) {
    if (occurenceIndices.includes(i)) {
      arr.push(text.substring(i, i + shouldBeBold.length));
      i = i + shouldBeBold.length - 1
    } else {
      arr.push(text[i]);
    }
  }
  // console.log(occurenceIndices, arr);
  return (
    <span>
      {arr.map((item, index) => (
        <span key={Math.random()}>
          {item.toLowerCase() === shouldBeBold.toLowerCase() ? <b>{item}</b> : item}
        </span>
      ))}
    </span>
  )
}
const CommandItem = ({
  command,
  onActionCompleted,
  commandRef,
  commandLabel,
}) => {
  const onClickCommand = () => {
    command.action();
    onActionCompleted();
  };

  // console.log("_> ", command.label, commandLabel);

  return (
    <ListItem
      cursor={'pointer'}
      paddingX={2}
      paddingY={2}
      listStyleType="none"
      bg={command.selected ? '#ccc' : '#fff'}
      _hover={{ bg: '#ccc' }}
      onClick={onClickCommand}
      ref={commandRef}
    >
      <BoldedText text={command.label} shouldBeBold={commandLabel} />
    </ListItem>
  );
};

export default CommandItem;
