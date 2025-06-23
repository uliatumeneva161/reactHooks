import React, { useState, useEffect } from 'react';

export default function DataFetcher() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.example.com/data');
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
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : 'Данные не получены'}
    </div>
  );
}