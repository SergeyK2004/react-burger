import React, { useEffect, useState } from 'react';
import './App.css';
import AppHeader from '../AppHeader/AppHeader';
import Main from '../Main/Main';
import { apiURL } from '../../utils/const';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(apiURL)
      .then(answer => answer.json())
      .then(answer => {
        if (answer.success) {
          setData(answer.data);
        }
      })
      .catch(error => {
        console.log(error.message);
    })
  
  }, []);
  return (
    <div className="App">
      <AppHeader />
      <Main data={data}/>
    </div>
  );
}

export default App;
