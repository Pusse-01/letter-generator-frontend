import Home from './screens/home'
import Login from './screens/login'
import Signup from './screens/signup';
import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Docs from './screens/docs';
import MiniDrawer from './components/sidebar';
import LetterCard from './components/letter_cards';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    // Check if the user is logged in by reading from local storage
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    if (loggedInStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  // Function to handle drawer open/close
  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };


  // Function to handle user login
  const handleLogin = () => {
    // Perform login logic and set isLoggedIn to true
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
    window.location.href = '/';
  };

  // Function to handle user logout
  const handleLogout = () => {
    // Perform logout logic and set isLoggedIn to false
    setIsLoggedIn(false);
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    window.location.href = '/';
  };
  return (
    <div className="App">
      <Router>
        {isLoggedIn ? (
          <>
            <MiniDrawer open={drawerOpen} onLogout={handleLogout} handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose} />

            <div className="h-screen">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/generate_letter" element={<Docs />} />
                <Route path="/letters" element={<LetterCard />} />
              </Routes>
            </div>
          </>
        ) : (
          <Routes>
            {/* Render Login and Signup components for different paths */}
            <Route path="/" element={<Login handleLogin={handleLogin} />} />
            <Route path="/login" element={<Login handleLogin={handleLogin} />} />
            <Route path="/signup" element={<Signup handleLogin={handleLogin} />} />
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;