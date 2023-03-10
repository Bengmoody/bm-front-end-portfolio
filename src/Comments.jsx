import { useEffect, useState, useRef } from 'react'
import { getSingleReviewComments } from './api';
import { formatDate } from './utils';
import AddCommentLikes from './AddCommentLikes';
import { postComment } from './api';
import { gsap } from 'gsap';
import { deleteCommentById } from './api';

function Comments({ loggedUser, showComments, review_id, setSingleReview, singleReview }) {
    const [commentList, setCommentList] = useState([])
    const [inputComment, setInputComment] = useState("")
    const commentQueue = [];
    const errorMessageRef = useRef()
    const overlayRef = useRef()
    const [isLoading, setIsLoading] = useState(false)
    const [isDeleted, setIsDeleted] = useState(false)
    const [deleteFailed, setDeleteFailed] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [isError, setIsError] = useState(false)
    const [inputClass, setInputClass] = useState("comment-form__input")
    const [warningMessage, setWarningMessage] = useState(" ")
    const [targetComment,setTargetComment] = useState("")
    const [targetClass,setTargetClass] = useState("comment-list__element--container")

    useEffect(() => {
        if (isDeleting) {
            setTargetClass("comment-list__element--container comment-deleting")
        } else if (isDeleted) {
            setTargetClass("comment-list__element--container comment-fading")
        } else if (deleteFailed) {
            setTargetClass("comment-list__element--container shake-comment")
        } else {
            setTargetClass("comment-list__element--container")
        }

    },[isDeleting,isDeleted,deleteFailed])

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

    useEffect(() => {
        if (inputClass !== "comment-form__input") {
            gsap.from(errorMessageRef.current, {
                duration: 1,
                autoAlpha: 0,
                ease: "none",
                delay: 0
            })

        }

    }, [inputClass])
    useEffect(() => {
        if (isLoading === true) {
            gsap.from(overlayRef.current, {
                duration: 1,
                autoAlpha: 0,
                ease: "none",
                delay: 0
            })

        }

    }, [isLoading])

    const deleteHandler = (e) => {
        setTargetComment(+e.target.id)
        setIsDeleting(true)


        deleteCommentById(e.target.id)
            .then((res) => {
                setIsDeleting(false)
                setIsDeleted(true)

                setTimeout(() => {
                    setSingleReview((currRev) => {
                        const newRev = {...currRev}
                        newRev.comment_count = (+newRev.comment_count - 1).toString()
                        return newRev
                    })
                    setCommentList((currList) => {
                        const newList = [...currList]
                        const editedList = newList.filter((comment) => {
                            return comment.comment_id !== +e.target.id;
                        })
                        return editedList
                    })
                    setIsDeleted(false)
                }
                    , 1000)
            })
            .catch((err) => {
                setIsDeleting(false)
                setDeleteFailed(true)
                setTimeout(()=> {
                    setDeleteFailed(false)
                },1000)
            })
    }
    const handleOnSubmit = (e) => {
        e.preventDefault()
        if (e.target.value === undefined) {
            setInputClass("comment-form__input shake-input")
            setWarningMessage("Please enter a valid comment.")
        }
        if (inputComment !== "") {
            setIsLoading(true)
            setInputClass("comment-form__input")
            setWarningMessage(" ")
            setSingleReview((currReview) => {
                const newReview = { ...currReview }
                newReview.comment_count = +newReview.comment_count + 1;
                return newReview
            })
            setCommentList((currList) => {
                const newCommentId = `posting_${(Math.random() * 10000).toString()}`
                const placeholderComment = {
                    "comment_id": newCommentId,
                    "body": inputComment,
                    "votes": 0,
                    "author": loggedUser,
                    "review_id": review_id,
                    "created_at": "Just now..."
                }
                commentQueue.unshift(placeholderComment)
                const newList = [placeholderComment, ...currList]
                
                return newList
            })
            postComment(loggedUser, review_id, inputComment)
                .then((returnedComment) => {
                    setIsLoading(false)
                    setCommentList((currList) => {
                        const pendingComment = commentQueue.pop();
                        let newList = [...currList]
                        newList = newList.map((currComment) => {
                            let test = true;
                            for (let x in currComment) {
                                if (currComment[x] !== pendingComment[x]) {
                                    test = false;
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
                    setIsLoading(false)
                    setWarningMessage("Unable to post comment.")

                    setCommentList((currList) => {
                        const pendingComment = commentQueue.pop();
                        const newList = [...currList]
                        const index = newList.findIndex((currComment) => {
                            let test = true;
                            for (let x in currComment) {
                                if (currComment[x] !== pendingComment[x]) {
                                    test = false;
                                }
                            }
                            if (test) {
                                return true
                            } else {
                                return false
                            }
                        })
                        
                        newList.splice(index, 1)
                        return newList
                    })
                    setSingleReview((currReview) => {
                        const newReview = { ...currReview }
                        newReview.comment_count = +newReview.comment_count - 1;
                        return newReview
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
                    <input className={inputClass} type="text" placeholder="Add your comment here..." value={inputComment} onChange={handleOnChange}></input>
                    <p ref={errorMessageRef} className="comment-form__message">{warningMessage}</p>
                    <div ref={overlayRef} className={isLoading ? "form-overlay" : "hide"}><p className="form-overlay__text">Posting...</p></div>
                    <button className="comment-form__button">Add</button>
                </form>
                <p className={loggedUser === "" ? "login-to-comment-prompt" : "hide"} >
                    Please login to add your own comment.
                </p>
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
                    <input className={inputClass} type="text" placeholder="Add your comment here..." value={inputComment} onChange={handleOnChange}></input>
                    <p ref={errorMessageRef} className="comment-form__message">{warningMessage}</p>
                    <div ref={overlayRef} className={isLoading ? "form-overlay" : "hide"}><p className={"form-overlay__text"}>Posting...</p></div>
                    <button className={"comment-form__button"}>Add</button>
                </form>
                <p className={loggedUser === "" ? "login-to-comment-prompt" : "hide"} >
                    Please login to add your own comment.
                </p>
                <ul className="comment-list">
                    {commentList.map((comment) => {
                        let startOfCommentId = ((comment.comment_id).toString().split("_")[0])
                        if (comment.author === loggedUser) {
                            return (
                                <li key={Math.random() * 10000} className={startOfCommentId === "posting" ? "comment-list__element--container comment-posting" : ((targetComment === comment.comment_id)? targetClass : "comment-list__element--container")}> 
                                    <div className="comment-list__element--author--container">
                                        <p className="comment__list__element--author">{comment.author}</p>
                                        <button onClick={deleteHandler} id={comment.comment_id} className={ (isDeleting && comment.comment_id === targetComment) ? "hide" : ((isDeleted && comment.comment_id === targetComment) ? "hide" : "comment__list__element--delete-button")} type="button">???????</button>
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
                        } else {
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




                        }
                    })}

                </ul>

            </div>
        )
    }


}

export default Comments;