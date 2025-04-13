import ArticleCard from "./ArticleCard";
import useDataApi from "../hooks/fetchData";
import { useParams } from "react-router-dom";

import SortingAndFilteringBar from "./SortingFilteringBar";
import ErrorPage from "./ErrorPage";
import TopicsBar from "./TopicsBar";
import ArticlePreview from "./ArticlePreview";

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
    <main style={{ width: "100%" }}>
      <TopicsBar />

      <div className="ArticlesBlock" style={{ width: "80%" }}>
        <div
          className="SortingAndFilteringBar"
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <SortingAndFilteringBar
            setFilterAndSortParams={setFilterAndSortParams}
            filterAndSortParams={filterAndSortParams}
          />
        </div>
        <div className="articlesBlock">
          {articles.map((article) => {
            return (
              <ArticlePreview key={article.article_id} article={article} />
            );
          })}
        </div>
      </div>
    </main>
  );
}
export default ArticlesByTopicPage;
