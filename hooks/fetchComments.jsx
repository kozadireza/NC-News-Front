import { useEffect, useState } from "react";
import { getComments } from "../Utils/data.fetching";

function useFetchComments(articleID) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsError(false);
      setIsLoading(true);
      try {
        const data = await getComments(articleID);
        setData(data);
      } catch (err) {
        setIsError(true);
        return err;
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [articleID]);

  return { data, isLoading, isError };
}
export default useFetchComments;
