import React, { FC, useState } from 'react';

interface BasicsViewProps {
  openPopup: () => void;
}

interface ImageData {
  name: string;
  src: string;
  link: string;
}

const imageData: ImageData[] = [
  {
    name: 'Bob Ross',
    src: 'https://images.prismic.io/hireup/afa55aee-b1db-486b-ad30-71557e58fe28_Steve+Ralph_broken+arm.JPG?auto=compress,format&rect=0,944,3024,2532&w=3024&h=2532',
    link: 'https://example.com/page1',
  },
  {
    name: 'Burnt House',
    src: 'https://media.istockphoto.com/id/171255212/photo/burnt-house.jpg?s=612x612&w=0&k=20&c=Of5iL_GKFPi2bSeZFF4LLB5LCGzbaIOOqrppsrPABsY=',
    link: 'https://example.com/page2',
  },
  {
    name: 'College Funding',
    src: 'https://media.discordapp.net/attachments/804328230378012703/1157052005404131408/image.png?ex=65173427&is=6515e2a7&hm=1463a29d1009619e2e11fb4b6057f3ae9dc1699962967802e17778e38ffa085e&=&width=584&height=545',
    link: 'https://example.com/page3',
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
    <div style={{ height: '100vh', overflow: 'hidden' }}>
      <div className="flex flex-wrap justify-center">
        {imageData.map((image) => (
          <div className="m-4" key={image.name}>
            <img
              src={image.src}
              alt={image.name}
              style={{ width: '300px', height: '300px', cursor: 'pointer' }}
              onClick={() => handleImageClick(image)}
            />
            <p className="text-center font-bold">{image.name}</p>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-4 rounded-lg relative">
            <img
              src={selectedImage.src}
              alt={selectedImage.name}
              style={{ maxWidth: '80vw', maxHeight: '70vh' }}
            />
            <div>
              <h2 className="text-xl font-bold mt-2">{selectedImage.name}</h2>
              <button
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleDonateClick}
              >
                Donate Now
              </button>
            </div>
            <button
              onClick={handleModalClose}
              className="absolute bottom-0 right-0 mb-5 mr-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {isDonatePopupOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-4 rounded-lg relative">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-600">Donation Information</h2>
            <div className="mb-4">
              <label className="block text-gray-600">Donation Amount:</label>
              <input
                type="text"
                id="donation-input"
                value={donationAmount}
                onChange={handleDonationInputChange}
                className="w-full border border-black rounded-lg px-4 py-2"
                style={{ color: 'black' }}
              />
            </div>
            {hasInput && (
              <div className="mb-4 text-gray-600">
                Total Price: {(parseFloat(donationAmount) + gasFee + extraChargesAmount).toFixed(4)} sol{' '}
                <span
                  className="text-xs text-indigo-600 cursor-pointer"
                  onClick={() => setShowCostBreakdown(!showCostBreakdown)}
                >
                  <p>(Click to display breakdown cost)</p>
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
                  className="bg-indigo-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-600 cursor-pointer shadow-md"
                >
                  Confirm Donation
                </button>
              )}
            </div>
            <button
              onClick={handleModalClose}
              className="absolute bottom-0 right-0 mb-8 mr-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded cursor-pointer"
            >
              Close
            </button>
            <div id="result" className="mt-4"></div>
          </div>
        </div>
      )}
    </div>
  );
};