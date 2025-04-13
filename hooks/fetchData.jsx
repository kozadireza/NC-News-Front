import { useEffect, useState } from "react";
import { getArticles } from "../Utils/data.fetching";

function useDataApi(filterAndSortParams) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(false);

  const { topic, order, sort_by } = filterAndSortParams;
  useEffect(() => {
    async function fetchData() {
      setIsError(false);
      setIsLoading(true);
      try {
        const data = await getArticles(filterAndSortParams);
        setData(data);
      } catch (err) {
        setIsError(true);
        return err;
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [topic, order, sort_by]);

  return { data, isLoading, isError };
}
export default useDataApi;
