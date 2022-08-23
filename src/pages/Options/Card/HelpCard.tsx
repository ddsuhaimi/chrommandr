import React from 'react';

type Props = {};

const HelpCard = (props: Props) => {
  return (
    <>
      <p>
        If you have any issues, please submit your question to:{' '}
        <a className="link" href="https://github.com/ddsuhaimi/chrommandr/issues">
          project issues page
        </a>
        .
      </p>
    </>
  );
};

export default HelpCard;
