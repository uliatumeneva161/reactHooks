import React, { useState, useEffect } from 'react';

const ClickCounter = () => {
  const [count, setCount] = useState(0);

  // Восстановление значения из localStorage при монтировании компонента
  useEffect(() => {
    const savedCount = localStorage.getItem('clickCount');
    if (savedCount !== null) {
      setCount(parseInt(savedCount, 10));
    }
  }, []); // Пустой массив зависимостей — эффект выполнится только один раз после монтирования

  // Сохранение значения в localStorage при каждом изменении count
  useEffect(() => {
    localStorage.setItem('clickCount', count);
  }, [count]); // Эффект будет вызван при изменении count

  return (
    <div style={{ padding: '20px' }}>
      <h1>Счётчик кликов: {count}</h1>
      <button onClick={() => setCount(prevCount => prevCount + 1)}>Нажми меня</button>
    </div>
  );
};

export default ClickCounter;