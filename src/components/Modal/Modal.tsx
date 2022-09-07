import React, { forwardRef } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

import ModalActions from './ModalActions';
import ModalBody from './ModalBody';
import ModalHeader from './ModalHeader';

export type ModalProps = React.HTMLAttributes<HTMLDivElement> & {
  open?: boolean;
  responsive?: boolean;
  onClickBackdrop?: () => void;
};

const Modal = forwardRef<HTMLDivElement, ModalProps>(({ children, open, responsive, onClickBackdrop, className, ...props }, ref): JSX.Element => {
  const containerClasses = twMerge(
    'modal',
    clsx({
      'modal-open': open,
      'modal-bottom sm:modal-middle': responsive,
    }),
    'items-start'
  );

  const bodyClasses = twMerge('modal-box', className);

  return (
    <div
      aria-label="Modal"
      aria-hidden={!open}
      aria-modal={open}
      className={containerClasses}
      onClick={(e) => {
        e.stopPropagation();
        if (e.target === e.currentTarget) {
          e.stopPropagation();
          if (onClickBackdrop) {
            onClickBackdrop();
          }
        }
      }}
    >
      <div {...props} className={bodyClasses} ref={ref}>
        {children}
      </div>
    </div>
  );
});

Modal.displayName = 'Modal';

export default Object.assign(Modal, {
  Header: ModalHeader,
  Body: ModalBody,
  Actions: ModalActions,
});
