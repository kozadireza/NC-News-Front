import { Link, useNavigate } from "react-router-dom";

function ArticleCard({ article }) {
  const navigate = useNavigate();
  const handleButtonReadMore = () => {
    navigate(`/articles/${article.article_id}`);
  };

  return (
    <article className="articleCard">
      <h5>
        Author: <a>{article.author}</a>{" "}
      </h5>
      <Link to={`/articles/${article.article_id}`}>
        <h2>{article.title}</h2>

        <img src={article.article_img_url} alt="image for article" />
      </Link>
      <div>
        <h5>Topic: {article.topic}</h5>

        <h5>
          Votes: <a>{article.votes}</a>{" "}
        </h5>
        <h5>
          Comments: <a>{article.article_comments}</a>{" "}
        </h5>
        <button onClick={handleButtonReadMore}>Read article</button>
      </div>
    </article>
  );
}
export default ArticleCard;
