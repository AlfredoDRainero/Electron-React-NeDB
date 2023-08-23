// BurgerButton.jsx
import React, { useState } from 'react';
import './styles.css';

const BurgerButton = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  return (
    <button
      className={`burger-button ${isActive ? 'active' : ''}`}
      onClick={toggleMenu}
    >
      <div className="line"></div>
      <div className="line"></div>
    </button>
  );
};

export default BurgerButton;