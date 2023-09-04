import React from 'react';
import MainSection from '../MainSection/MainSection';

import './MessageSection.css';

const MessageSection = ({ ariaLabel = 'Сообщение', children }) => (
  <MainSection className="message-section" ariaLabel={ariaLabel}>
    <p className="message-section__message">{children}</p>
  </MainSection>
);

export default MessageSection;
