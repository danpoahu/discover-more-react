import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { giftDetails, calculateGiftScores, getTop3Gifts } from '../data/spiritualGifts';

function Dashboard() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');
  const [top3Gifts, setTop3Gifts] = useState([]);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        navigate('/login');
        return;
      }

      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        setUserData(data);
        
        // Set user name
        const name = data.Name || data.name || user.email.split('@')[0];
        setUserName(name);

        // Calculate top 3 spiritual gifts if survey responses exist
        if (data.latestSGResponses && data.latestSGResponses.length === 72) {
          const scores = calculateGiftScores(data.latestSGResponses);
          const top3 = getTop3Gifts(scores);
          setTop3Gifts(top3);
        }
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const isAdmin = userData?.Team === 'AdminX';

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-2xl text-dark-blue">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <img 
            src="/logo.png" 
            alt="Anchor Church" 
            className="h-24 mx-auto mb-4"
          />
          <h1 className="text-5xl font-bold text-dark-blue mb-2">DISCOVER MORE</h1>
          <div className="w-80 h-1 bg-accent-orange mx-auto rounded mb-6"></div>
          <p className="text-xl font-bold text-accent-orange">Welcome {userName}</p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col items-center space-y-4 mb-8">
          <button
            onClick={() => navigate('/surveys')}
            className="w-72 bg-primary-green text-white font-bold text-xl py-4 rounded-2xl shadow-lg hover:bg-green-600 transition duration-200"
          >
            Take Surveys
          </button>

          <button
            onClick={() => navigate('/results')}
            className="w-72 bg-primary-green text-white font-bold text-xl py-4 rounded-2xl shadow-lg hover:bg-green-600 transition duration-200"
          >
            Survey Results
          </button>

          <button
            onClick={() => navigate('/profile')}
            className="w-72 bg-primary-green text-white font-bold text-xl py-4 rounded-2xl shadow-lg hover:bg-green-600 transition duration-200"
          >
            Profile
          </button>

          <button
            onClick={() => navigate('/resources')}
            className="w-72 bg-primary-green text-white font-bold text-xl py-4 rounded-2xl shadow-lg hover:bg-green-600 transition duration-200"
          >
            Resources
          </button>

          <button
            onClick={handleLogout}
            className="w-72 bg-primary-green text-white font-bold text-xl py-4 rounded-2xl shadow-lg hover:bg-green-600 transition duration-200"
          >
            Log Off
          </button>
        </div>

        {/* Divider */}
        <div className="w-80 h-0.5 bg-accent-orange mx-auto rounded mb-8"></div>

        {/* Top 3 Spiritual Gifts */}
        {top3Gifts.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-accent-orange text-center mb-6">
              Top 3 Spiritual Gifts
            </h2>
            <div className="space-y-4">
              {top3Gifts.map(({ score, index }) => {
                const gift = giftDetails[index];
                return (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition duration-200 cursor-pointer"
                    onClick={() => navigate(`/gift/${index}`)}
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-bold text-accent-orange">
                        {gift.name}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-primary-green">
                          Score: {score}
                        </span>
                        <svg
                          className="w-6 h-6 text-accent-orange"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Admin Console Link */}
        {isAdmin && (
          <div className="text-center mt-8">
            <button
              onClick={() => navigate('/admin')}
              className="inline-flex items-center space-x-2 text-accent-orange font-bold text-lg hover:underline"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Admin Console</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
