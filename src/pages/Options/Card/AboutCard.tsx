import React from 'react';

type Props = {};

const AboutCard = (props: Props) => {
  return (
    <>
      <p>Thank you for using Chrommandr.</p>
      <p>
        <strong>Chrommandr</strong> is a command palette built right into your browser. It allows you to execute action or move to tab quickly.
      </p>
      <br />
      <p>
        For more information, you can visit chrommandr's{' '}
        <a className="link" href="https://github.com/ddsuhaimi/chrommandr">
          repository
        </a>
        .
      </p>
    </>
  );
};

export default AboutCard;
