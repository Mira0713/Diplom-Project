import "./styles.scss";

const AddComment = () => {
  return (
    <form className="commentForm">
      <div className="commentTitle">Add comment</div>
      <div>
        <div className="commentDescription">
          Your email address will not be published. Required fields are marked *
        </div>
        <div className="usersInputs">
          <input type="text" id="author" placeholder="Name*" />
          <input type="email" id="email" placeholder="example@example.com" />
        </div>
        <textarea id="comment" placeholder="Сomment*" name="comment"></textarea>
        <div className="saveData">
          <input type="checkbox" value="yes" className="saveDataChekbox" />
          <label>
            Save my name, email, and website in this browser for the next time I
            comment.
          </label>
        </div>
      </div>
    </form>
  );
};

export default AddComment;
