import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './frontend/home';
import ChatScreen from './frontend/chatScreen';
import Videocall from './frontend/utils/videocall';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/dashboard" exact element={<ChatScreen />} />
          <Route path="/call/:id" exact element={<Videocall />} />


        </Routes>
      </Router>
    </div>
  );
}

export default App;
