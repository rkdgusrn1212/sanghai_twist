import React from 'react';

const KeyDown = ({ children, up, down, left, right, enter }) => {
  return (
    <div
      tabIndex={0}
      onKeyDown={(e) => {
        switch (e.key) {
          case 'ArrowUp': {
            up();
            break;
          }
          case 'ArrowDown': {
            down();
            break;
          }
          case 'ArrowLeft': {
            left();
            break;
          }
          case 'ArrowRight': {
            right();
            break;
          }

          case 'Enter': {
            enter();
            break;
          }
          default:
        }
      }}
    >
      {children}
    </div>
  );
};

export default KeyDown;
