// Custom Hook to fetch the data
import { useState, useEffect } from 'react';

export const useFetch = (url) => {
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState([]);

  const getItems = async () => {
    const response = await fetch(url);
    const item = await response.json();
    setItem(item);
    setLoading(false);
  };

  useEffect(() => {
    getItems();
  }, [url]);
  return { loading, item, getItems };
};
