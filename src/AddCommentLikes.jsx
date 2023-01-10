import { Link } from "react-router-dom";
function AddCommentLikes({likes}) {
    return (
        <section className="add-comment-likes">
            <section className="add-comment-likes__container">
                <Link style={{textDecoration: 'none'}}><div className="add-comment-likes__button">👍</div></Link>
                <p>{likes}</p>
                <Link style={{textDecoration: 'none'}}><div className="add-comment-likes__button">👎</div></Link>
            </section>

        </section>

    )

}

export default AddCommentLikes;