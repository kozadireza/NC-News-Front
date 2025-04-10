import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserByName } from "../Utils/data.fetching";
import { convertData } from "../Utils/other";

function ArticlePreview({ article }) {
  const [user, setUser] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    const getUserData = async (author) => {
      const user = await getUserByName(author);
      setUser(user);
    };
    getUserData(article.author);
  }, []);
  console.log(user.avatar_url);
  return (
    <div className="fullArticlePreview">
      <div className="AuthorAndDateLine">
        <div
          style={{
            backgroundImage: `url(${user.avatar_url})`,
            height: "30px",
            width: "30px",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        ></div>
        <h5>{article.author} </h5>
        <h6 style={{ paddingLeft: "5px" }}>
          {" "}
          {convertData(article.created_at)}
        </h6>
      </div>
      <div
        onClick={() => navigate(`/articles/${article.article_id}`)}
        className="articlePreviewContainer"
        key={article.article_id}
      >
        <div
          className="imgPreview"
          style={{ backgroundImage: `url (${article.article_img_url})` }}
        >
          <img src={article.article_img_url} alt="image for article" />
        </div>

        <div className="container-title-infoBar">
          <div className="titlePreview-Container">
            <h3 className="titlePreview">{article.title}</h3>
          </div>
          <div className="navArticle">
            <h5
              className="navElements"
              style={{
                display: "flex",
                alignContent: "flex-end",
                alignItems: "center",
              }}
            >
              Topic: <a href={`/topics/${article.topic}`}>{article.topic}</a>
            </h5>
            <h5>Votes: {article.votes}</h5>
            <h5>Comments: {article.article_comments}</h5>
            <button
              style={{
                height: "fit-content",
                display: "flex",
                alignContent: "flex-end",
                top: "19px",
                position: "relative",
              }}
              onClick={() => navigate(`/articles/${article.article_id}`)}
            >
              Read article
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ArticlePreview;
