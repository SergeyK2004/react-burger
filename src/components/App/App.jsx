import React, { useEffect } from 'react';
import stylesApp from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import Main from '../Main/Main';
import Modal from '../Modal/Modal';
import { useDispatch } from 'react-redux';
import { getData } from '../../services/actions/burgerActions';
import { DELETE_DETAILS } from '../../services/actions';
import Login from '../pages/Login/Login';

function App() {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [modalChild, setModalChild] = React.useState('');
  const [modalHeader, setModalHeader] = React.useState('');

  const dispatch = useDispatch();

  function onModalOpen(modalContent, modalHeaderLabel = '') {
    setModalChild(modalContent);
    setModalHeader(modalHeaderLabel);
    setModalIsOpen(true);
  }

  function onModalClose() {
    setModalIsOpen(false);
    dispatch({
      type: DELETE_DETAILS,
    });
  }
  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  return (
    <div className={stylesApp.App}>
      <AppHeader />
      <Login />
      {/* <Main onModalOpen={onModalOpen} />
      {modalIsOpen && (
        <Modal onClose={onModalClose} header={modalHeader}>
          {modalChild}
        </Modal> */}
      {/* )} */}
    </div>
  );
}

export default App;
