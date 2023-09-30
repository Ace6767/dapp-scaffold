import React, { FC, useState } from 'react';

interface BasicsViewProps {
  openPopup: () => void;
}

interface ImageData {
  name: string;
  src: string;
  link: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
}

const imageData: ImageData[] = [
  {
    name: 'Bob Ross',
    src: 'https://images.prismic.io/hireup/afa55aee-b1db-486b-ad30-71557e58fe28_Steve+Ralph_broken+arm.JPG?auto=compress,format&rect=0,944,3024,2532&w=3024&h=2532',
    link: 'https://example.com/page1',
    description: 'Bob Ross has suffered great injuries and needs a donation for his medical fee.',
    targetAmount: 15,
    currentAmount: 7.7,
  },
  {
    name: 'Burnt House',
    src: 'https://media.istockphoto.com/id/171255212/photo/burnt-house.jpg?s=612x612&w=0&k=20&c=Of5iL_GKFPi2bSeZFF4LLB5LCGzbaIOOqrppsrPABsY=',
    link: 'https://example.com/page2',
    description: 'The fire has left the family shelterless, and money is needed for rebuilding.',
    targetAmount: 8,
    currentAmount: 3.2,
  },
  {
    name: 'College Funding',
    src: 'https://media.discordapp.net/attachments/804328230378012703/1157052005404131408/image.png?ex=65173427&is=6515e2a7&hm=1463a29d1009619e2e11fb4b6057f3ae9dc1699962967802e17778e38ffa085e&=&width=584&height=545',
    link: 'https://example.com/page3',
    description: 'A teenage boy who wants to pursue his studies but lacks financial support.',
    targetAmount: 12,
    currentAmount: 8,
  },
];

export const BasicsView: FC<BasicsViewProps> = ({ openPopup }) => {
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [isDonatePopupOpen, setIsDonatePopupOpen] = useState(false);
  const [donationAmount, setDonationAmount] = useState('');
  const [hasInput, setHasInput] = useState(false);
  const [extraChargesAmount, setExtraChargesAmount] = useState(0);
  const [gasFee, setGasFee] = useState(0);
  const [showCostBreakdown, setShowCostBreakdown] = useState(false);

  const handleImageClick = (image: ImageData) => {
    setSelectedImage(image);
  };

  const handleModalClose = () => {
    setSelectedImage(null);
    setIsDonatePopupOpen(false);
  };

  const handleDonateClick = () => {
    setIsDonatePopupOpen(true);
  };

  const handleDonationInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = e.target.value;
    setDonationAmount(amount);

    const parsedAmount = parseFloat(amount);
    if (!isNaN(parsedAmount) && parsedAmount > 0) {
      setHasInput(true);
      const fixedGasFee = 0.0001;
      const charges = (5 / 1000) * parsedAmount;
      setGasFee(fixedGasFee);
      setExtraChargesAmount(charges);
    } else {
      setHasInput(false);
      setGasFee(0);
      setExtraChargesAmount(0);
    }
  };

  const handleConfirmClick = () => {
    const parsedAmount = parseFloat(donationAmount);
    if (!isNaN(parsedAmount) && parsedAmount > 0) {
      // Don't close the modal here
      const finalCost = parsedAmount + gasFee + extraChargesAmount;
      alert(`${finalCost.toFixed(4)} sol has been transferred successfully.`);
    } else {
      alert('Please enter a valid donation amount.');
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: `url('https://cdn.wallpapersafari.com/36/1/Qq7bWJ.jpeg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        width: '100vw',
        minHeight: '100vh',
        overflowX: 'hidden',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div className="p-4 text-center flex-grow">
        <h1 className="text-4xl font-semibold text-white-800 mb-4">Donation Images</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {imageData.map((image) => (
            <div
              key={image.name}
              className="bg-white p-4 rounded-lg cursor-pointer transition-transform transform hover:scale-105"
              onClick={() => handleImageClick(image)}
            >
              <img
                src={image.src}
                alt={image.name}
                className="w-full h-40 object-cover rounded-md mb-2"
              />
              <p className="text-lg font-semibold text-gray-800 text-black">{image.name}</p>
              <div className="flex justify-between mt-2">
                <p className="text-gray-600">Target: {image.targetAmount} SOL</p>
                <p className="text-gray-600">Raised: {image.currentAmount} SOL</p>
              </div>
              <div className="relative mt-2 h-4 bg-gray-200 rounded-full">
                <div
                  className="absolute h-4 bg-indigo-600 rounded-full"
                  style={{
                    width: `${(image.currentAmount / image.targetAmount) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-4 rounded-lg relative max-w-xl w-full">
            <img
              src={selectedImage.src}
              alt={selectedImage.name}
              className="w-full h-auto object-cover rounded-md mb-4 max-height-800" // Updated image styling
              style={{ maxHeight: '60vh' }} // Limit the height to 60% of the viewport height
            />
            <h2 className="text-2xl font-bold mb-2 text-gray-800">{selectedImage.name}</h2>
            <p className="text-gray-600">{selectedImage.description}</p>
            <div className="mt-4 flex justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleDonateClick}
              >
                Donate Now
              </button>
              <button
                onClick={handleModalClose}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {isDonatePopupOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-10 rounded-lg relative max-w-xl w-full">
            <h2 className="text-3xl font-semibold mb-4 text-indigo-600">Donation Information</h2>
            <div className="mb-4">
              <label className="block text-gray-600 text-lg">Donation Amount:</label>
              <input
                type="text"
                id="donation-input"
                value={donationAmount}
                onChange={handleDonationInputChange}
                className="w-full border border-black rounded-lg px-4 py-2 text-lg"
                style={{ color: '#333' }}
              />
            </div>
            {hasInput && (
              <div className="mb-4 text-gray-600">
                Total Price: {(parseFloat(donationAmount) + gasFee + extraChargesAmount).toFixed(4)} sol{' '}
                <span
                  className="text-xs text-indigo-600 cursor-pointer"
                  onClick={() => setShowCostBreakdown(!showCostBreakdown)}
                >
                  (Click to display breakdown cost)
                </span>
                {showCostBreakdown && (
                  <div className="mt-2">
                    <div>Gas Fee: {gasFee.toFixed(4)} sol</div>
                    <div>Extra Charges: {extraChargesAmount.toFixed(4)} sol</div>
                  </div>
                )}
              </div>
            )}
            <div className="text-middle">
              {hasInput && (
                <button
                  onClick={handleConfirmClick}
                  id="confirm-btn"
                  className="absolute bottom-4 left-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                >
                  Confirm Donation
                </button>
              )}
            </div>
            <button
              onClick={handleModalClose}
              className="absolute bottom-4 right-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BasicsView;
