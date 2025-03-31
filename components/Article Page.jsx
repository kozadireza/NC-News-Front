import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import functions from "../Utils/data.fetching";

function ArticlePage() {
  const [article, setArticle] = useState([]);
  const article_id = useParams().article;

  useEffect(() => {
    async function fetchArticleById(article_id) {
      console.log(article_id);
      const article = await functions.getArticleById(article_id);
      setArticle(article);
      return article;
    }
    fetchArticleById(article_id);
  }, []);

  return (
    <article className="articleCard">
      <h2>{article.title}</h2>
      <img src={article.article_img_url} alt="image for article" />
      <div>
        <h5>Topic: {<a>{article.topic}</a>}</h5>

        <h5>
          Author: <a>{article.author}</a>{" "}
        </h5>
        <p>{article.body}</p>
      </div>
    </article>
  );
}
export default ArticlePage;
