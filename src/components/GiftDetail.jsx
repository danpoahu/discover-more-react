import { useParams, useNavigate } from 'react-router-dom';
import { giftDetails } from '../data/spiritualGifts';

function GiftDetail() {
  const { giftId } = useParams();
  const navigate = useNavigate();
  
  const gift = giftDetails[parseInt(giftId)];

  if (!gift) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl text-dark-blue mb-4">Gift not found</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-primary-green text-white font-bold py-3 px-6 rounded-xl shadow-md hover:bg-green-600 transition duration-200"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <img 
            src="/logo.png" 
            alt="Anchor Church" 
            className="h-24 mx-auto mb-4"
          />
          <h1 className="text-4xl font-bold text-accent-orange mb-2">{gift.name}</h1>
          <div className="w-64 h-1 bg-accent-orange mx-auto rounded"></div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-dark-blue mb-4">Description</h2>
          <p className="text-lg text-gray-700 mb-6">{gift.description}</p>

          <h2 className="text-2xl font-bold text-dark-blue mb-4">Biblical References</h2>
          <p className="text-lg text-gray-700 mb-6">{gift.verses}</p>

          <h2 className="text-2xl font-bold text-dark-blue mb-4">Ministry Teams</h2>
          <p className="text-lg text-gray-700">{gift.teams}</p>
        </div>

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
  );
}

export default GiftDetail;
