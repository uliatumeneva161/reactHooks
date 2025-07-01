import React, { useState, useEffect } from 'react';
import Description from './Description';

export default function UseEffect2() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Используем открытый API без ограничений
        const response = await fetch('https://petstore.swagger.io/v2/store/inventory');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        const formattedData = JSON.stringify(result, null, 2);
        setData(formattedData);
      } catch (err) {
        console.error('Ошибка загрузки:', err);
        setError(`Ошибка: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {loading && <div>Загрузка...</div>}
      
      <Description>
        useEffect здесь используется для выполнения побочного эффекта (загрузки данных с API)
        только один раз при монтировании компонента.
      </Description>
      
      {error && <div style={{ color: 'red' }}>{error}</div>}
      
      {!loading && !error && data ? (
        <pre>{data}</pre>
      ) : (
        !loading && !error && <div>Данные не получены</div>
      )}
    </div>
  );
}