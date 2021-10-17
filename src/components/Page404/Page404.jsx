import React from 'react';

function Page404(props) {
  return (
    <div>
      <p className="text text_type_digits-large mt-20">404</p>
      <p className="text text_type_main-large mt-10">Страницы не существует</p>
      <p className="text text_type_main-default mt-25">
        Возможно вы попали сюда по ошибке, а может быть эту страницу уничтожил
        пролетающий мимо метеорит.
      </p>
    </div>
  );
}

export default Page404;
