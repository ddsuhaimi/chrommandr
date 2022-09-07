import React from 'react';
import CommandItem from './CommandItem';

const CommandItemContainer = ({ filteredCommands, onActionCompleted, commandRef, filteredCommandLabel }) => {
  return (
    <div>
      <ul tabIndex="0" className="w-full p-2 mt-4 shadow dropdown-content menu bg-base-100 rounded-box">
        {filteredCommands.length === 0 && (
          <li>
            <a>No Matching Results</a>
          </li>
        )}
        {filteredCommands.length > 0 &&
          filteredCommands.map((command) => (
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
