import { Link } from "react-router-dom";
function AddCommentLikes({likes}) {
    return (
        <div className="add-comment-likes">
            <div className="add-comment-likes__container">
                <Link style={{textDecoration: 'none'}}><div className="add-comment-likes__button">👍</div></Link>
                <p>{likes}</p>
                <Link style={{textDecoration: 'none'}}><div className="add-comment-likes__button">👎</div></Link>
            </div>

        </div>

    )

}

export default AddCommentLikes;