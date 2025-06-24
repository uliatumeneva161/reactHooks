import React, { useState, useEffect } from 'react';

const MyPromise = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Функция, возвращающая промис
  const fetchData = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const success = Math.random() > 0.3; // Симуляция успеха или ошибки

        if (success) {
          resolve({ message: "Данные успешно загружены!", time: new Date().toLocaleTimeString() });
        } else {
          reject("Ошибка загрузки данных");
        }
      }, 1500); // имитация задержки сети
    });
  };

  useEffect(() => {
    fetchData()
      .then((responseData) => {
        setData(responseData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <div>
      <h2>Результат:</h2>
      <p>{data.message}</p>
      <p>Время: {data.time}</p>
    </div>
  );
};

export default MyPromise;