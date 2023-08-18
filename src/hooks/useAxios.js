import { useState, useEffect } from 'react';
import { $host } from '../http';

const useAxios = url => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  console.log('asd');

  const fetchData = async () => {
    await $host
      .get(url)
      .then(res => {
        console.log(res);
        setResponse(res.data);
      })
      .catch(err => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    console.log(response);
    fetchData();
  }, []);

  // custom hook returns value
  return { response, error, loading };
};

export default useAxios;
