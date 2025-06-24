import React, { useState, useEffect } from 'react';

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
          reject({ sms: "Reject UnSuccess"})
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
      <h2>Результат:</h2>
      <p>{data.sms}</p>
    </div>
  );
};

export default MyPromise;