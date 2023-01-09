function Header() {
    return (
        <div className="header">
            <div className="title-box">
                <h1>BM Portfolio Website</h1>
            </div>
            {/* Following form is currently non-working, just a placeholder */}
            <div className="login-box">
                <form className="login-box__form">
                    <label for="login-box__form--input" className="login-box__form--input">
                        Enter your username below to login:
                        <input type="text" id="login-box__form--input"></input>
                    </label>
                    <button type="button">Login</button>

                </form>
            </div>
        </div>
    )

}

export default Header;