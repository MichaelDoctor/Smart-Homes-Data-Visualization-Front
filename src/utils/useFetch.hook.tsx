import React, { useState, useEffect } from 'react';
import { dataReturn, devIdReturn, serialNumReturn } from './apiReturnTypes';

interface ReturnType {
    loading: boolean;
    error: unknown | null;
}

const useFetch = (
  url: string,
  setData: React.Dispatch<
    React.SetStateAction<dataReturn | devIdReturn | serialNumReturn | null>
  >,
): ReturnType => {
  const [error, setError] = useState<unknown | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(url);
        const resJson = await res.json();
        setData(resJson);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [url, setData]);
  return { loading, error };
};
export default useFetch;
