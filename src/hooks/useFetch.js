import { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null);

  const [config, setConfig] = useState(null);
  const [method, setMethod] = useState(null);

  const [callFetch, setCallFetch] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const httpConfig = (data, method) => {
    if (method === "POST") {
      setConfig({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      setMethod(method);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(url);

        if (!res.ok) {
          throw new Error("Erro ao carregar os dados");
        }

        const json = await res.json();

        setData(json);
      } catch (error) {
        console.log(error.message);
        setError("Houve algum erro ao carregar os dados.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, callFetch]);

  useEffect(() => {
    const httpRequest = async () => {
      if (method === "POST" && config) {
        try {
          const res = await fetch(url, config);

          if (!res.ok) {
            throw new Error("Erro ao enviar os dados");
          }

          const json = await res.json();

          setCallFetch(json);
        } catch (error) {
          console.log(error.message);
          setError("Houve algum erro ao enviar os dados.");
        }
      }
    };

    httpRequest();
  }, [config, method, url]);

  return { data, httpConfig, loading, error };
};
