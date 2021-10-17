import { authApiURL } from '../../utils/const';
import { LOGIN_USER, REGISTER_USER, LOGOUT_USER, CHEK_TOKEN } from './index';

export function login(data) {
  return function (dispatch) {
    fetch(`${authApiURL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    })
      .then((answer) => {
        if (answer.ok) {
          return answer.json();
        }
        return Promise.reject(`Ошибка ${answer.status}`);
      })
      .then((answer) => {
        if (answer.success) {
          setCookie('accessToken', answer.accessToken);
          localStorage.setItem('refreshToken', answer.refreshToken);
          dispatch({
            type: LOGIN_USER,
            data: answer,
          });
        } else {
          return Promise.reject(`Ошибка данных`);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
export function register(data) {
  return function (dispatch) {
    fetch(`${authApiURL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        name: data.name,
      }),
    })
      .then((answer) => {
        if (answer.ok) {
          return answer.json();
        }
        return Promise.reject(`Ошибка ${answer.status}`);
      })
      .then((answer) => {
        if (answer.success) {
          setCookie('accessToken', answer.accessToken);
          localStorage.setItem('refreshToken', answer.refreshToken);
          dispatch({
            type: REGISTER_USER,
            data: answer,
          });
        } else {
          return Promise.reject(`Ошибка данных`);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function logout(data) {
  return function (dispatch) {
    fetch(`${authApiURL}/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        token: localStorage.getItem('refreshToken'),
      }),
    })
      .then((answer) => {
        if (answer.ok) {
          return answer.json();
        }
        return Promise.reject(`Ошибка ${answer.status}`);
      })
      .then((answer) => {
        if (answer.success) {
          deleteCookie('accessToken');
          localStorage.removeItem('refreshToken');
          dispatch({
            type: LOGOUT_USER,
          });
        } else {
          return Promise.reject(`Ошибка данных`);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
export function getUser() {
  return function (dispatch) {
    fetchWithRefresh(`${authApiURL}/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: getCookie('accessToken'),
      },
    })
      .then((answer) => {
        if (answer.success) {
          dispatch({
            type: CHEK_TOKEN,
            data: answer,
          });
        } else {
          return Promise.reject(`Ошибка данных`);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
export function patchUser(data) {
  return function (dispatch) {
    fetchWithRefresh(`${authApiURL}/user`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: getCookie('accessToken'),
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
      }),
    })
      .then((answer) => {
        if (answer.success) {
          dispatch({
            type: CHEK_TOKEN,
            data: answer,
          });
        } else {
          return Promise.reject(`Ошибка данных`);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

const checkReponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const refreshToken = () => {
  return fetch(`${authApiURL}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken'),
    }),
  }).then(checkReponse);
};

export const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options);
    return await checkReponse(res);
  } catch (err) {
    if (err.message === 'jwt expired') {
      const refreshData = await refreshToken(); //обновляем токен
      localStorage.setItem('refreshToken', refreshData.refreshToken);
      setCookie('accessToken', refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options); //повторяем запрос
      return await checkReponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

export function setCookie(name, value, props) {
  props = props || {};
  props = {
    path: '/',
    expires: 1200,
    ...props,
  };
  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + '=' + value;
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export function getCookie(name) {
  const matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
        '=([^;]*)'
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
function deleteCookie(name) {
  setCookie(name, '', {
    'max-age': -1,
  });
}
