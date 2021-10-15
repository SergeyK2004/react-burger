import React, { useEffect } from 'react';
import stylesApp from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import Main from '../Main/Main';
import Modal from '../Modal/Modal';
import { useDispatch } from 'react-redux';
import { getData } from '../../services/actions/burgerActions';
import { DELETE_DETAILS } from '../../services/actions';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import ForgotPassword from '../pages/ForgotPassword/ForgotPassword';
import ResetPassword from '../pages/ResetPassword/ResetPassword';
import { BrowserRouter as Router, Route } from 'react-router-dom';

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
      <Router>
        <Route path="/" exact>
          <Main onModalOpen={onModalOpen} />
          {modalIsOpen && (
            <Modal onClose={onModalClose} header={modalHeader}>
              {modalChild}
            </Modal>
          )}
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/forgot-password">
          <ForgotPassword />
        </Route>
        <Route path="/reset-password">
          <ResetPassword />
        </Route>
      </Router>
    </div>
  );
}

export default App;
