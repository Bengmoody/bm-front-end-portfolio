import { useState } from 'react'
import { Link } from "react-router-dom";
import { getUsers } from './api';
import { motion } from 'framer-motion';
import { isVisible } from '@testing-library/user-event/dist/utils';

const logoVariants = {
    hidden: {
      opacity: 0,
      rotate: -45,
      scale: 0.5
    },
    visible: {
        opacity: 1,
        rotate: 0,
        scale: [1.2,1],
        transition: {
            duration: 1,
        },
        
    },
    hover:{
        scale:1.2,
    },
    click: {scale: 0.9}

    }
    



function Header({ loggedUser, setLoggedUser }) {
    const [userInput, setUserInput] = useState("")
    const [isInvalid, setIsInvalid] = useState(false)
    const [isValid, setIsValid] = useState(false)

    const handleOnChange = (e) => {
        setUserInput(e.target.value)
    }

    const handleOnClick = (e) => {
        if (e.target.innerText === "Try again") {
            setIsInvalid(false)
        } else if (e.target.innerText === "Logout") {
            setIsValid(false)
            setLoggedUser("")
        }
    }
    const handleOnSubmit = (e) => {
        e.preventDefault()
        setIsInvalid(false)
        setIsValid(false)
        if (userInput !== "") {
            getUsers(userInput)
                .then((res) => {
                    setIsValid(true)
                    setLoggedUser(userInput)
                })
                .catch((err) => {
                    setIsInvalid(true)
                })
        }
    }

    if (isInvalid) {
        return (
            <header className="header">
                <div className="title-box">
                    <Link to="/" style={{ textDecoration: "none" }}><motion.img whileTap="click" variants={logoVariants} initial="hidden" whileHover="hover" animate="visible" src="untitled-2.svg" alt="website logo, BM Portfolio"/></Link>
                </div>
                <div className="login-box">
                    <section className="login-box__form">

                        <p>This username is invalid. <br />
                            Click to try again.</p>
                        <button onClick={handleOnClick} type="button">Try again</button>
                    </section>
                </div>
            </header>
        )
    } else if (isValid) {
        return (
            <header className="header">
                <div className="title-box">
                    <Link to="/" style={{ textDecoration: "none" }}><motion.img whileTap="click" variants={logoVariants} initial="hidden" whileHover="hover" animate="visible" src="untitled-2.svg" alt="website logo, BM Portfolio"/></Link>
                </div>
                <div className="login-box">
                    <section className="login-box__form">

                        <p>You are currently logged in as {loggedUser}.<br /></p>
                        <button onClick={handleOnClick} type="button">Logout</button>
                    </section>

                </div>
            </header>
        )
    } else {
        return (
            <header className="header">
                <div className="title-box">
                    <Link to="/" style={{ textDecoration: "none" }}><motion.img whileTap="click" variants={logoVariants} initial="hidden" whileHover="hover" animate="visible" src="untitled-2.svg" alt="website logo, BM Portfolio"/></Link>
                </div>
                <div className="login-box">
                    <form className="login-box__form" onSubmit={handleOnSubmit}>
                        <label htmlFor="login-box__form--input" className="login-box__form--label">
                            Enter your username below to login:
                            <input type="text" onChange={handleOnChange} value={userInput} id="login-box__form--input" className="login-box__form--input"></input>
                        </label>
                        <button className="login-box__form--button">Login</button>

                    </form>
                </div>
            </header>
        )
    }
}

export default Header;