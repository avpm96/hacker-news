import { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(url);
        if (!res.ok) {
          let err = new Error("error en la peticion fetch");
          err.status = res.status || "00";
          err.statusText = res.statusText || "ocurrio un error";
          throw err;
        }
        const json = await res.json();
      } catch (error) {}
    };
    fetchData();
    return () => abortController.abort();
  });
  return { data, error, loading };
};
