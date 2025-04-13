import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserByName } from "../Utils/data.fetching";
import { convertDate } from "../Utils/other";

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

  return (
    <div className="fullArticlePreview" alt="article preview">
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
          alt={article.title}
        ></div>
        <h5>{article.author} </h5>
        <h6 style={{ paddingLeft: "5px" }}>
          {" "}
          {convertDate(article.created_at)}
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
            <h3
              className="titlePreview"
              style={{ marginTop: "0px", marginBottom: "0px" }}
            >
              {article.title}
            </h3>
          </div>
          <div className="navArticle">
            <h5
              className="navElements"
              style={{
                display: "flex",
                alignContent: "flex-end",
                alignItems: "center",
                marginTop: "0px",
                marginBottom: "0px",
              }}
            >
              Topic: <a href={`/topics/${article.topic}`}>{article.topic}</a>
            </h5>
            <h5 style={{ marginTop: "0px", marginBottom: "0px" }}>
              Votes: {article.votes}
            </h5>
            <h5 style={{ marginTop: "0px", marginBottom: "0px" }}>
              Comments: {article.article_comments}
            </h5>
            <button
              style={{
                height: "fit-content",
                display: "flex",
                alignContent: "flex-end",

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
