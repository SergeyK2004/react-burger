import React from 'react';
import PropTypes from 'prop-types';
import stylesModalOverlay from './ModalOverlay.module.css';

function ModalOverlay({ onClick }) {
  return <div className={stylesModalOverlay.overlay} onClick={onClick}></div>;
}

export default ModalOverlay;

ModalOverlay.propTypes = {
  onClick: PropTypes.func.isRequired,
};
