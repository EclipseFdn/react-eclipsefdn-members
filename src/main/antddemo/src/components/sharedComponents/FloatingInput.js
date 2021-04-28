import React, { useState } from 'react';
import './floatingInput.css';

export default function FloatingInput(props) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const onFocused = () => {
    setIsFocused(true);
  };
  const onBlur = () => {
    setIsFocused(false);
  };
  return (
    <div className="floating-all-ctn">
      <label
        htmlFor={props.tagName}
        className={isFocused || hasValue ? 'floating-label' : ''}
      >
        {props.label}
      </label>
      <div className="floating-input-ctn">
        <input
          name={props.tagName}
          onFocus={onFocused}
          onBlur={onBlur}
          onChange={(ev) => {
            if (ev.currentTarget.value) {
              setHasValue(true);
            } else setHasValue(false);
          }}
        />
        <p>{props.description}</p>
      </div>
    </div>
  );
}
