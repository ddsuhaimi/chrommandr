import React from 'react';
import CommandItem from './CommandItem';

const CommandItemContainer = ({ filteredCommands, onActionCompleted, commandRef, filteredCommandLabel }) => {
  return (
    <div>
      <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-full mt-4">
        {filteredCommands.length === 0 && (
          <li>
            <a>No Matching Results</a>
          </li>
        )}
        {filteredCommands.length  > 0 && filteredCommands.map((command) => (

          <CommandItem
            command={command}
            key={command.id}
            onActionCompleted={onActionCompleted}
            commandRef={commandRef}
            commandLabel={filteredCommandLabel}
          />
        ))}
      </ul>
    </div>
  );
};

export default CommandItemContainer;
