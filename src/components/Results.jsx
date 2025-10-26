import { useNavigate } from 'react-router-dom';

function Results() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <img 
            src="/logo.png" 
            alt="Anchor Church" 
            className="h-24 mx-auto mb-4"
          />
          <h1 className="text-4xl font-bold text-dark-blue mb-2">SURVEY RESULTS</h1>
          <div className="w-64 h-1 bg-accent-orange mx-auto rounded"></div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <p className="text-xl text-gray-700 mb-6">
            Results page coming soon! This will show your DISC personality results and Spiritual Gifts scores.
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-primary-green text-white font-bold py-3 px-6 rounded-xl shadow-md hover:bg-green-600 transition duration-200"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default Results;
