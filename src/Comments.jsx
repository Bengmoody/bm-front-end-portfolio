import {useEffect, useState} from 'react'
import { getSingleReviewComments } from './api';
import { formatDate } from './utils';
import AddCommentLikes from './AddCommentLikes';

function Comments({showComments,review_id,setSingleReview,singleReview}) {
    const [commentList,setCommentList] = useState([])
    const [isError,setIsError] = useState(false)
    useEffect(() => {
        getSingleReviewComments(review_id)
        .then((comments) => {
            setIsError(false)
            setCommentList(comments)
        })
        .catch(() => {
            setIsError(true)
        })
    },[])

    if (singleReview.comment_count === "0") {
        return (
        <div className={showComments ? "comments":"hide-comments"} >
            <p>There are no comments for this review.</p>
        </div>
        )
    } else if (isError) {
        return ( 
        <div className={showComments ? "comments":"hide-comments"} >
            <p>Unable to load comments...</p>
        </div>)
    } else {
        return (
        <div className={showComments ? "comments":"hide-comments"} >
            <ul className="comment-list">
                {commentList.map((comment) => {
                    return (
                        <li className="comment-list__element--container">
                            <div className="comment-list__element--author--container">
                                <p className="comment__list__element--author">{comment.author}</p>
                            </div>
                            <div className="comment-list__element--body--container">
                                <p className="comment__list__element--body">{comment.body}<br/></p>
                            </div>
                            <div className="comment-list__element--footer--container">
                                <p className="comment__list__element--footer--date">{formatDate(comment.created_at)}<br/></p>
                                <AddCommentLikes likes={comment.votes} setCommentList={setCommentList} />
                            </div>
                        </li>
                    )
                })}

            </ul>

        </div>
        )
        }
    

}

export default Comments;