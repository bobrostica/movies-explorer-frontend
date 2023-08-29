import React from 'react';
import MainSection from '../MainSection/MainSection';

import './MessageSection.css';

const MessageSection = ({
  className,
  type,
  ariaLabel = 'Сообщение',
  children,
}) => (
  <MainSection
    className={`message-section ${className || ''}`}
    ariaLabel={ariaLabel}
  >
    <p
      className={`message-section__message ${
        type ? `message-section__message_type_${type}` : ''
      }`}
    >
      {children}
    </p>
  </MainSection>
);

export default MessageSection;
