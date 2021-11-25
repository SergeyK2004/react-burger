import React from 'react';
import stylesOrderDetails from './OrderDetails.module.css';
import imageDone from '../../images/done.svg';
import { useSelector } from '../../utils/hooks';
import Preloader from '../../pages/Preloader/Preloader';
function OrderDetails() {
  const order = useSelector((store) => store.burgerReducer.order);

  return (
    <div className={stylesOrderDetails.bigCard}>
      {order ? (
        <p
          className={stylesOrderDetails.order + ' text text_type_digits-large'}
        >
          {order}
        </p>
      ) : (
        <p
          className={stylesOrderDetails.order + ' text text_type_digits-large'}
        >
          - - - - -
        </p>
      )}
      <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
      {order ? (
        <img
          src={imageDone}
          alt="Успешно"
          className={stylesOrderDetails.done + ' mt-15'}
        />
      ) : (
        <Preloader />
      )}
      <p className="text text_type_main-default mt-15">
        Ваш заказ начали готовить
      </p>
      <p
        className={
          stylesOrderDetails.stationText +
          ' text text_type_main-default mt-2 mb-30'
        }
      >
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}

export default OrderDetails;
