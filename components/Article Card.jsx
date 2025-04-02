import { Link, useNavigate } from "react-router-dom";

function ArticleCard({ article }) {
  const navigate = useNavigate();
  const handleButtonReadMore = () => {
    navigate(`/articles/${article.article_id}`);
  };
  return (
    <article className="articleCard">
      <Link to={`/articles/${article.article_id}`}>
        <h2>{article.title}</h2>

        <img src={article.article_img_url} alt="image for article" />
      </Link>
      <div>
        <h5>Topic: {<a href="">{article.topic}</a>}</h5>

        <h5>
          Author: <a>{article.author}</a>{" "}
        </h5>
        <button onClick={handleButtonReadMore}>Read article</button>
      </div>
    </article>
  );
}
export default ArticleCard;
