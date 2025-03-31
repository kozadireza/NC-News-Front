import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import functions from "../Utils/data.fetching";
import Comment from "./Comment";

function ArticlePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [article, setArticle] = useState([]);
  const [comments, setComments] = useState(null);
  const article_id = useParams().article;
  function handleComments(event) {
    event.preventDefault();
    async function fetchComments(article_id) {
      const comments = await functions.getComments(article_id);
      setComments(comments);
    }
    fetchComments(article_id);
  }
  console.log(comments);
  useEffect(() => {
    async function fetchArticleById(article_id) {
      const article = await functions.getArticleById(article_id);
      setArticle(article);
      return article;
    }
    fetchArticleById(article_id);
    setIsLoading(false);
  }, [article_id]);
  if (isLoading) {
    return <h1>Articles is loading....</h1>;
  } else {
    return (
      <main>
        <div className="gallery">
          <div className="articleCard">
            <h2>{article.title}</h2>
            <a target="_blank" href={article.article_img_url}>
              <img src={article.article_img_url} alt="image for article" />
            </a>
          </div>
          <div id="navArticle">
            <h5 className="navElements">
              Topic: <a>{article.topic}</a>
            </h5>
            <h5 className="navElements">
              Author: <a>{article.author}</a>{" "}
            </h5>
            <h5 onClick={handleComments} className="navElements">
              <a href="">Comments</a>
            </h5>
          </div>
        </div>
        <div id="article_body">
          <p> {article.body}</p>
        </div>
        <div>
          {comments !== null ? (
            <ul>
              {comments.map((comment) => {
                return (
                  <li>
                    <Comment key={comment.article_id} comment={comment} />
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>
      </main>
    );
  }
}
export default ArticlePage;
