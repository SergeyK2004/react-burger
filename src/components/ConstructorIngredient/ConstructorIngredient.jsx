import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import stylesConstructorIngredient from './ConstructorIngredient.module.css';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrop, useDrag } from 'react-dnd';
import { typeOfIngredientsData } from '../../utils/const';

import { useDispatch } from 'react-redux';
import { DELETE_INGREDIENT } from '../../services/actions';

function ConstructorIngredient({ item, index, moveElement }) {
  const ref = useRef(null);
  const dispatch = useDispatch();

  const [{ isDragging }, dragRef] = useDrag({
    type: 'constructorElement',
    item: () => {
      return { item, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: 'constructorElement',
    hover: (item, monitor) => {
      if (item.index === index) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (item.index < index && hoverClientY < hoverMiddleY) {
        return;
      }
      if (item.index > index && hoverClientY > hoverMiddleY) {
        return;
      }

      moveElement(item.index, index);
      item.index = index;
    },
  });

  function deleteElement(item) {
    dispatch({
      type: DELETE_INGREDIENT,
      item: item,
    });
  }
  const opacity = isDragging ? 0 : 1;

  dragRef(dropRef(ref));

  return (
    <div
      ref={ref}
      className={stylesConstructorIngredient.burgerItem}
      style={{ opacity }}
      key={item.constId}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        handleClose={() => deleteElement(item)}
        text={item.name}
        price={item.price}
        thumbnail={item.image_mobile}
      />
    </div>
  );
}

export default ConstructorIngredient;

ConstructorIngredient.propTypes = {
  item: typeOfIngredientsData.isRequired,
  index: PropTypes.number,
  moveElement: PropTypes.func.isRequired,
};
