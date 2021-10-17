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
import Profile from '../pages/Profile/Profile';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import IngredientInfo from '../pages/IngredientInfo/IngredientInfo';

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
      <Router>
        <Route path="/" exact>
          <AppHeader />
          <Main onModalOpen={onModalOpen} />
          {modalIsOpen && (
            <Modal onClose={onModalClose} header={modalHeader}>
              {modalChild}
            </Modal>
          )}
        </Route>
        <Route path="/login">
          <AppHeader />
          <Login />
        </Route>
        <Route path="/register">
          <AppHeader />
          <Register />
        </Route>
        <Route path="/forgot-password">
          <AppHeader />
          <ForgotPassword />
        </Route>
        <Route path="/reset-password">
          <AppHeader />
          <ResetPassword />
        </Route>
        <ProtectedRoute path="/profile">
          <AppHeader />
          <Profile />
        </ProtectedRoute>
        <Route path="/ingredients/:id">
          <AppHeader />
          <IngredientInfo />
        </Route>
      </Router>
    </div>
  );
}

export default App;
