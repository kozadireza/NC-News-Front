import { useContext, useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getArticleById, patchArticleById } from "../Utils/data.fetching";

import ErrorPage from "./ErrorPage";
import { UserDataContext } from "../COntexts/UserDataContext";
import CommentsList from "./CommentsList";
import TopicsBar from "./TopicsBar";

function ArticlePage() {
  const [article, setArticle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [totalVotes, setTotalVotes] = useState(0);

  const { user } = useContext(UserDataContext);
  const { article_id } = useParams();
  console.log(user);
  const votedArticles = useMemo(() => {
    console.log(JSON.parse(localStorage.getItem("votedArticles")));
    return new Set([
      ...JSON.parse(localStorage.getItem("votedArticles") || '""'),
    ]);
  }, []);

  useEffect(() => {
    async function getArticle() {
      try {
        setIsLoading(true);
        setIsError(false);
        const article = await getArticleById(article_id);

        setArticle(article);
        setTotalVotes(article.votes);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getArticle(article_id);
    if (user === "unauthorised") {
      setHasVoted(false);
    } else {
      setHasVoted(votedArticles.has(article_id));
    }
  }, []);

  async function handle1Vote() {
    if (user === "unauthorised") {
      alert("You need to log in to vote!");
      return;
    }

    try {
      const increment = hasVoted ? -1 : 1;

      await patchArticleById(article_id, { inc_votes: increment });
      if (hasVoted) {
        votedArticles.delete(article_id);
      } else {
        votedArticles.add(article_id);
      }
      setTotalVotes((prev) => prev + increment);
      setHasVoted(!hasVoted);
      localStorage.setItem("votedArticles", JSON.stringify([...votedArticles]));
    } catch {
      alert("Voting failed");
    }
  }
  console.log(votedArticles);
  if (isLoading) {
    return <h1>Article is loading....</h1>;
  }
  if (isError) {
    return <ErrorPage />;
  }
  return (
    <main style={{ gap: "1%", paddingRight: "10%", paddingLeft: "10%" }}>
      <TopicsBar />
      <div className="articlePage-body">
        <div className="gallery">
          <h5 className="navElements">Author: {article.author}</h5>
          <div className="articleCard">
            <h2>{article.title}</h2>

            <img
              src={article.article_img_url}
              alt="image for article"
              style={{ borderRadius: "45px" }}
            />
          </div>
          <div id="navArticle">
            <h5 className="navElements">
              Topic:
              <Link to={`/articles?topic=${article.topic}`}>
                {article.topic}
              </Link>
            </h5>

            <h5 className="navElements">Votes: {totalVotes}</h5>
            <h5
              style={{
                display: "flex",
                position: "relative",
                fontFamily: "Courier New, Courier, monospace",
                fontSize: "x-large",
              }}
            >
              Comments: {article.comment_count}
            </h5>
            <button onClick={handle1Vote} id="likeButton">
              {hasVoted ? "Remove Vote" : "+1 Vote"}
            </button>
          </div>
        </div>
        <div id="article_body">
          <p> {article.body}</p>
        </div>
        <CommentsList article_id={article_id} />
      </div>
    </main>
  );
}

export default ArticlePage;
