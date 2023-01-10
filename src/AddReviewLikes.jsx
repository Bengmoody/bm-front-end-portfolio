import { Link } from "react-router-dom";
function AddReviewLikes() {
    return (
        <div className="add-review-likes">
            <div className="add-review-likes__container">
                <Link style={{textDecoration: 'none'}}><div className="add-review-likes__button">👍</div></Link>
                <Link style={{textDecoration: 'none'}}><div className="add-review-likes__button">👎</div></Link>
            </div>

        </div>

    )

}

export default AddReviewLikes;