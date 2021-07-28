import React from 'react';
import './App.css';
import AppHeader from '../AppHeader/AppHeader';
import Main from '../Main/Main';
import data from '../../utils/data';

function App() {
  return (
    <div className="App">
      <AppHeader />
      <Main data={data}/>
    </div>
  );
}

export default App;
