import React from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import stylesModal from './Modal.module.css';
import ModalOverlay from '../ModalOverlay/ModalOverlay';

const modalRoot = document.getElementById('react-modals');

function Modal({ children, onClose, header = '' }) {
  function onOverlayClick() {
    onClose();
  }

  function onPressEsc(evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      onClose();
    }
  }

  React.useEffect(() => {
    document.addEventListener('keydown', onPressEsc);
    return () => {
      document.removeEventListener('keydown', onPressEsc);
    };
  }, []);

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClick={onOverlayClick} />
      <div className={stylesModal.modal}>
        <div className={stylesModal.header + ' mt-10 mr-10 ml-10'}>
          <h1 className={stylesModal.label}>{header}</h1>
          <button className={stylesModal.buttonClose} onClick={onClose} />
        </div>
        <div className={stylesModal.children}>{children}</div>
      </div>
    </>,
    modalRoot
  );
}

export default Modal;
