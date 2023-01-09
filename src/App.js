import {Routes, Route} from 'react-router-dom'
import Header from './Header';
import Navbar from './Navbar';

function App() {
  return (
    <div className="app">
      <Header />
      <Navbar />
      <div className="main">
        <Routes>
          <Route></Route>
        </Routes>
      </div>
      <Footer className="footer"/>
      
    </div>
  );
}

export default App;
