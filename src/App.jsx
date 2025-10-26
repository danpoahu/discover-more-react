import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Surveys from './components/Surveys';
import Results from './components/Results';
import Profile from './components/Profile';
import Resources from './components/Resources';
import Admin from './components/Admin';
import GiftDetail from './components/GiftDetail';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-2xl text-dark-blue">Loading...</div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={user ? <Navigate to="/dashboard" /> : <Login />} 
        />
        <Route 
          path="/dashboard" 
          element={user ? <Dashboard /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/surveys" 
          element={user ? <Surveys /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/results" 
          element={user ? <Results /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/profile" 
          element={user ? <Profile /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/resources" 
          element={user ? <Resources /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/admin" 
          element={user ? <Admin /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/gift/:giftId" 
          element={user ? <GiftDetail /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/" 
          element={<Navigate to={user ? "/dashboard" : "/login"} />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
