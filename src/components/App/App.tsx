import React, { useEffect, useState } from 'react';
import './App.css';
import AppHeader from '../AppHeader/AppHeader';
import Main from '../Main/Main';
import { apiURL } from '../../utils/const';
import Modal from '../Modal/Modal';

function App() {
  const [data, setData] = useState([]);
  const [modalIsOpen, setModalIsOpen] = React.useState(true);
  const [modalChild, setModalChild] = React.useState('');

  function onModalClose() {
    setModalIsOpen(false);
  }
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
      <Main data={data} />
      {modalIsOpen && 
        <Modal onClose={onModalClose}>{modalChild}</Modal>}
    </div>
  );
}

export default App;
