import functions from "../Utils/data.fetching";

import ArticleCard from "./Article Card";
import useDataApi from "../hooks/fetchData";

function HomePage({ selectedTopic, setSelectedTopic }) {
  const argsFotDataApi =
    selectedTopic === null
      ? [functions.getArticles, null]
      : [functions.getArticlesByTopic, selectedTopic];

  const { data: articles, isLoading, isError } = useDataApi(...argsFotDataApi);

  if (isLoading) {
    return <h1>Articles is loading....</h1>;
  }

  if (isError) {
    return <h1>Something went wrong!</h1>;
  }
  return (
    <main className="ArticlesBlock">
      {articles.map((article) => {
        return (
          <ArticleCard
            key={article.article_id}
            article={article}
            setSelectedTopic={setSelectedTopic}
          />
        );
      })}
    </main>
  );
}
export default HomePage;
