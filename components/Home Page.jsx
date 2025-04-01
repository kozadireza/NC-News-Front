import { useEffect, useState } from "react";
import functions from "../Utils/data.fetching";

import ArticleCard from "./Article Card";
import useDataApi from "../hooks/fetchData";
function HomePage() {
  const {
    data: articles,
    isLoading,
    isError,
  } = useDataApi(functions.getArticles);

  if (isLoading) {
    return <h1>Articles is loading....</h1>;
  }

  if (isError) {
    return <h1>Something went wrong!</h1>;
  }
  return (
    <main className="ArticlesBlock">
      {articles.map((article) => {
        return <ArticleCard key={article.article_id} article={article} />;
      })}
    </main>
  );
}
export default HomePage;
