import React, { useState } from 'react';

// Component accept text, placeholder values and also pass what type of Input - input, textarea so that we can use it for styling accordingly
const Editable = ({
  text,
  type,
  placeholder,
  children,
  ...props
}) => {

  const [isEditing, setEditing] = useState(false);

  // Event handler while pressing any key while editing
  const handleKeyDown = (event, type) => {
  };

  return (
    <span {...props}>
      {isEditing ? (
        <span
          onBlur={() => setEditing(false)}
          onKeyDown={e => handleKeyDown(e, type)}
        >
          {children}
        </span>
      ) : (
        <span
          onClick={() => setEditing(true)}
          name={name}
        >
          <p>
            {text || placeholder || ''}
          </p>
        </span>
      )}
    </span>
  );
};

export default Editable;
