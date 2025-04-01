import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import functions from "../Utils/data.fetching";
import Comment from "./Comment";
import useDataApi from "../hooks/fetchData.jsx";

function ArticlePage() {
  const [showComments, setShowComments] = useState(false);

  const article_id = useParams().article;
  const {
    data: comments,
    isLoading: commentsLoading,
    isError: commentsError,
    fetchData: fetchCommentsForArticle,
  } = useDataApi(functions.getComments, article_id);

  const {
    data: article,
    isLoading,
    isError,
  } = useDataApi(functions.getArticleById, article_id);

  function handleComments(event) {
    event.preventDefault();

    if (!showComments && !comments) {
      fetchCommentsForArticle(article_id);
    }
    setShowComments(!showComments);
  }

  const [totalVotes, setTotalVotes] = useState(0);

  useEffect(() => {
    if (article.votes !== undefined) {
      setTotalVotes(article.votes);
    }
  }, [article.votes]);

  async function handle1Vote() {
    try {
      setTotalVotes((prev) => prev + 1);
      await functions.patchArticleById(article_id, {
        inc_votes: 1,
      });
    } catch (err) {
      alert(err);
      setTotalVotes((prev) => prev - 1);
    }
  }

  if (isLoading) {
    return <h1>Articles is loading....</h1>;
  }
  if (isError) {
    return <h1>Error</h1>;
  }
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
          <h5 className="navElements">
            Author: <a>{article.author}</a>{" "}
          </h5>
          <h5 onClick={handleComments} className="navElements">
            <a href="">Comments</a>
          </h5>
          <h5 className="navElements">
            Votes: <a>{totalVotes}</a>{" "}
          </h5>
          <button onClick={handle1Vote} className="navElements" id="likeButton">
            +1 Vote
          </button>
        </div>
      </div>
      <div id="article_body">
        <p> {article.body}</p>
      </div>
      <div>
        {commentsLoading ? <p> Comments is Loading...</p> : null}
        {commentsError ? <p>Something went wrong!</p> : null}
        {comments.length > 0 && showComments ? (
          <ul>
            {comments.map((comment) => {
              return (
                <li key={comment.comment_id}>
                  <Comment comment={comment} />
                </li>
              );
            })}
          </ul>
        ) : comments.length === 0 && showComments ? (
          <p>No comments found!</p>
        ) : null}
      </div>
    </main>
  );
}

export default ArticlePage;
