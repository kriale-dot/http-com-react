import { useState, useEffect } from "react";

export const useFetch = (url) => {

    const [data, setData] = useState(null);

    // Configuração do POST
    const [config, setConfig] = useState(null);
    const [method, setMethod] = useState(null);

    // Força atualização dos dados
    const [callFetch, setCallFetch] = useState(false);

    // 6 - loading
    const [loading, setLoading] = useState(false)

    // Configuração das requisições
    const httpConfig = (data, method) => {

        if (method === "POST") {

            setConfig({
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            setMethod(method);
        }

    };

    // Busca os dados
    useEffect(() => {

        const fetchData = async () => {

            setLoading(true)
            const res = await fetch(url);

            const json = await res.json();

            setData(json);
            setLoading(true)

        };

        fetchData();

    }, [url, callFetch, loading]);

    // Executa POST
    useEffect(() => {

        const httpRequest = async () => {

            if (method === "POST" && config) {

                const res = await fetch(url, config);

                const json = await res.json();

                setCallFetch(json);

            }

        };

        httpRequest();

    }, [config, method, url]);

    return { data, httpConfig };

};
