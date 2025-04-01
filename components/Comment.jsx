function Comment({ comment }) {
  console.log(comment);
  return (
    <div>
      <section id="commentInfo">
        <h5>Author: {comment.author}</h5>
        <h5>Created at: {comment.created_at}</h5>
        <h5>Votes: {comment.votes}</h5>
      </section>
      <section id="commentBody">
        <p>{comment.body}</p>
      </section>
    </div>
  );
}
export default Comment;
