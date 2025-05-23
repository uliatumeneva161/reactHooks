import { useState } from 'react';
import './App.css';
import UseReducer1 from './components/UseReducer1';
import UseReducer2 from './components/UseReducer2';
function App() {
  const [currentPage, setCurrentPage] = useState(null); 

  function nextPage(namePage) {
    setCurrentPage(namePage);
  }

  return (
    <div>
      <nav>
         <p>Учебные примеры по хукам жизненного цикла в React</p>
      </nav>
      {/* <select value='UseReducer'>
        <option value=""><a onClick={() => nextPage('useReducer1')}>Корзина товаров</a></option>
        <option value=""><a onClick={() => nextPage('useReducer2')}>Форма регистрации</a></option>
      </select> */}
      <div className='bl'>
        <b>useReduce</b>
         <a onClick={() => nextPage('useReducer1')}>Корзина товаров</a>
          <a onClick={() => nextPage('useReducer2')}>Форма регистрации</a>
      </div>
     
      {currentPage === 'useReducer1' && <UseReducer1 />}
      {currentPage === 'useReducer2' && <UseReducer2 />}
    </div>
  );
}

export default App;