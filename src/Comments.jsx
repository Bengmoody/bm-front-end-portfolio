import { useEffect, useState } from 'react'
import { getSingleReviewComments } from './api';
import { formatDate } from './utils';
import AddCommentLikes from './AddCommentLikes';
import { postComment } from './api';

function Comments({ loggedUser, showComments, review_id, setSingleReview, singleReview }) {
    const [commentList, setCommentList] = useState([])
    const [inputComment, setInputComment] = useState("")
    const [isError, setIsError] = useState(false)
    const commentQueue = [];
    useEffect(() => {
        getSingleReviewComments(review_id)
            .then((comments) => {
                setIsError(false)
                setCommentList(comments)
            })
            .catch(() => {
                setIsError(true)
            })
    }, [])

    const handleOnSubmit = (e) => {
        e.preventDefault()
        if (inputComment !== "") {
            setCommentList((currList) => {
                let newCommentId = `posting_${(Math.random()*10000).toString()}`
                const placeholderComment={
                    "comment_id": newCommentId,
                    "body":inputComment,
                    "votes":0,
                    "author":loggedUser,
                    "review_id":review_id,
                    "created_at": "Just now..."
                }
                commentQueue.unshift(placeholderComment)
                const newList = [placeholderComment, ...currList]
                setSingleReview((currReview) => {
                    let newReview = {...currReview}
                    newReview.comment_count = +newReview.comment_count+1;
                    return newReview
                })
                return newList
            })
            postComment(loggedUser, review_id, inputComment)
                .then((returnedComment) => {
                    setCommentList((currList) => {
                        let pendingComment=commentQueue.pop();
                        let newList = [...currList]
                        newList = newList.map((currComment) => {
                            let test=true;
                            for (let x in currComment) {
                                if (currComment[x] !== pendingComment[x]) {
                                    test=false;
                                }
                            }
                            if (test) {
                                return returnedComment
                            } else {
                                return currComment
                            }
                        })
                        return newList
                    })
                })
                .catch((err) => {
                    setCommentList((currList) => {
                        let pendingComment=commentQueue.pop();
                        let newList = [...currList]
                        const index = newList.findIndex((currComment) => {
                            let test=true;
                            for (let x in currComment) {
                                if (currComment[x] !== pendingComment[x]) {
                                    test=false;
                                }
                            }
                            if (test) {
                                return true
                            } else {
                                return false
                            }
                        })
                        setSingleReview((currReview) => {
                            let newReview = {...currReview}
                            newReview.comment_count = +newReview.comment_count-1;
                            return newReview
                        })
                        newList.splice(index,1)
                        return newList
                    })
                })
        }

    }
    const handleOnChange = (e) => {
        setInputComment(e.target.value)
    }

    if (singleReview.comment_count === "0") {
        return (
            <div className={showComments ? "comments" : "hide-comments"} >
                <p>There are no comments for this review.</p>
                <form onSubmit={handleOnSubmit} className={loggedUser === "" ? "hide-comment-form" : "comment-form"}>
                    <input className="comment-form__input" type="text" placeholder="Add your comment here..." value={inputComment} onChange={handleOnChange}></input>
                    <button className="comment-form__button">Add</button>
                </form>
            </div>
        )
    } else if (isError) {
        return (
            <div className={showComments ? "comments" : "hide-comments"} >
                <p>Unable to load comments...</p>
            </div>)
    } else {
        return (
            <div className={showComments ? "comments" : "hide-comments"} >
                <form onSubmit={handleOnSubmit} className={loggedUser === "" ? "hide-comment-form" : "comment-form"}>
                    <input className="comment-form__input" type="text" placeholder="Add your comment here..." value={inputComment} onChange={handleOnChange}></input>
                    <button className="comment-form__button">Add</button>
                </form>
                <ul className="comment-list">
                    {commentList.map((comment) => {
                        let startOfCommentId = ((comment.comment_id).toString().split("_")[0])
                        return (
                            <li key={Math.random() * 10000} className={startOfCommentId === "posting" ? "comment-list__element--container comment-posting" : "comment-list__element--container"}>
                                <div className="comment-list__element--author--container">
                                    <p className="comment__list__element--author">{comment.author}</p>
                                </div>
                                <div className="comment-list__element--body--container">
                                    <p className="comment__list__element--body">{comment.body}<br /></p>
                                </div>
                                <div className="comment-list__element--footer--container">
                                    <p className="comment__list__element--footer--date">{comment.created_at === "Just now..." ? "Just now..." : formatDate(comment.created_at)}<br /></p>
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