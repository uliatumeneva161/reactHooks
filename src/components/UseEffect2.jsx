import React, { useState, useEffect } from 'react';
import Description from './Description';
export default function UseEffect2() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.github.com/users');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Ошибка загрузки:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Пустой массив = только при монтировании

  if (loading) return <div>Загрузка...</div>;
  
  return (
    <div>
      <Description children='useEffect здесь используется для выполнения 
      побочного эффекта (загрузки данных с API) только один раз при монтировании
       компонента, что обеспечивается пустым массивом зависимостей [] во втором
       аргументе, при этом внутри эффекта объявляется и вызывается асинхронная
       функция fetchData, которая: Устанавливает состояние загрузки (setLoading(true) неявно через начальное
        значение) Выполняет запрос к GitHub API Обновляет состояние данными (setData)
        Снимает флаг загрузки в finally блоке (гарантированно даже при ошибке)
        Возвращает разметку с условиями: индикатор загрузки или отображение данных.'/>
      {data ? <pre>{JSON.stringify(data, 0, 2)}</pre> : 'Данные не получены'}
    </div>
  );
}