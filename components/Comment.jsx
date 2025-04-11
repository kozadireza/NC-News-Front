import { useContext } from "react";
import { UserDataContext } from "../COntexts/UserDataContext";
import { deleteComment } from "../Utils/data.fetching";
import { convertDate } from "../Utils/other";

function Comment({ comment, removeComment }) {
  const { user } = useContext(UserDataContext);

  async function handleActiveCommentID() {
    if (comment.comment_id !== null) {
      try {
        await deleteComment(comment.comment_id);
        removeComment(comment.comment_id);
      } catch {
        alert("Delete failed !");
      }
    }
  }
  return (
    <div>
      <section id="commentInfo">
        <h5>Author: {comment.author}</h5>
        <h5>Created at: {convertDate(comment.created_at)}</h5>
        <h5>Votes: {comment.votes}</h5>
      </section>
      <section id="commentBody">
        <p>{comment.body}</p>
        {user.username === comment.author ? (
          <button onClick={handleActiveCommentID}>Delete comment</button>
        ) : null}
      </section>
    </div>
  );
}
export default Comment;
