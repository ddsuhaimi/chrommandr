import React, { useState, useRef, useEffect } from 'react';
import Hotkeys from 'react-hot-keys';
// import Modal from './Modal';
import {
  Box,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react';
import CommandItemContainer from './CommandItemContainer';
import allCommands from './allCommands';

export default function HotkeysDemo() {
  const [open, setOpen] = React.useState(false);
  const [commandLabel, setCommandLabel] = useState('');
  const [filteredCommands, setFilteredCommands] = useState(allCommands);
  const sh = 'ctrl+alt+p';

  useEffect(() => {
    let currentFilteredCommands = allCommands.filter((command, idx) => {
      if (command.label.toLowerCase().includes(commandLabel.toLowerCase()))
        return true;

      return false;
    });
    currentFilteredCommands = currentFilteredCommands.map((command, idx) =>
      idx === 0
        ? { ...command, selected: true }
        : { ...command, selected: false }
    );
    setFilteredCommands(currentFilteredCommands);
  }, [commandLabel]);

  const onKeyDown = (keyName, e, handle) => {
    // console.log('test:onKeyDown', keyName, e, handle);
    if (keyName === sh) {
      setOpen(true);
    }
  };

  const onChangeCommand = (e) => {
    setCommandLabel(e.target.value);
  };

  const onKeyPressEnter = (e) => {
    if (e.key === 'Enter') {
      filteredCommands[0].action();
      onActionCompleted();
    }
  };

  const onActionCompleted = () => {
    setOpen(false);
    setCommandLabel('');
  };

  return (
    <Hotkeys keyName={sh} onKeyDown={onKeyDown}>
      <Modal
        isOpen={true}
        onClose={() => {
          setOpen((open) => !open);
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalBody p={0}>
            <FormControl>
              <Box p={2}>
                <Input
                  placeholder="Type your command"
                  value={commandLabel}
                  onChange={onChangeCommand}
                  onKeyPress={onKeyPressEnter}
                />
              </Box>
              <CommandItemContainer
                filteredCommands={filteredCommands}
                filteredCommandLabel={commandLabel}
                onActionCompleted={onActionCompleted}
              />
            </FormControl>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Hotkeys>
  );
}
