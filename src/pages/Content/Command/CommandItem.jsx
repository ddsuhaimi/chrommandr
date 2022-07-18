import React from 'react';
import { ListItem } from '@chakra-ui/react';

const CommandItem = ({ command, onActionCompleted, commandRef }) => {
  const onClickCommand = () => {
    command.action();
    onActionCompleted();
  }
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
      {command.label}
    </ListItem>
  );
};

export default CommandItem;
