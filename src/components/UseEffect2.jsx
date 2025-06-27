import React, { useState, useEffect } from 'react';
import Description from './Description';
export default function UseEffect2() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const otvet = await fetch('https://api.github.com/users')
        const preobrOtv = await otvet.json()
        const formatedData = JSON.stringify(preobrOtv,0, 2)
        setData(formatedData)
      } catch (e) {
        console.log(e)
      } finally {
        setLoading(false)
      }
    } // Пустой массив = только при монтировании
  fetchData()
  ,[]})
  // if (loading) return <div>Загрузка...</div>;
  
  return (
    <div>
      {loading && <div>Загрузка...</div>}
      <Description children='useEffect здесь используется для выполнения 
      побочного эффекта (загрузки данных с API) только один раз при монтировании
       компонента, что обеспечивается пустым массивом зависимостей [] во втором
       аргументе, при этом внутри эффекта объявляется и вызывается асинхронная
       функция fetchData, которая: Устанавливает состояние загрузки (setLoading(true) неявно через начальное
        значение) Выполняет запрос к GitHub API Обновляет состояние данными (setData)
        Снимает флаг загрузки в finally блоке (гарантированно даже при ошибке)
        Возвращает разметку с условиями: индикатор загрузки или отображение данных.'/>
      {data ? <pre>{data }</pre> : 'Данные не получены'}
    </div>
  );
}