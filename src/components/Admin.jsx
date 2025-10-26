import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

function Admin() {
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthorization();
  }, []);

  const checkAuthorization = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        navigate('/login');
        return;
      }

      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        if (data.Team === 'AdminX') {
          setAuthorized(true);
        } else {
          navigate('/dashboard');
        }
      }
    } catch (error) {
      console.error('Error checking authorization:', error);
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-2xl text-dark-blue">Loading...</div>
      </div>
    );
  }

  if (!authorized) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <img 
            src="/logo.png" 
            alt="Anchor Church" 
            className="h-24 mx-auto mb-4"
          />
          <h1 className="text-4xl font-bold text-dark-blue mb-2">ADMIN CONSOLE</h1>
          <div className="w-64 h-1 bg-accent-orange mx-auto rounded"></div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <p className="text-xl text-gray-700 mb-6 text-center">
            Admin console coming soon! This will allow you to view and manage user data.
          </p>
          <div className="text-center">
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-primary-green text-white font-bold py-3 px-6 rounded-xl shadow-md hover:bg-green-600 transition duration-200"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
