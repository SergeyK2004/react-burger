import React, { FunctionComponent, ReactElement, ReactNode } from 'react';
import PropTypes from 'prop-types';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import stylesMain from './Main.module.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

interface IMainProps {
  onModalOpen: (modalChild: ReactNode, modalHeader: string) => void;
}

const  Main: FunctionComponent<IMainProps> = ({ onModalOpen }) => {
  return (
    <div className={stylesMain.main}>
      <DndProvider backend={HTML5Backend}>
        <div className="mr-10">
          <h1
            className={`${stylesMain.label} text text_type_main-large mt-10 mb-5`}
          >
            Соберите бургер
          </h1>
          <BurgerIngredients onModalOpen={onModalOpen} />
        </div>
        <BurgerConstructor onModalOpen={onModalOpen} />
      </DndProvider>
    </div>
  );
}

export default Main;

