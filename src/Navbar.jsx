import {Link} from 'react-router-dom'
function Navbar({setClickListener}) {
    const handleOnClick = (e) => {
        setClickListener((currValue) => {
            return !currValue;
        })
    }
    return (
        <nav className="navbar">
            <div className="navbar__link--box"><Link to="/reviews" onClick={handleOnClick}><span className="navbar__link--text">Reviews</span></Link></div>
            {/* All the rest of these links are placeholders, for now */}
            <div className="navbar__link--box"><Link to="/categories"><span className="navbar__link--text">Categories</span></Link></div>
            <div className="navbar__link--box"><Link to="/reviews"><span className="navbar__link--text">Users</span></Link></div>
            <div className="navbar__link--box"><Link to="/reviews"><span className="navbar__link--text">Add review</span></Link></div>
            <div className="navbar__link--box"><Link to="/reviews"><span className="navbar__link--text">About</span></Link></div>
        </nav>
    )


}

export default Navbar;