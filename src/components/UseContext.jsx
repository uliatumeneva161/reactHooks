import React, { createContext, useContext, useState } from 'react';

// 1. Создаём контекст для темы (выносим за пределы компонента)
const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
});

// 2. Создаём компонент-провайдер (выносим за пределы компонента)
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Создаём кастомный хук для удобства (выносим за пределы компонента)
export function useTheme() {
  return useContext(ThemeContext);
}

// 4. Компонент кнопки переключения темы (выносим за пределы компонента)
export function ThemeToggle() {
  const { toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      Переключить тему
    </button>
  );
}

// 5. Компонент, который использует тему (выносим за пределы компонента)
export function ThemedBox() {
  const { theme } = useTheme();

  const styles = {
    padding: '20px',
    margin: '10px 0',
    borderRadius: '8px',
    backgroundColor: theme === 'light' ? '#f5f5f5' : '#333',
    color: theme === 'light' ? '#333' : '#fff',
    transition: 'all 0.3s ease',
  };

  return (
    <div style={styles}>
      Текущая тема: {theme}
    </div>
  );
}

// Основной компонент UseContext
function UseContext() {
  return (
    <ThemeProvider>
      <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
        <h1>Пример использования useContext</h1>
        <ThemeToggle />
        <ThemedBox />
        <p>Попробуйте переключить тему!</p>
      </div>
    </ThemeProvider>
  );
}

export default UseContext;