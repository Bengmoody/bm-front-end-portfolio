import { useEffect, useState } from 'react'
import { getReviews } from './api'
import { Link } from 'react-router-dom'
import { formatDate } from './utils'
import {useSearchParams} from 'react-router-dom'

function Reviews({clickListener}) {
    const [reviewList, setReviewList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [searchParams,setSearchParams] = useSearchParams()
    const [displayCategory,setDisplayCategory] = useState("")
    const category = searchParams.get('category')
    
    useEffect(() => {
        setIsLoading(true)
        setDisplayCategory(() => {
            if (category) {
                return category.split("-").join(" ").toUpperCase()
            } else {
                return "";
            }
        })
        getReviews(category).then(({ reviews }) => {
            setReviewList(reviews)
            setIsLoading(false)
        })
        
    }, [clickListener])
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
            <section className="reviews">
                <div className="reviews__header"><h2>Reviews</h2>
                    <p className={displayCategory !== "" ? "category-present" : "hide-category-present"}>These reviews are for category: {displayCategory}</p>
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

            </section>
        )

}

export default Reviews