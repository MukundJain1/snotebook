import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import './index.css';
import NoteState from './Context/Notes/NoteState';
import Signin from './Components/Signin';
import Signup from './Components/Signup';
import CustomAlert from './Components/Alert';
import { useState } from 'react';

function App() {
  const [alert, setAlert] = useState({ type: "", message: "" });

  const showAlert = (message, type) => {
    setAlert({ type: type, message: message });
    setTimeout(() => {
      setAlert({ type: "", message: "" });
    }, 2000);
  };

  return (
    <NoteState>
      <Router>
        <div className="App">
          <Navbar />

          {/* Sticky Alert Below Navbar */}
          <div className="sticky-top" style={{ zIndex: 1030 }}>
            <CustomAlert alert={alert} />
          </div>

          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home showAlert={showAlert} />} />
              <Route path="/about" element={<About />} />
              <Route path="/signin" element={<Signin showAlert={showAlert} />} />
              <Route path="/signup" element={<Signup showAlert={showAlert} />} />
            </Routes>
          </div>
        </div>
      </Router>
    </NoteState>
  );
}

export default App;
