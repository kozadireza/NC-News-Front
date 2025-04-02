import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import functions from "../Utils/data.fetching";
import Comment from "./Comment";
import useDataApi from "../hooks/fetchData.jsx";

function ArticlePage() {
  const [showComments, setShowComments] = useState(false);
  const [localComments, setLocalComments] = useState([]);
  //Article
  const article_id = useParams().article;

  const {
    data: article,
    isLoading,
    isError,
  } = useDataApi(functions.getArticleById, article_id);

  //Comments
  const {
    data: comments,
    isLoading: commentsLoading,
    isError: commentsError,
    fetchData: fetchCommentsForArticle,
  } = useDataApi(functions.getComments, article_id);

  function handleComments(event) {
    event.preventDefault();

    if (!showComments && !comments) {
      fetchCommentsForArticle(article_id);
    }
    setShowComments(!showComments);
  }
  ////Votes
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

  ///hide/open the form
  const [addNewCommentButton, setAddNewCommentButton] = useState(false);

  function handleInputForComment() {
    setAddNewCommentButton(!addNewCommentButton);
  }

  //getting data from input
  const [dataOfComment, setDataOfComment] = useState(null);
  const [isCommentPosting, setIsCommentPosting] = useState(false);
  const [checkInput, setCheckInput] = useState(true);

  function handleInputs(event) {
    const regex = /^(?=[a-zA-Z0-9_]{3,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    if (
      !regex.test(event.target.value) &&
      event.target.name === "author" &&
      event.target.value.length !== 0
    ) {
      setCheckInput(false);
    } else {
      setCheckInput(true);
      const { name, value } = event.target;
      setDataOfComment((prev) => ({ ...prev, [name]: value }));
    }
  }
  /// form submitting
  async function handleNewComment(event) {
    event.preventDefault();

    if (Object.values(dataOfComment).length >= 2) {
      setIsCommentPosting(true);
      try {
        const newComment = await functions.postNewComment(
          article_id,
          dataOfComment
        );

        setLocalComments([newComment, ...localComments]);
      } catch (err) {
        alert("Error, try later!");
      } finally {
        setDataOfComment(null);
        setIsCommentPosting(false);
      }
    } else {
      alert("No enough data provided!");
    }
  }

  // comment deletion
  const [activeCommentID, setActiveCommentID] = useState(null);
  useEffect(() => {
    if (activeCommentID !== null) {
      async function deletingComment(activeCommentID) {
        const originalLocalComments = [...localComments];
        const prevLocalComments = [...localComments];

        var filteredComments = prevLocalComments.filter((comment) => {
          return comment.comment_id !== activeCommentID;
        });
        setLocalComments(filteredComments);
        try {
          await functions.deleteComment(activeCommentID);
        } catch (err) {
          setLocalComments(originalLocalComments);
          alert("Delete failed !");
        } finally {
          setActiveCommentID(null);
        }
      }
      deletingComment(activeCommentID);
    }
  }, [activeCommentID]);

  // Add comment

  useEffect(() => {
    if (comments) {
      setLocalComments(comments);
    }
  }, [comments, activeCommentID]);

  if (isCommentPosting) {
    return <h1>Comment is posting....</h1>;
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
            Topic:{" "}
            <a href={`/articles?topic=${article.topic}`}>{article.topic}</a>
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
          <div>
            <button onClick={handleInputForComment}>Add new comment</button>
            {addNewCommentButton ? (
              <form name="addNewCommentForm" onSubmit={handleNewComment}>
                <label htmlFor="body">Add new comment </label>
                <input onChange={handleInputs} type="text" name="body" />
                <div className="formInputsWithError">
                  <label htmlFor="author">Author name </label>
                  <input onChange={handleInputs} type="text" name="author" />
                  {!checkInput ? (
                    <div className="inputErr">
                      <p>Invalid username</p>
                    </div>
                  ) : null}
                </div>
                <button type="submit">Post</button>
              </form>
            ) : null}
            <ul>
              {localComments.map((comment) => {
                return (
                  <li key={comment.comment_id}>
                    <Comment
                      comment={comment}
                      setActiveCommentID={setActiveCommentID}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        ) : comments.length === 0 && showComments ? (
          <p>No comments found!</p>
        ) : null}
      </div>
    </main>
  );
}

export default ArticlePage;
