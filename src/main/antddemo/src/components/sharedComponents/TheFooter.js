import React from 'react';
import './theFooter.css'

export default function Footer() {
  return (
    <footer className="the-footer">
      <p>
        Copyright © <a href="https://eclipse.org/">Eclipse Foundation</a>{' '}
        {new Date().getFullYear()}
      </p>
    </footer>
  );
}
