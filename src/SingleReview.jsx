import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getSingleReview } from './api'
import { formatDate } from './utils.js'
import AddReviewLikes from './AddReviewLikes'
import Comments from './Comments'
import ErrorPage from './ErrorPage'

function SingleReview({ loggedUser }) {
    const [singleReview, setSingleReview] = useState({})
    const { review_id } = useParams();
    const [isError, setIsError] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [showComments, setShowComments] = useState(false)
    const onClickHandler = (e) => {
        setShowComments(!showComments)
    }


    useEffect(() => {
        setIsLoading(true)
        getSingleReview(review_id).then((review) => {
            setSingleReview(review)
            setIsLoading(false)
            setIsError(0)
        })
            .catch((code) => {
                setIsLoading(false)
                setIsError(code)
            })

    }, [])
    if (isError !== 0) {
        return (
            <ErrorPage code={isError} />
        )
    } else {
        return isLoading ?
            (<section className="loading-container">
                <p className="loading-message">Loading...</p>
                <p className="rocket loading-rocket">
                    <br />
                    ⌛
                </p>
            </section>)
            :

            (
                <section className={showComments ? "single-review single-review-with-comments" : "single-review"}>
                    <ul className="single-review__list">
                        <li className="single-review__list__element--container">
                            <p className="single-review__list__element--key">Review ID:</p>
                            <p className="single-review__list__element--value">{singleReview.review_id}<br /></p>
                        </li>
                        <li className="single-review__list__element--container">
                            <p className="single-review__list__element--key">Title:</p>
                            <p className="single-review__list__element--value">{singleReview.title}<br /></p>
                        </li>
                        <li className="single-review__list__element--container">
                            <p className="single-review__list__element--key">Review by:</p>
                            <p className="single-review__list__element--value">{singleReview.owner}<br /></p>
                        </li>
                        <li className="single-review__list__element--container">
                            <p className="single-review__list__element--key">Review body:</p>
                            <p className="single-review__list__element--value">{singleReview.review_body}<br /></p>
                        </li>
                        <li className="single-review__list__element--container">
                            <p className="single-review__list__element--key">Game category:</p>
                            <p className="single-review__list__element--value">{singleReview.category}<br /></p>
                        </li>
                        <li className="single-review__list__element--container">
                            <p className="single-review__list__element--key">Game designer:</p>
                            <p className="single-review__list__element--value">{singleReview.designer}<br /></p>
                        </li>
                        <li className="single-review__list__element--container">
                            <p className="single-review__list__element--key">Date of review:</p>
                            <p className="single-review__list__element--value">{formatDate(singleReview.created_at)}<br /></p>
                        </li>
                        <li className="single-review__list__element--container">
                            <p className="single-review__list__element--key">Number of upvotes:</p>
                            {/* <p className="single-review__list__element--value">{singleReview.votes}<br/></p> */}
                            <AddReviewLikes review_id={review_id} likes={singleReview.votes} setSingleReview={setSingleReview} />
                        </li>
                        <li className="single-review__list__element--container">
                            <p className="single-review__list__element--key">Number of user comments on review:</p>
                            <p className="single-review__list__element--value">{singleReview.comment_count}<br /></p>
                            <div className="comment-arrows__container">
                                <button onClick={onClickHandler} type="button" className={showComments ? "comment-arrows__button" : "hide-arrow"} ><span className="comment-arrows__left-arrow">Hide comments ⬅️</span></button>
                                <button onClick={onClickHandler} type="button" className={showComments ? 'hide-arrow' : 'comment-arrows__button'}><span className="comment-arrows__right-arrow">See comments ➡️</span></button>
                            </div>
                        </li>
                        <li className="single-review__list__element--container">
                            <p className="single-review__list__element--key">Image associated with review:</p>
                            <img src={`${singleReview.review_img_url}`} className="single-review__list__element--img" alt={`image of review titled ${singleReview.title}`} /><br />
                        </li>
                    </ul>
                    <Comments loggedUser={loggedUser} showComments={showComments} review_id={review_id} setSingleReview={setSingleReview} singleReview={singleReview} />
                </section>
            )
    }
}

export default SingleReview;
