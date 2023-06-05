import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './frontend/home';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
