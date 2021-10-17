import React from 'react';
import ReactDOM from 'react-dom';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import stylesModalIngredient from './ModalIngredient.module.css';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
const modalRoot = document.getElementById('react-modals');

function ModalIngredient() {
  let history = useHistory();
  let { id } = useParams();
  const items = useSelector((store) => store.burgerReducer.ingredients);
  const item = items.find((el) => el._id === id);

  function onClose(e) {
    // e.stopPropagation();
    history.goBack();
  }
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
  if (!item) {
    return <div></div>;
  }

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClick={onOverlayClick} />
      <div className={stylesModalIngredient.modal}>
        <div className={stylesModalIngredient.header + ' mt-10 mr-10 ml-10'}>
          <h1
            className={
              stylesModalIngredient.label + ' text text_type_main-large'
            }
          >
            Детали ингредиента
          </h1>
          <button
            className={stylesModalIngredient.buttonClose}
            onClick={onClose}
          />
        </div>
        <div className={stylesModalIngredient.children}>
          <IngredientDetails item={item} />
        </div>
      </div>
    </>,
    modalRoot
  );
}

export default ModalIngredient;
