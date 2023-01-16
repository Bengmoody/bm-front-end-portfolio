import {Routes, Route} from 'react-router-dom'
import Header from './Header';
import Navbar from './Navbar';
import Footer from './Footer';
import Reviews from './Reviews';
import Welcome from './Welcome';
import SingleReview from './SingleReview';
import ErrorPage from './ErrorPage';
import { AnimatePresence } from 'framer-motion';

import { useLocation } from 'react-router-dom';
import Categories from './Categories';
import {useState} from 'react'
import Landing from './Landing';

function App() {
  const location = useLocation()
  const [loggedUser,setLoggedUser] = useState("")
  const [clickListener,setClickListener] = useState(false)

  return (
    <div className="app">
      <Landing />
      <Header loggedUser={loggedUser} setLoggedUser={setLoggedUser} />
      <Navbar setClickListener={setClickListener}/>
      <main className="main">
        <AnimatePresence mode="wait">
        <Routes location={location} key={location.key}>
          <Route path="/reviews" element={<Reviews clickListener={clickListener} />}></Route>
          <Route path="/reviews/:review_id" element={<SingleReview loggedUser={loggedUser}/>}></Route>
          <Route path="/" element={<Welcome />}></Route>
          <Route path="/categories" element={<Categories />}></Route>
          <Route path="*" element={<ErrorPage type="user"/>} />
        </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

export default App;
