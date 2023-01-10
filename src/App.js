import {Routes, Route} from 'react-router-dom'
import Header from './Header';
import Navbar from './Navbar';
import Footer from './Footer';
import Reviews from './Reviews';
import Welcome from './Welcome';

function App() {
  return (
    <div className="app">
      <Header />
      <Navbar />
      <div className="main">
        <Routes>
          <Route path="/reviews" element={<Reviews />}></Route>
          <Route path="/" element={<Welcome />}></Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
