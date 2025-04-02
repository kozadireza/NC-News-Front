import { useContext } from "react";
import { UserDataContext } from "../COntexts/UserDataContext";

function Comment({ comment, setActiveCommentID }) {
  const { user } = useContext(UserDataContext);

  function handleActiveCommentID() {
    if (comment.author === user.username) {
      setActiveCommentID(comment.comment_id);
    } else {
      alert("unable to delete comment!");
    }
  }
  return (
    <div>
      <section id="commentInfo">
        <h5>Author: {comment.author}</h5>
        <h5>Created at: {comment.created_at}</h5>
        <h5>Votes: {comment.votes}</h5>
      </section>
      <section id="commentBody">
        <p>{comment.body}</p>
        <button onClick={handleActiveCommentID}>Delete comment</button>
      </section>
    </div>
  );
}
export default Comment;
