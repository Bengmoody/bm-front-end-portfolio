import { Link } from "react-router-dom";
import { patchSingleReview } from "./api";

function AddReviewLikes({likes,setSingleReview,review_id}) {
    const handleOnClick = (e) => {
        let increment = 0;
        if (e.target.innerText === "👍") {
            increment += 1;
        } else {
            increment -= 1;
        }
        setSingleReview((currRev) => {
            let newRev = {...currRev}
            newRev.votes += increment;
            return newRev;
        })
        patchSingleReview(review_id,increment)
        .catch((err) => {
            setSingleReview((currRev) => {
                let newRev = {...currRev}
                newRev.votes -= increment;
                return newRev;
            })
        })

    }
    return (
        <section className="add-review-likes">
            <section className="add-review-likes__container">
                <button type="button" onClick={handleOnClick} id="up"><div className="add-review-likes__button">👍</div></button>
                <p>{likes}</p>
                <button type="button" onClick={handleOnClick} id="down"><div className="add-review-likes__button">👎</div></button>
            </section>

        </section>

    )

}

export default AddReviewLikes;