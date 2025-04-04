import ArticleCard from "./Article Card";
import useDataApi from "../hooks/fetchData";
import { useParams } from "react-router-dom";

import SortingAndFilteringBar from "./SortingFilteringBar";
import ErrorPage from "./ErrorPage";

function ArticlesByTopicPage({ filterAndSortParams, setFilterAndSortParams }) {
  const topic = useParams().topic;

  const {
    data: articles,
    isLoading,
    isError,
  } = useDataApi({ ...filterAndSortParams, topic });

  if (isLoading) {
    return <h1>Articles is loading....</h1>;
  }

  if (isError) {
    return <ErrorPage />;
  }

  return (
    <main className="ArticlesBlock">
      <SortingAndFilteringBar
        setFilterAndSortParams={setFilterAndSortParams}
        filterAndSortParams={filterAndSortParams}
      />
      {articles.map((article) => {
        return <ArticleCard key={article.article_id} article={article} />;
      })}
    </main>
  );
}
export default ArticlesByTopicPage;
