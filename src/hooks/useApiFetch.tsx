import { useEffect, useState } from "react";
import axios from "axios";
import type { Method } from "axios";
import { toast } from "react-toastify";
import { useLoading } from "../services/Loading";

//hook spécifique
export function useLibrarieFetch<T = any>(
  endpoint: string,
  method: Method = "GET",
  body: any = null
) {
  return useApiFetch<T>("https://openlibrary.org", endpoint, method, body);
}

export function useWikiFetch<T = any>(
  endpoint: string,
  method: Method = "GET",
  body: any = null
) {
  return useApiFetch<T>("https://en.wikipedia.org/api/rest_v1/page/summary/", endpoint, method, body);
}

//hook principale
export function useApiFetch<T = any>(
  baseUrl: string,
  endpoint: string,
  method: Method = "GET",
  body: any = null
) {
  const [data, setData] = useState<T | null>(null);
  const { setLoading } = useLoading();

  useEffect(() => {
    if (!endpoint || endpoint.trim() === "") return;
    let isMounted = true;
    setLoading(true);

    axios({
      method,
      url: `${baseUrl}${endpoint}`,
      data: body,
    })
      .then((res) => {
        if (isMounted) setData(res.data);
      })
      .catch((err) => {
        toast.error(`Erreur API : ${err.message}`, {
          position: "top-right",
          autoClose: 4000,
        });
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [baseUrl, endpoint, method, body, setLoading]);

  return { data };
}
