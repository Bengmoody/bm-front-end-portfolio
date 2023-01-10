import {useParams} from 'react-router-dom'
import {useState,useEffect} from 'react'
import { getSingleReview } from './api'
import { formatDate } from './api'
import AddReviewLikes from './AddReviewLikes'

function SingleReview() {
    const [singleReview,setSingleReview] = useState({})
    const {review_id} = useParams();
    

    const [isLoading, setIsLoading] = useState(false)

    const [finishedLoading, setFinishedLoading] = useState(false)
    useEffect(() => {
        setIsLoading(true)
        setFinishedLoading(false)
        getSingleReview(review_id).then((review) => {
            setSingleReview(review)
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
        <div className="single-review">
            <ul className="single-review__list">
                <li className="single-review__list__element--container">
                    <p className="single-review__list__element--key">Review ID:</p> 
                    <p className="single-review__list__element--value">{singleReview.review_id}<br/></p>
                </li>
                <li className="single-review__list__element--container">
                    <p className="single-review__list__element--key">Title:</p> 
                    <p className="single-review__list__element--value">{singleReview.title}<br/></p>
                </li>
                <li className="single-review__list__element--container">
                    <p className="single-review__list__element--key">Review by:</p> 
                    <p className="single-review__list__element--value">{singleReview.owner}<br/></p>
                </li>
                <li className="single-review__list__element--container">
                    <p className="single-review__list__element--key">Review body:</p> 
                    <p className="single-review__list__element--value">{singleReview.review_body}<br/></p>
                </li>
                <li className="single-review__list__element--container">
                    <p className="single-review__list__element--key">Game category:</p> 
                    <p className="single-review__list__element--value">{singleReview.category}<br/></p>
                </li>
                <li className="single-review__list__element--container">
                    <p className="single-review__list__element--key">Game designer:</p> 
                    <p className="single-review__list__element--value">{singleReview.designer}<br/></p>
                </li>
                <li className="single-review__list__element--container">
                    <p className="single-review__list__element--key">Date of review:</p> 
                    <p className="single-review__list__element--value">{formatDate(singleReview.created_at)}<br/></p>
                </li>
                <li className="single-review__list__element--container">
                    <p className="single-review__list__element--key">Number of upvotes:</p> 
                    <p className="single-review__list__element--value">{singleReview.votes}<br/></p>
                    <AddReviewLikes />
                </li>
                <li className="single-review__list__element--container">
                    <p className="single-review__list__element--key">Number of user comments on review:</p> 
                    <p className="single-review__list__element--value">{singleReview.comment_count}<br/></p>
                </li>
                <li className="single-review__list__element--container">
                    <p className="single-review__list__element--key">Image associated with review:</p> 
                    <img src={`${singleReview.review_img_url}`} className="single-review__list__element--img" alt={`image of review titled ${singleReview.title}`}/><br/>
                </li>
            </ul>
        </div>
    )
}

export default SingleReview;
