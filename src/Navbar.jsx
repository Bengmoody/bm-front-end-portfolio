import {Link} from 'react-router-dom'
function Navbar() {
    return (
        <div className="navbar">
            <Link to="/reviews">Reviews</Link>
            {/* All the rest of these links are placeholders, for now */}
            <Link to="/reviews">Categories</Link>
            <Link to="/reviews">Users</Link>
            <Link to="/reviews">Add review</Link>
            <Link to="/reviews">About</Link>




    </div>
    )


}

export default Navbar;