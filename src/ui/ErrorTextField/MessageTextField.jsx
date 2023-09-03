import React from 'react';

import './MessageTextField.css';

const MessageTextField = ({ className, scheme, children }) => (
  <span
    className={`message-text-field ${className || ''}${
      scheme ? ` message-text-field_scheme_${scheme}` : ''
    }`}
  >
    {children}
  </span>
);

export default MessageTextField;
