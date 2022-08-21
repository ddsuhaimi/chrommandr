import React, { useState, useRef, useEffect } from 'react';
import { useKeys, useDidMount } from 'rooks';
import Modal from '../../../components/Modal';
import CommandItemContainer from './CommandItemContainer';
import allCommands from './allCommands';

export default function CommandPopup() {
  const [open, setOpen] = React.useState(false);
  const containerRef = useRef(document);
  const toggleModalRef = useRef(null);
  const inputRef = useRef(null);
  const [commandLabel, setCommandLabel] = useState('>');
  const [filteredCommands, setFilteredCommands] = useState(allCommands);

  useEffect(() => {
    let isTabCommand = true;
    if (commandLabel.length > 0) {
      const firstLetter = commandLabel.charAt(0);
      if (firstLetter === '>') isTabCommand = false;
    }

    let currentFilteredCommands = allCommands;
    // console.log(commandLabel, commandLabel.length, isTabCommand);
    if (isTabCommand) {
      if (commandLabel.length === 0) {
        fillTabCommands();
      } else {
        currentFilteredCommands = filteredCommands.filter((command, idx) => {
          if (command.label.toLowerCase().includes(commandLabel.trim().toLowerCase())) return true;
          return false;
        });

        currentFilteredCommands = currentFilteredCommands.map((command, idx) =>
          idx === 0 ? { ...command, selected: true } : { ...command, selected: false }
        );
      }
    } else {
      if (commandLabel.length === 1) {
        currentFilteredCommands = allCommands;
        currentFilteredCommands.map((command, idx) => {
          if (idx === 0) {
            command.selected = true;
          }
          return command;
        });
      } else if (commandLabel.length > 1) {
        const realCommand = commandLabel.substring(1);
        currentFilteredCommands = allCommands.filter((command, idx) => {
          if (command.label.toLowerCase().includes(realCommand.toLowerCase())) return true;
          return false;
        });

        currentFilteredCommands = currentFilteredCommands.map((command, idx) =>
          idx === 0 ? { ...command, selected: true } : { ...command, selected: false }
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
      tabCommands.map((command, idx) => {
        if (idx === 0) {
          command.selected = true;
        }
        return command;
      });
      setFilteredCommands(tabCommands);
    });
  };

  const handleCmdK = async (e) => {
    if (!open) {
      setOpen(true);
    } else {
      setOpen(false);
    }

    // prevent browser from handling CMD/CTRL + K
    e.preventDefault();
  };

  useEffect(() => {
    if (open) {
      inputRef.current.focus();
    } 
  }, [open]);

  useDidMount(() =>  {
    setFilteredCommands(filteredCommands.map((command, idx) => (idx === 0 ? { ...command, selected: true } : { ...command, selected: false })));
  });

  // useEffect(() => {
  //   toggleModalRef.current.click();
  //   inputRef.current.focus();
  // }, []);

  useKeys(['ControlLeft', 'KeyK'], handleCmdK, { target: containerRef });
  useKeys(['MetaLeft', 'KeyK'], handleCmdK, { target: containerRef });

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
    console.log("onActionCompleted");
    setOpen(false);
    setCommandLabel('>');
  };
  console.log("open", open)
  return (
    <div>
      <Modal open={open} onClickBackdrop={() => setOpen(!open)} className="w-11/12 max-w-5xl !translate-y-10">
        <Modal.Body>
          <input
            ref={inputRef}
            type="text"
            placeholder="Type here"
            value={commandLabel}
            onChange={onChangeCommand}
            onKeyPress={onKeyPressEnter}
            class="input input-bordered input-primary w-full"
          />

          <CommandItemContainer filteredCommands={filteredCommands} filteredCommandLabel={commandLabel} onActionCompleted={onActionCompleted} />
        </Modal.Body>
      </Modal>
      
    </div>
  );
}
