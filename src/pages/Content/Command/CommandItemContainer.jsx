import React, { useState, useEffect } from 'react';
import CommandItem from './CommandItem';
import { Box, UnorderedList } from '@chakra-ui/react';


const CommandItemContainer = ({ filteredCommands, onActionCompleted, commandRef, filteredCommandLabel }) => {
  return (
    <Box mt={2}>
      <UnorderedList marginInlineStart={0}>
        {filteredCommands.map((command) => (
          <CommandItem
            command={command}
            key={command.id}
            onActionCompleted={onActionCompleted}
            commandRef={commandRef}
            commandLabel={filteredCommandLabel}
          />
        ))}
      </UnorderedList>
    </Box>
  );
};

export default CommandItemContainer;
