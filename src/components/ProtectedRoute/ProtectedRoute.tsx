import { getUser } from '../../services/actions/authActions';
import { Route, Redirect } from 'react-router-dom';
import { FunctionComponent, ReactNode, useEffect, useState } from 'react';
import { useSelector, useDispatch } from '../../utils/hooks';
import Preloader from '../../pages/Preloader/Preloader';

interface IProtectedRouteProps {
  children: ReactNode;
  path: string;
  exact?: boolean;
}

const ProtectedRoute: FunctionComponent<IProtectedRouteProps> = ({
  children,
  ...rest
}) => {
  const [isUserLoaded, setUserLoaded] = useState(false);
  const auth = useSelector((store) => store.authReducer.isAuthorized);
  const dispatch = useDispatch();
  const init = async () => {
    await dispatch(getUser());
    setUserLoaded(true);
  };

  useEffect(() => {
    init();
  }, []);

  if (!isUserLoaded) {
    return <Preloader />;
  }

  return (
    <Route
      {...rest}
      // Получим текущий маршрут, с которого произойдёт переадресация
      // для неавторизованного пользователя
      render={({ location }) =>
        auth ? (
          children
        ) : (
          <Redirect
            // Передадим в пропс to не строку, а объект.
            to={{
              // Маршрут, на который произойдёт переадресация
              pathname: '/login',
              // В from сохраним текущий маршрут
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
