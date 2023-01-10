import { useEffect, useState } from 'react'
import { getReviews } from './api'
import { Link } from 'react-router-dom'
import { formatDate } from './utils'

function Reviews() {
    const [reviewList, setReviewList] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const [finishedLoading, setFinishedLoading] = useState(false)
    useEffect(() => {
        setIsLoading(true)
        setFinishedLoading(false)
        getReviews().then(({ reviews }) => {
            setReviewList(reviews)
            setFinishedLoading(true)
            const animation = document.querySelector('.rocket')
            animation.addEventListener('animationend', () => {
                setIsLoading(false)
            })

            animation.removeEventListener('animationend', () => {
                setIsLoading(false)
            })


        })
        return () => {
        }
    }, [])
    return isLoading ?
        (<div className="loading-container">
        <p className="loading-message">Loading...</p>
        <p className={!finishedLoading ? "rocket loading-rocket" : "rocket rocket-launch"}>
            <br />
            🚀
        </p>
        </div>)
        :
        (
            <div className="reviews">
                <div className="reviews__header"><h2>Reviews</h2>
                    <p>Please click a review_id to view more details for that review:</p>
                </div>
                <ul className="reviews__list">
                    {reviewList.map((review) => {
                        return (<li className="reviews__list__element--container" key={Math.random() * 10000}>
                            <Link style={{ textDecoration: "none" }} to={`/reviews/${review.review_id}`}><div className="reviews__list__element--review-id--box"><p className="reviews__list__element--review-id">{review.review_id}</p></div></Link>
                            <p className="review__list__element--title">Review title: <br /><br />{review.title}</p>
                            <p className="review__list__element--created-at">{formatDate(review.created_at)}</p>


                        </li>
                        )

                    })}
                </ul>

            </div>
        )

}

export default Reviews