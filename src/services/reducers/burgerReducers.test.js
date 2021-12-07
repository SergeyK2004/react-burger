import { burgerReducer } from './burgerReducers.ts';
import * as types from '../actions';
const ingredientsArray = [
  {
    _id: '60666c42cc7b410027a1a9b1',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    __v: 0,
  },
  {
    _id: '60666c42cc7b410027a1a9b5',
    name: 'Говяжий метеорит (отбивная)',
    type: 'main',
    proteins: 800,
    fat: 800,
    carbohydrates: 300,
    calories: 2674,
    price: 3000,
    image: 'https://code.s3.yandex.net/react/code/meat-04.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png',
    __v: 0,
  },
  {
    _id: '60666c42cc7b410027a1a9b6',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    __v: 0,
  },
];

const ingredientsArrayWCount = [
  {
    _id: '60666c42cc7b410027a1a9b1',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    __v: 0,
    count: 0,
  },
  {
    _id: '60666c42cc7b410027a1a9b5',
    name: 'Говяжий метеорит (отбивная)',
    type: 'main',
    proteins: 800,
    fat: 800,
    carbohydrates: 300,
    calories: 2674,
    price: 3000,
    image: 'https://code.s3.yandex.net/react/code/meat-04.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png',
    __v: 0,
    count: 0,
  },
  {
    _id: '60666c42cc7b410027a1a9b6',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    __v: 0,
    count: 0,
  },
];
const arrayForChangeCount = [
  {
    _id: '60666c42cc7b410027a1a9b1',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    __v: 0,
    count: 0,
  },
  {
    _id: '60666c42cc7b410027a1a9b5',
    name: 'Говяжий метеорит (отбивная)',
    type: 'main',
    proteins: 800,
    fat: 800,
    carbohydrates: 300,
    calories: 2674,
    price: 3000,
    image: 'https://code.s3.yandex.net/react/code/meat-04.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png',
    __v: 0,
    count: 0,
  },
  {
    _id: '60666c42cc7b410027a1a9b6',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    __v: 0,
    count: 0,
  },
];

describe('burger reducer', () => {
  it('should return the initial state', () => {
    expect(burgerReducer(undefined, {})).toEqual({
      ingredients: [],
      constructor: [],
      ingredient: {},
      order: 0,
    });
  });

  it('should handle LOAD_INGREDIENTS', () => {
    // Загрузка игредиентов в пустой Стор
    expect(
      burgerReducer(
        {
          ingredients: [],
          constructor: [],
          ingredient: {},
          order: 0,
        },
        {
          type: types.LOAD_INGREDIENTS,
          data: ingredientsArray,
        }
      )
    ).toEqual({
      ingredients: ingredientsArrayWCount,
      constructor: [],
      ingredient: {},
      order: 0,
    });
    // Повторная загрузка при имеющихся данных в сторе
    expect(
      burgerReducer(
        {
          ingredients: ingredientsArrayWCount,
          constructor: [],
          ingredient: {},
          order: 0,
        },
        {
          type: types.LOAD_INGREDIENTS,
          data: ingredientsArray,
        }
      )
    ).toEqual({
      ingredients: ingredientsArrayWCount,
      constructor: [],
      ingredient: {},
      order: 0,
    });
  });

  it('should handle LOAD_DETAILS', () => {
    // Загрузка игредиента в пустой Стор
    expect(
      burgerReducer(
        {
          ingredients: [],
          constructor: [],
          ingredient: {},
          order: 0,
        },
        {
          type: types.LOAD_DETAILS,
          item: ingredientsArrayWCount[0],
        }
      )
    ).toEqual({
      ingredients: [],
      constructor: [],
      ingredient: ingredientsArrayWCount[0],
      order: 0,
    });
    // Повторная загрузка при имеющихся данных в сторе
    expect(
      burgerReducer(
        {
          ingredients: ingredientsArrayWCount,
          constructor: [],
          ingredient: ingredientsArrayWCount[0],
          order: 0,
        },
        {
          type: types.LOAD_DETAILS,
          item: ingredientsArrayWCount[1],
        }
      )
    ).toEqual({
      ingredients: ingredientsArrayWCount,
      constructor: [],
      ingredient: ingredientsArrayWCount[1],
      order: 0,
    });
  });

  it('should handle DELETE_DETAILS', () => {
    // Очистка детальных данных для попапов при пустом Сторе
    expect(
      burgerReducer(
        {
          ingredients: [],
          constructor: [],
          ingredient: {},
          order: 0,
        },
        {
          type: types.DELETE_DETAILS,
        }
      )
    ).toEqual({
      ingredients: [],
      constructor: [],
      ingredient: {},
      order: 0,
    });
    // Очистка детальных данных для попапов при заполненном Сторе
    expect(
      burgerReducer(
        {
          ingredients: ingredientsArrayWCount,
          constructor: [],
          ingredient: ingredientsArrayWCount[0],
          order: 5674,
        },
        {
          type: types.DELETE_DETAILS,
        }
      )
    ).toEqual({
      ingredients: ingredientsArrayWCount,
      constructor: [],
      ingredient: {},
      order: 0,
    });
  });

  it('should handle ORDER_NUMBER', () => {
    // Номер заказа при пустом Сторе
    expect(
      burgerReducer(
        {
          ingredients: [],
          constructor: [],
          ingredient: {},
          order: 0,
        },
        {
          type: types.ORDER_NUMBER,
          number: 3489,
        }
      )
    ).toEqual({
      ingredients: [],
      constructor: [],
      ingredient: {},
      order: 3489,
    });
    // Номер заказа при заполненном Сторе
    expect(
      burgerReducer(
        {
          ingredients: ingredientsArrayWCount,
          constructor: [],
          ingredient: ingredientsArrayWCount[0],
          order: 5674,
        },
        {
          type: types.ORDER_NUMBER,
          number: 3489,
        }
      )
    ).toEqual({
      ingredients: ingredientsArrayWCount,
      constructor: [],
      ingredient: ingredientsArrayWCount[0],
      order: 3489,
    });
  });

  it('should handle ADD_INGREDIENT', () => {
    // Добавление первого ингредиента в бургер при пустом конструкторе
    arrayForChangeCount[0].count = 1;
    expect(
      burgerReducer(
        {
          ingredients: ingredientsArrayWCount,
          constructor: [],
          ingredient: {},
          order: 0,
        },
        {
          type: types.ADD_INGREDIENT,
          item: ingredientsArrayWCount[0],
          id: ingredientsArrayWCount[0]._id,
          qnt: 1,
        }
      )
    ).toEqual({
      ingredients: arrayForChangeCount,
      constructor: [
        {
          ...ingredientsArrayWCount[0],
          constId: ingredientsArrayWCount[0]._id,
        },
      ],
      ingredient: {},
      order: 0,
    });

    // Добавление второго ингредиента в бургер при наличии одного в конструкторе
    arrayForChangeCount[1].count = 2;
    ingredientsArrayWCount[0].count = 1;
    expect(
      burgerReducer(
        {
          ingredients: ingredientsArrayWCount,
          constructor: [
            {
              ...ingredientsArrayWCount[0],
              constId: ingredientsArrayWCount[0]._id,
            },
          ],
          ingredient: {},
          order: 0,
        },
        {
          type: types.ADD_INGREDIENT,
          item: ingredientsArrayWCount[1],
          id: ingredientsArrayWCount[1]._id,
          qnt: 2,
        }
      )
    ).toEqual({
      ingredients: arrayForChangeCount,
      constructor: [
        {
          ...ingredientsArrayWCount[0],
          constId: ingredientsArrayWCount[0]._id,
        },
        {
          ...ingredientsArrayWCount[1],
          constId: ingredientsArrayWCount[1]._id,
        },
      ],
      ingredient: {},
      order: 0,
    });
  });

  it('should handle DELETE_INGREDIENT', () => {
    // Удаление ингредиента из бургера
    ingredientsArrayWCount[1].count = 2;
    arrayForChangeCount[1].count = 0;
    const itemForDelete = {
      ...ingredientsArrayWCount[1],
      constId: 1637997988671,
    };
    expect(
      burgerReducer(
        {
          ingredients: ingredientsArrayWCount,
          constructor: [
            {
              ...ingredientsArrayWCount[0],
              constId: 1637997988670,
            },
            {
              ...ingredientsArrayWCount[1],
              constId: 1637997988671,
            },
          ],
          ingredient: {},
          order: 0,
        },
        {
          type: types.DELETE_INGREDIENT,
          item: itemForDelete,
          id: ingredientsArrayWCount[1]._id,
          qnt: 2,
        }
      )
    ).toEqual({
      ingredients: arrayForChangeCount,
      constructor: [
        {
          ...ingredientsArrayWCount[0],
          constId: 1637997988670,
        },
      ],
      ingredient: {},
      order: 0,
    });
  });

  it('should handle CHANGE_INGREDIENT', () => {
    // Изменение порядка ингредиентов в бургере
    expect(
      burgerReducer(
        {
          ingredients: ingredientsArrayWCount,
          constructor: [
            {
              ...ingredientsArrayWCount[0],
              constId: 1637997988670,
            },
            {
              ...ingredientsArrayWCount[1],
              constId: 1637997988671,
            },
            {
              ...ingredientsArrayWCount[2],
              constId: 1637997988672,
            },
          ],
          ingredient: {},
          order: 0,
        },
        {
          type: types.CHANGE_INGREDIENT,
          dragIndex: 0,
          hoverIndex: 1,
        }
      )
    ).toEqual({
      ingredients: ingredientsArrayWCount,
      constructor: [
        {
          ...ingredientsArrayWCount[1],
          constId: 1637997988671,
        },
        {
          ...ingredientsArrayWCount[0],
          constId: 1637997988670,
        },
        {
          ...ingredientsArrayWCount[2],
          constId: 1637997988672,
        },
      ],
      ingredient: {},
      order: 0,
    });
  });

  it('should handle ORDER_CLEAR', () => {
    // Очистка собранного бургера
    arrayForChangeCount[0].count = 0;
    arrayForChangeCount[1].count = 0;
    ingredientsArrayWCount[0].count = 1;
    ingredientsArrayWCount[1].count = 1;
    expect(
      burgerReducer(
        {
          ingredients: ingredientsArrayWCount,
          constructor: [
            {
              ...ingredientsArrayWCount[0],
              constId: 1637997988670,
            },
            {
              ...ingredientsArrayWCount[1],
              constId: 1637997988671,
            },
          ],
          ingredient: {},
          order: 0,
        },
        {
          type: types.ORDER_CLEAR,
        }
      )
    ).toEqual({
      ingredients: arrayForChangeCount,
      constructor: [],
      ingredient: {},
      order: 0,
    });
  });
});
