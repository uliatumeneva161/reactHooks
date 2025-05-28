import { useState } from 'react';
import './App.css';
import UseReducer1 from './components/UseReducer1';
import UseReducer2 from './components/UseReducer2';
import UseContext from './components/UseContext';

function App() {
  const [currentPage, setCurrentPage] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setOpenMenu(null);
  };

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const menuItems = {
    reduce: [
      { id: 'useReducer1', label: 'Корзина товаров' },
      { id: 'useReducer2', label: 'Форма регистрации' }
    ],
    context: [
      { id: 'useContext', label: 'Пример использования' }
    ]
  };

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="nav-container">
          {/* Меню для useReduce */}
          <div className="menu-group">
            <button 
              className="menu-toggle"
              onClick={() => toggleMenu('reduce')}
              aria-expanded={openMenu === 'reduce'}
            >
              useReduce
            </button>
            {openMenu === 'reduce' && (
              <div className="dropdown-menu">
                {menuItems.reduce.map(item => (
                  <button
                    key={item.id}
                    className="nav-link"
                    onClick={() => handlePageChange(item.id)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Меню для useContext */}
          <div className="menu-group">
            <button 
              className="menu-toggle"
              onClick={() => toggleMenu('context')}
              aria-expanded={openMenu === 'context'}
            >
              useContext
            </button>
            {openMenu === 'context' && (
              <div className="dropdown-menu">
                {menuItems.context.map(item => (
                  <button
                    key={item.id}
                    className="nav-link"
                    onClick={() => handlePageChange(item.id)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </nav>

      <main className="content">
        {currentPage === 'useReducer1' && <UseReducer1 />}
        {currentPage === 'useReducer2' && <UseReducer2 />}
        {currentPage === 'useContext' && <UseContext />}
      </main>
    </div>
  );
}

export default App;