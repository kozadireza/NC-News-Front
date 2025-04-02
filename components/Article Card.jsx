import { Link, useNavigate } from "react-router-dom";

function ArticleCard({ article, setSelectedTopic }) {
  const navigate = useNavigate();
  const handleButtonReadMore = () => {
    navigate(`/articles/${article.article_id}`);
  };

  function handleTopic() {
    setSelectedTopic(article.topic);
  }
  return (
    <article className="articleCard">
      <Link to={`/articles/${article.article_id}`}>
        <h2>{article.title}</h2>

        <img src={article.article_img_url} alt="image for article" />
      </Link>
      <div>
        <h5>
          Topic: {<button onClick={handleTopic}> {article.topic}</button>}
        </h5>

        <h5>
          Author: <a>{article.author}</a>{" "}
        </h5>
        <button onClick={handleButtonReadMore}>Read article</button>
      </div>
    </article>
  );
}
export default ArticleCard;
