import React, { useState, useEffect } from 'react';
import Description from './Description';
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
      <Description>
        <p>
           <b>useEffect</b> используется для синхронизации состояния компонента с внешними системами
        </p>
        <h4>Как работает useEffect в этом компоненте:</h4>
        <p>
          <strong>Первый useEffect</strong> (с пустым массивом []) выполняется один раз при монтировании компонента. 
          Он восстанавливает значение счётчика из localStorage.
        </p>
        <p>
          <strong>Второй useEffect</strong> (с зависимостью [count]) срабатывает при каждом изменении count. 
          Он сохраняет текущее значение счётчика в localStorage.
        </p>
        
      </Description>
    </div>
    
  );
};

export default ClickCounter;