import {Routes, Route} from 'react-router-dom'
import Header from './Header';
import Navbar from './Navbar';
import Footer from './Footer';
import Reviews from './Reviews';
import Welcome from './Welcome';
import SingleReview from './SingleReview';
import Categories from './Categories';
import {useState} from 'react'

function App() {
  const [clickListener,setClickListener] = useState(false)

  return (
    <div className="app">
      <Header />
      <Navbar setClickListener={setClickListener}/>
      <main className="main">
        <Routes>
          <Route path="/reviews" element={<Reviews clickListener={clickListener} />}></Route>
          <Route path="/reviews/:review_id" element={<SingleReview />}></Route>
          <Route path="/" element={<Welcome />}></Route>
          <Route path="/categories" element={<Categories />}></Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
