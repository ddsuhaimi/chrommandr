import React, { useState, useRef, useEffect } from 'react';
import {useKeys} from 'rooks';
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
  const containerRef = useRef(document);
  const [commandLabel, setCommandLabel] = useState('>');
  const [filteredCommands, setFilteredCommands] = useState(allCommands);

  useEffect(() => {
    let isTabCommand = true
    if (commandLabel.length > 0 ) {
      const firstLetter = commandLabel.charAt(0);
      if (firstLetter === ">") isTabCommand = false;
    }

    let currentFilteredCommands = allCommands;
    // console.log(commandLabel, commandLabel.length, isTabCommand);
    if (isTabCommand) {
      if (commandLabel.length === 0) {
        fillTabCommands();
      } else {
        currentFilteredCommands = filteredCommands.filter((command, idx) => {
          if (command.label.toLowerCase().includes(commandLabel.toLowerCase()))
            return true;
          return false;
        });

        currentFilteredCommands = currentFilteredCommands.map((command, idx) =>
          idx === 0
            ? { ...command, selected: true }
            : { ...command, selected: false }
        );
      }
    } else {
      if (commandLabel.length === 1) {
        currentFilteredCommands = allCommands;
      } else if (commandLabel.length > 1) {
        const realCommand = commandLabel.substring(1);
        currentFilteredCommands = allCommands.filter((command, idx) => {
          if (command.label.toLowerCase().includes(realCommand.toLowerCase()))
            return true;
          return false;
        });

        currentFilteredCommands = currentFilteredCommands.map((command, idx) =>
          idx === 0
            ? { ...command, selected: true }
            : { ...command, selected: false }
        );
      }
    }
    setFilteredCommands(currentFilteredCommands);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commandLabel]);

  const fillTabCommands = () => {
    chrome.runtime.sendMessage({ message: 'getTabs' }, function (response) {
      console.log('response from getTabs', response);
      const tabCommands = response.response.map((tab) => {
        return {
          id: tab.id,
          label: tab.title,
          selected: false,
          is_tab: true,
          action: () => {
            chrome.runtime.sendMessage({ message: 'openTab', tabId: tab.id });
          },
        };
      });
      setFilteredCommands(tabCommands);
    });
  };

  const handleCmdK = async (e) => {
    if (!open) {
      setOpen(true)
    } else {
      setOpen(false)
    }

    // prevent browser from handling CMD/CTRL + K
    e.preventDefault();
  };

  useKeys(["ControlLeft", "KeyK"], handleCmdK, { target: containerRef });
  useKeys(["MetaLeft", "KeyK"], handleCmdK, { target: containerRef });
  
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
    setCommandLabel('>');
  };

  return (
      <Modal
        isOpen={open}
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
  );
}
