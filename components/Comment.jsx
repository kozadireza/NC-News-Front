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
    <div style={{ border: "solid 1px grey" }}>
      <section id="commentInfo">
        <h5
          style={{
            display: "flex",
            marginBottom: "0px",

            alignItems: "center",
          }}
        >
          Author: {comment.author}
        </h5>
        <h5
          style={{
            display: "flex",
            marginBottom: "0px",

            alignItems: "center",
          }}
        >
          Created at: {convertDate(comment.created_at)}
        </h5>
        <h5
          style={{
            display: "flex",
            marginBottom: "0px",

            alignItems: "center",
          }}
        >
          Votes: {comment.votes}
        </h5>
      </section>
      <section id="commentBody">
        <p
          style={{
            display: "flex",
            marginBottom: "0px",
            marginTop: "0px",
            alignItems: "center",
            backgroundColor: "#05498429",
            fontFamily: "monospace",
            fontSize: "large",
          }}
        >
          {comment.body}
        </p>
        {user.username === comment.author ? (
          <button
            style={{ display: "flex", alignItems: "center" }}
            onClick={handleActiveCommentID}
          >
            Delete comment
          </button>
        ) : null}
      </section>
    </div>
  );
}
export default Comment;
