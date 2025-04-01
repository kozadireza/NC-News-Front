import { useEffect, useState } from "react";

function useDataApi(fetchFunction, ...args) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsError(false);
      setIsLoading(true);
      try {
        const data = await fetchFunction(...args);
        setData(data);
      } catch (err) {
        console.log(err);
        setIsError(true);
        return err;
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [...args]);
  return { data, isLoading, isError };
}
export default useDataApi;
