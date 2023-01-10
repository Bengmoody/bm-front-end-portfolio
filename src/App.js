import {Routes, Route} from 'react-router-dom'
import Header from './Header';
import Navbar from './Navbar';
import Footer from './Footer';
import Reviews from './Reviews';
import Welcome from './Welcome';
import SingleReview from './SingleReview';

function App() {
  return (
    <div className="app">
      <Header />
      <Navbar />
      <main className="main">
        <Routes>
          <Route path="/reviews" element={<Reviews />}></Route>
          <Route path="/reviews/:review_id" element={<SingleReview />}></Route>
          <Route path="/" element={<Welcome />}></Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
