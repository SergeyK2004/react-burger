import { wsReducer } from './wsReducers.ts';
import * as types from '../actions';

const messagesForTest = {
  success: true,
  orders: [
    {
      ingredients: ['60d3463f7034a000269f45e9', '60d3463f7034a000269f45e7'],
      _id: '',
      status: 'done',
      number: 1,
      createdAt: '2021-06-23T20:11:01.403Z',
      updatedAt: '2021-06-23T20:11:01.406Z',
    },
    {
      ingredients: ['60d3463f7034a000269f45e9'],
      _id: '',
      status: 'done',
      number: 3,
      createdAt: '2021-06-23T20:13:23.654Z',
      updatedAt: '2021-06-23T20:13:23.657Z',
    },
  ],
  total: 2,
  totalToday: 2,
};
const messagesForAddTest = {
  success: true,
  orders: [
    {
      ingredients: ['60d3463f7034a000269f45e9', '60d3463f7034a000269f45e7'],
      _id: '',
      status: 'done',
      number: 1,
      createdAt: '2021-06-23T20:11:01.403Z',
      updatedAt: '2021-06-23T20:11:01.406Z',
    },
    {
      ingredients: ['60d3463f7034a000269f45e9'],
      _id: '',
      status: 'done',
      number: 3,
      createdAt: '2021-06-23T20:13:23.654Z',
      updatedAt: '2021-06-23T20:13:23.657Z',
    },
    {
      ingredients: ['60d3463f7034a000269f45e9', '60d3463f7034a000269f45e9'],
      _id: '',
      status: 'done',
      number: 4,
      createdAt: '2021-06-23T20:13:23.654Z',
      updatedAt: '2021-06-23T20:13:23.657Z',
    },
  ],
  total: 3,
  totalToday: 3,
};

describe('ws reducer', () => {
  it('should return the initial state', () => {
    expect(wsReducer(undefined, {})).toEqual({
      wsConnected: false,
      messages: {
        success: false,
        orders: [],
        total: 0,
        totalToday: 0,
      },
    });
  });

  it('should handle WS_CONNECTION_SUCCESS', () => {
    // Установка успешного соединения
    expect(
      wsReducer(
        {
          wsConnected: false,
          messages: {
            success: false,
            orders: [],
            total: 0,
            totalToday: 0,
          },
        },
        {
          type: types.WS_CONNECTION_SUCCESS,
        }
      )
    ).toEqual({
      wsConnected: true,
      messages: {
        success: false,
        orders: [],
        total: 0,
        totalToday: 0,
      },
    });
    // Успешное соединение при наличии ошибки с прошлой попытки
    expect(
      wsReducer(
        {
          wsConnected: false,
          error: 'some errors',
          messages: {
            success: false,
            orders: [],
            total: 0,
            totalToday: 0,
          },
        },
        {
          type: types.WS_CONNECTION_SUCCESS,
        }
      )
    ).toEqual({
      wsConnected: true,
      error: undefined,
      messages: {
        success: false,
        orders: [],
        total: 0,
        totalToday: 0,
      },
    });
  });

  it('should handle WS_CONNECTION_ERROR', () => {
    // Ошибка соединения
    expect(
      wsReducer(
        {
          wsConnected: false,
          messages: {
            success: false,
            orders: [],
            total: 0,
            totalToday: 0,
          },
        },
        {
          type: types.WS_CONNECTION_ERROR,
          payload: 'some error',
        }
      )
    ).toEqual({
      wsConnected: false,
      error: 'some error',
      messages: {
        success: false,
        orders: [],
        total: 0,
        totalToday: 0,
      },
    });
    // Ошибка соединения при наличии ошибки с прошлой попытки
    expect(
      wsReducer(
        {
          wsConnected: false,
          error: 'some errors',
          messages: {
            success: false,
            orders: [],
            total: 0,
            totalToday: 0,
          },
        },
        {
          type: types.WS_CONNECTION_ERROR,
          payload: 'other error',
        }
      )
    ).toEqual({
      wsConnected: false,
      error: 'other error',
      messages: {
        success: false,
        orders: [],
        total: 0,
        totalToday: 0,
      },
    });
  });

  it('should handle WS_CONNECTION_CLOSED', () => {
    // Закрытие успешного соединения при наличии данных
    expect(
      wsReducer(
        {
          wsConnected: true,
          messages: messagesForTest,
        },
        {
          type: types.WS_CONNECTION_CLOSED,
        }
      )
    ).toEqual({
      wsConnected: false,
      error: undefined,
      messages: messagesForTest,
    });
    // Закрытие соединения при наличии ошибки с прошлой попытки
    expect(
      wsReducer(
        {
          wsConnected: true,
          error: 'some errors',
          messages: {
            success: false,
            orders: [],
            total: 0,
            totalToday: 0,
          },
        },
        {
          type: types.WS_CONNECTION_CLOSED,
        }
      )
    ).toEqual({
      wsConnected: false,
      error: undefined,
      messages: {
        success: false,
        orders: [],
        total: 0,
        totalToday: 0,
      },
    });
  });

  it('should handle WS_GET_MESSAGE', () => {
    // Получение данных с сервера при пустом Сторе
    expect(
      wsReducer(
        {
          wsConnected: false,
          messages: {
            success: false,
            orders: [],
            total: 0,
            totalToday: 0,
          },
        },
        {
          type: types.WS_GET_MESSAGE,
          payload: messagesForTest,
        }
      )
    ).toEqual({
      wsConnected: false,
      error: undefined,
      messages: messagesForTest,
    });
    // Получение данных с сервера при наличии данных в Сторе
    expect(
      wsReducer(
        {
          wsConnected: true,
          error: undefined,
          messages: messagesForTest,
        },
        {
          type: types.WS_GET_MESSAGE,
          payload: messagesForAddTest,
        }
      )
    ).toEqual({
      wsConnected: true,
      error: undefined,
      messages: messagesForAddTest,
    });
  });
});
