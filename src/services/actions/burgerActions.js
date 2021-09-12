import { apiURL } from '../../utils/const';
import { LOAD_INGREDIENTS, ORDER_NUMBER } from './index';
import { apiOrderURL } from '../../utils/const';

export function getData() {
  return function (dispatch) {
    // dispatch({
    //   type: GET_ITEMS_REQUEST,
    // });
    fetch(apiURL)
      .then((answer) => {
        if (answer.ok) {
          return answer.json();
        }
        return Promise.reject(`Ошибка ${answer.status}`);
      })
      .then((answer) => {
        if (answer.success) {
          dispatch({
            type: LOAD_INGREDIENTS,
            data: answer.data,
          });
        } else {
          return Promise.reject(`Ошибка данных`);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });

    // dispatch({
    //   type: GET_ITEMS_FAILED,
    // });
  };
}

export function postOrder(data) {
  return async function (dispatch) {
    const orderArray = data.map((item) => item._id);
    console.log(orderArray);
    const response = await fetch(apiOrderURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        ingredients: orderArray,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
      .then((res) => {
        if (res.success) {
          dispatch({
            type: ORDER_NUMBER,
            number: res.order.number,
          });
        } else {
          return Promise.reject(`Ошибка данных`);
        }
      })
      .catch((error) => {
        return Promise.reject(error);
      });
    return response;
  };
}
