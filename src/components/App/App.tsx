import React, { useEffect, ReactNode } from 'react';
import stylesApp from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import Main from '../Main/Main';
import Modal from '../Modal/Modal';
import Page404 from '../Page404/Page404';
import { useDispatch } from '../../utils/hooks';
import { getData } from '../../services/actions/burgerActions';
import { DELETE_DETAILS } from '../../services/actions';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import ForgotPassword from '../pages/ForgotPassword/ForgotPassword';
import ResetPassword from '../pages/ResetPassword/ResetPassword';
import Profile from '../pages/Profile/Profile';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import IngredientInfo from '../pages/IngredientInfo/IngredientInfo';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import { Location } from 'history';
import Feed from '../pages/Feed/Feed';
import OrderComposition from '../OrderComposition/OrderComposition';
import OrdersHistory from '../pages/OrdersHistory/OrdersHistory';

type TLocationState = {
  background: Location;
};

function App() {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [modalChild, setModalChild] = React.useState<ReactNode | ''>('');
  const [modalHeader, setModalHeader] = React.useState('');
  const history = useHistory();
  let location = useLocation<TLocationState>();
  const dispatch = useDispatch();
  let background;
  const ingredientModalChild = <IngredientDetails />;
  const ingredientModalHeader = 'Детали ингредиента';
  const orderModalChild = <OrderComposition />;
  const orderModalHeader = '';

  if (history.action === 'PUSH' || history.action === 'REPLACE') {
    background = location.state && location.state.background;
  } else {
    background = undefined;
  }
  function onModalOpen(modalContent: ReactNode, modalHeaderLabel = '') {
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

  function onIngredientModalClose() {
    history.goBack();
  }

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  return (
    <div className={stylesApp.App}>
      <Switch location={background || location}>
        <Route path="/" exact>
          <AppHeader />
          <Main onModalOpen={onModalOpen} />
          {modalIsOpen && (
            <Modal onClose={onModalClose} header={modalHeader}>
              {modalChild}
            </Modal>
          )}
        </Route>
        <Route path="/feed" exact>
          <AppHeader />
          <Feed onModalOpen={onModalOpen} />
          {modalIsOpen && (
            <Modal onClose={onModalClose} header={modalHeader}>
              {modalChild}
            </Modal>
          )}
        </Route>
        <ProtectedRoute path="/profile/orders" exact>
          <AppHeader />
          <OrdersHistory onModalOpen={onModalOpen} />
          {modalIsOpen && (
            <Modal onClose={onModalClose} header={modalHeader}>
              {modalChild}
            </Modal>
          )}
        </ProtectedRoute>
        <ProtectedRoute path="/profile/orders/:id">
          <AppHeader />
          <OrderComposition />
        </ProtectedRoute>
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
        <Route path="/feed/:id">
          <AppHeader />
          <OrderComposition />
        </Route>
        <Route path="/">
          <AppHeader />
          <Page404 />
        </Route>
      </Switch>
      {/* {background && (
        <Route path="/ingredients/:id" children={<ModalIngredient />} />
      )} */}
      {background && (
        <Route path="/ingredients/:id">
          <Modal
            onClose={onIngredientModalClose}
            header={ingredientModalHeader}
          >
            {ingredientModalChild}
          </Modal>
        </Route>
      )}
      {background && (
        <Route path="/feed/:id">
          <Modal onClose={onIngredientModalClose} header={orderModalHeader}>
            {orderModalChild}
          </Modal>
        </Route>
      )}
      {background && (
        <ProtectedRoute path="/profile/orders/:id">
          <Modal onClose={onIngredientModalClose} header={orderModalHeader}>
            {orderModalChild}
          </Modal>
        </ProtectedRoute>
      )}
    </div>
  );
}

export default App;
