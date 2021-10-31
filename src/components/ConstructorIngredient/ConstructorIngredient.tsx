import React, { FunctionComponent, useRef } from 'react';
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
import { TItem } from '../../utils/types';

interface IConstructorIngredientProps  {
  item: TItem;
  index: number;
  moveElement: (dragIndex: number, hoverIndex: number) => void;
}

const ConstructorIngredient: FunctionComponent<IConstructorIngredientProps> = ({ item, index, moveElement }) => {
  const ref = useRef<HTMLInputElement>(null);
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
    hover: (item: TItem, monitor) => {
      if (!item.index || item.index === index) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      if (!hoverBoundingRect) return;
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) return;
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

  function deleteElement(item: TItem) {
    dispatch({
      type: DELETE_INGREDIENT,
      item: item,
      qnt: 1,
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

