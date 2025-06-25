import React, { useState, useEffect } from 'react';
import Description from './Description';

const MyPromise = () => {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [err, setErr] = useState(null)
  
  const fetchData = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const statusData = Math.random() > 0.3
        if (statusData) {
          resolve({ sms: "Resolve Success"})
        } else {
          reject("Reject UnSuccess")
        }
      })
    }, 500)
  }
  
  useEffect(() => { 
    fetchData()
      .then((dataFD)=> { 
        setIsLoading(false);
        setData(dataFD);
      })
      .catch(err => { 
        setErr(err);
        setIsLoading(false);
      })
  }, [])
  if (isLoading) return <div>Загрузка...</div>;
  if (err) return <div>Ошибка: {err}</div>;

  return (
    <div>
      <Description children='Промис (Promise) — специальный 
      объект JavaScript, который
       используется для написания и обработки
        асинхронного кода.
Асинхронные функции возвращают объект Promise в качестве значения. Внутри промиса хранится результат
 вычисления, которое может быть уже выполнено или выполнится в будущем.
Промис может находиться в одном из трёх состояний:
pending — стартовое состояние, операция стартовала;
fulfilled — получен результат;
rejected — ошибка.'/>
      <h2>Результат:</h2>
      <p>{data.sms}</p>
    </div>
  );
};

export default MyPromise;