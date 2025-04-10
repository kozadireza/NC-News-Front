import useDataApi from "../hooks/fetchData";

import SortingAndFilteringBar from "./SortingFilteringBar";
import TopicsBar from "./TopicsBar";
import ArticlePreview from "./ArticlePreview";

function HomePage({ filterAndSortParams, setFilterAndSortParams }) {
  const {
    data: articles,
    isLoading,
    isError,
  } = useDataApi({ ...filterAndSortParams });

  if (isLoading) {
    return <h1>Articles is loading....</h1>;
  }

  if (isError) {
    return <h1>Something went wrong!</h1>;
  }
  return (
    <main style={{ width: "100%", gap: "7%" }}>
      <TopicsBar />

      <div className="articlesAndSortingBar">
        <SortingAndFilteringBar
          setFilterAndSortParams={setFilterAndSortParams}
          filterAndSortParams={filterAndSortParams}
        />
        <div className="articlesList" style={{ paddingLeft: "5%" }}>
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
export default HomePage;
