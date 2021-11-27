import { authReducer } from './authReducers.ts';
import * as types from '../actions';

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(authReducer(undefined, {})).toEqual({
      user: {
        email: '',
        password: '',
      },
      accessToken: '',
      isAuthorized: false,
    });
  });

  it('should handle LOGIN_USER', () => {
    expect(
      authReducer(
        {
          user: {
            email: '',
            password: '',
          },
          accessToken: '',
          isAuthorized: false,
        },
        {
          type: types.LOGIN_USER,
          data: {
            email: 'aa@aa.com',
            password: '123456',
          },
        }
      )
    ).toEqual({
      user: {
        email: 'aa@aa.com',
        password: '123456',
      },
      accessToken: '',
      isAuthorized: true,
    });

    expect(
      authReducer(
        {
          user: {
            email: 'aa@aa.com',
            password: '123456',
          },
          accessToken: '',
          isAuthorized: true,
        },
        {
          type: types.LOGIN_USER,
          data: {
            email: 'bb@bb.com',
            password: 'qwerty',
          },
        }
      )
    ).toEqual({
      user: {
        email: 'bb@bb.com',
        password: 'qwerty',
      },
      accessToken: '',
      isAuthorized: true,
    });
  });

  it('should handle REGISTER_USER', () => {
    expect(
      authReducer(
        {
          user: {
            email: '',
            password: '',
          },
          accessToken: '',
          isAuthorized: false,
        },
        {
          type: types.REGISTER_USER,
          data: {
            email: 'aa@aa.com',
            password: '123456',
          },
        }
      )
    ).toEqual({
      user: {
        email: 'aa@aa.com',
        password: '123456',
      },
      accessToken: '',
      isAuthorized: true,
    });

    expect(
      authReducer(
        {
          user: {
            email: 'aa@aa.com',
            password: '123456',
          },
          accessToken: '',
          isAuthorized: true,
        },
        {
          type: types.REGISTER_USER,
          data: {
            email: 'bb@bb.com',
            password: 'qwerty',
          },
        }
      )
    ).toEqual({
      user: {
        email: 'bb@bb.com',
        password: 'qwerty',
      },
      accessToken: '',
      isAuthorized: true,
    });
  });

  it('should handle LOGOUT_USER', () => {
    expect(
      authReducer(
        {
          user: {
            email: '',
            password: '',
          },
          accessToken: '',
          isAuthorized: false,
        },
        {
          type: types.LOGOUT_USER,
        }
      )
    ).toEqual({
      user: {
        email: '',
        password: '',
      },
      accessToken: '',
      isAuthorized: false,
    });

    expect(
      authReducer(
        {
          user: {
            email: 'aa@aa.com',
            password: '123456',
          },
          accessToken: '',
          isAuthorized: true,
        },
        {
          type: types.LOGOUT_USER,
        }
      )
    ).toEqual({
      user: {
        email: '',
        password: '',
      },
      accessToken: '',
      isAuthorized: false,
    });
  });

  it('should handle CHEK_TOKEN', () => {
    expect(
      authReducer(
        {
          user: {
            email: '',
            password: '',
          },
          accessToken: '',
          isAuthorized: false,
        },
        {
          type: types.CHEK_TOKEN,
          data: {
            email: 'aa@aa.com',
            password: '123456',
          },
        }
      )
    ).toEqual({
      user: {
        email: 'aa@aa.com',
        password: '123456',
      },
      accessToken: '',
      isAuthorized: true,
    });

    expect(
      authReducer(
        {
          user: {
            email: 'aa@aa.com',
            password: '123456',
          },
          accessToken: '',
          isAuthorized: true,
        },
        {
          type: types.CHEK_TOKEN,
          data: {
            email: 'bb@bb.com',
            password: 'qwerty',
          },
        }
      )
    ).toEqual({
      user: {
        email: 'bb@bb.com',
        password: 'qwerty',
      },
      accessToken: '',
      isAuthorized: true,
    });
  });
});
