import {Routes, Route} from 'react-router-dom'
import Header from './Header';

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
      <Footer />
    </div>
  );
}

export default App;
