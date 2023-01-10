import { Link } from "react-router-dom";
function Header() {
    return (
        <div className="header">
            <div className="title-box">
                <Link to="/" style={{textDecoration: "none"}}><h1>BM Portfolio Website</h1></Link>
            </div>
            {/* Following form is currently non-working, just a placeholder */}
            <div className="login-box">
                <form className="login-box__form">
                    <label htmlFor="login-box__form--input" className="login-box__form--label">
                        Enter your username below to login:
                        <input type="text" id="login-box__form--input" className="login-box__form--input"></input>
                    </label>
                    <button type="button" className="login-box__form--button">Login</button>

                </form>
            </div>
        </div>
    )

}

export default Header;