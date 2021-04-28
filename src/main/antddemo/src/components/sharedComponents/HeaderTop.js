import React from 'react';
import eclipseLogo from '../../assets/icons/eclipse-foundation-white-orange.svg';
import './headerTop.css';

export default function HeaderTop() {
  return (
    <div className="header-top">
      <img className="eclipse-foundation-white-orange" src={eclipseLogo} />
    </div>
  );
}
