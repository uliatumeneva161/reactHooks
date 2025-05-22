import { useState } from 'react';
import './App.css';
import UseReducer from './components/UseReducer';

function App() {
  const [currentPage, setCurrentPage] = useState(null); 

  function nextPage(namePage) {
    setCurrentPage(namePage);
  }

  return (
    <div>
      <p>Учебные примеры по хукам жизненного цикла в React</p>
      <button onClick={() => nextPage('useReducer')}>UseReducer</button>
      
      {currentPage === 'useReducer' && <UseReducer />}
    </div>
  );
}

export default App;