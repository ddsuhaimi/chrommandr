import React, { useState, useEffect } from 'react';
import CommandItem from './CommandItem';
import { Box, UnorderedList } from '@chakra-ui/react';


const CommandItemContainer = ({ filteredCommands, onActionCompleted, commandRef }) => {
  return (
    <Box mt={2}>
      <UnorderedList marginInlineStart={0}>
        {filteredCommands.map((command) => (
          <CommandItem
            command={command}
            key={command.id}
            onActionCompleted={onActionCompleted}
            commandRef={commandRef}
          />
        ))}
      </UnorderedList>
    </Box>
  );
};

export default CommandItemContainer;
