import React from 'react';
import stylesModalOverlay from './ModalOverlay.module.css';

function ModalOverlay({ onClick }) {
  return <div className={stylesModalOverlay.overlay} onClick={onClick}></div>;
}

export default ModalOverlay;
