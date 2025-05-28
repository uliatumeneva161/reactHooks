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
    <div className="app-container">
      <nav className="fixed-navbar">
        <div className="bl">
          <b>useReduce</b>
          <a 
            className="nav-link" 
            onClick={() => nextPage('useReducer1')}
          >
            Корзина товаров
          </a>
          <a 
            className="nav-link" 
            onClick={() => nextPage('useReducer2')}
          >
            Форма регистрации
          </a>
        </div>
      </nav>

      <div className="content">
        {currentPage === 'useReducer1' && <UseReducer1 />}
        {currentPage === 'useReducer2' && <UseReducer2 />}
      </div>
    </div>
  );
}

export default App;