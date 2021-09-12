import React from 'react';
import stylesOrderDetails from './OrderDetails.module.css';
import imageDone from '../../images/done.svg';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
function OrderDetails() {
  const order = useSelector((store) => store.burgerReducer.order);
  return (
    <div className={stylesOrderDetails.bigCard}>
      <p className={stylesOrderDetails.order + ' text text_type_digits-large'}>
        {order}
      </p>
      <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
      <img
        src={imageDone}
        alt="Успешно"
        className={stylesOrderDetails.done + ' mt-15'}
      />
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
