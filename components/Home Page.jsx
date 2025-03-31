import { useEffect, useState } from "react";
import functions from "../Utils/data.fetching";

import ArticleCard from "./Article Card";
function HomePage() {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    async function getAllArticles() {
      const articles = await functions.getArticles();
      console.log(articles);
      setArticles([...articles]);
    }
    getAllArticles();
  }, []);
  return (
    <main className="ArticlesBlock">
      {articles.map((article) => {
        return <ArticleCard key={article.article_id} article={article} />;
      })}
    </main>
  );
}
export default HomePage;
