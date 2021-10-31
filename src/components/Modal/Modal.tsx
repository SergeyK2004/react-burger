import React, { FunctionComponent, ReactElement } from 'react';
import ReactDOM from 'react-dom';
import stylesModal from './Modal.module.css';
import ModalOverlay from '../ModalOverlay/ModalOverlay';

const modalRoot = document.getElementById('react-modals');

interface IModalProps {
  children: ReactElement;
  onClose: () => void;
  header?: string;
}

const Modal: FunctionComponent<IModalProps> = ({ children, onClose, header = '' }) => {
  if (!modalRoot) return;
  function onOverlayClick() {
    onClose();
  }

  function onPressEsc(evt: KeyboardEvent) {
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
          <h1 className={stylesModal.label + ' text text_type_main-large'}>
            {header}
          </h1>
          <button className={stylesModal.buttonClose} onClick={onClose} />
        </div>
        <div className={stylesModal.children}>{children}</div>
      </div>
    </>,
    modalRoot
  );
}

export default Modal;
