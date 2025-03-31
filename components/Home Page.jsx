import { useEffect, useState } from "react";
import functions from "../Utils/data.fetching";

import ArticleCard from "./Article Card";
function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    async function getAllArticles() {
      const articles = await functions.getArticles();
      console.log(articles);
      setArticles([...articles]);
      setIsLoading(false);
    }
    getAllArticles();
  }, []);
  if (isLoading) {
    return <h1>Articles is loading....</h1>;
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
