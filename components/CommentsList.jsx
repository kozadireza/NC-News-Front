import { useEffect, useState } from "react";

import useFetchComments from "../hooks/fetchComments";
import Comment from "./Comment";
import { useContext } from "react";
import { UserDataContext } from "../COntexts/UserDataContext";
import { postNewComment } from "../Utils/data.fetching";

function CommentsList({ article_id }) {
  const [localComments, setLocalComments] = useState([]);
  const [isNewCommentFormVisible, setIsNewCommentFormVisible] = useState(false);
  const [commentText, setCommentText] = useState(null);
  const [isCommentPosting, setIsCommentPosting] = useState(false);

  const { user } = useContext(UserDataContext);

  const {
    data: comments,
    isLoading: commentsLoading,
    isError: commentsError,
  } = useFetchComments(article_id);

  useEffect(() => {
    if (comments) {
      setLocalComments(comments);
    }
  }, [comments]);

  function handleInput(event) {
    console.log("bla", event.target.value);
    setCommentText(event.target.value);
  }
  /// form submitting
  async function handleNewComment(event) {
    event.preventDefault();

    if (commentText) {
      setIsCommentPosting(true);
      try {
        const newComment = await postNewComment(
          article_id,
          commentText,
          user.username
        );

        setLocalComments([newComment, ...localComments]);
      } catch {
        alert("Error, try later!");
      } finally {
        setCommentText(null);
        setIsCommentPosting(false);
      }
    } else {
      alert("No enough data provided!");
    }
  }

  const removeComment = (id) => {
    var filteredComments = localComments.filter((comment) => {
      return comment.comment_id !== id;
    });
    setLocalComments(filteredComments);
  };

  if (isCommentPosting) {
    return <h1>Comment is posting....</h1>;
  }
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {commentsLoading ? <p> Comments is Loading...</p> : null}
      {commentsError ? <p>Something went wrong!</p> : null}
      <div
        style={{
          alignItems: "center",
          width: "80%",
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <button
          className="add-comment-button"
          onClick={() => setIsNewCommentFormVisible(!isNewCommentFormVisible)}
        >
          ➕ Add a comment
        </button>
        {isNewCommentFormVisible ? (
          <form name="add-comment-button" onSubmit={handleNewComment}>
            <label htmlFor="body">Add new comment </label>
            <input onChange={handleInput} type="text" name="body" />

            <button type="submit">Post</button>
          </form>
        ) : null}
        <ul
          style={{
            paddingLeft: "0px",
            listStyle: "none",
          }}
        >
          {localComments.map((comment) => {
            return (
              <li key={comment.comment_id}>
                <Comment comment={comment} removeComment={removeComment} />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
export default CommentsList;
