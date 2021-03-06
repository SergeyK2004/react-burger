import React, { FunctionComponent } from 'react';
import stylesModalOverlay from './ModalOverlay.module.css';

interface IModalOverlayProps {
  onClick: () => void;
}

const ModalOverlay: FunctionComponent<IModalOverlayProps> = ({ onClick }) => {
  return <div className={stylesModalOverlay.overlay} onClick={onClick}></div>;
};

export default ModalOverlay;
