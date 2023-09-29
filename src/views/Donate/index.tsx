import React, { FC, useState } from 'react';

interface DonateProps {
  closePopup: () => void;
}

export const Donate: FC<DonateProps> = ({ closePopup }) => {
  const [donationAmount, setDonationAmount] = useState('');
  const [hasInput, setHasInput] = useState(false);
  const [extraChargesAmount, setExtraChargesAmount] = useState(0);
  const [gasFee, setGasFee] = useState(0);
  const [showCostBreakdown, setShowCostBreakdown] = useState(false);

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
      const finalCost = parsedAmount + gasFee + extraChargesAmount;
      alert(`${finalCost.toFixed(4)} sol has been transferred successfully.`);
      closePopup();
    } else {
      alert('Please enter a valid donation amount.');
    }
  };

  const rootStyle: React.CSSProperties = {
    backgroundImage: `url('https://png.pngtree.com/thumb_back/fh260/back_our/20190619/ourmid/pngtree-love-charity-crowdfunding-public-welfare-poster-publicity-board-image_137995.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    width: '100vw',
    height: '100vh',
    overflowX: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <div className="md:hero mx-auto p-4" style={rootStyle}>
      <div className="md:hero-content flex flex-col">
        <div className="text-center">
          {/* Donation popup content */}
          {showCostBreakdown && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-white p-6 shadow-lg rounded-lg relative">
                <button
                  onClick={closePopup}
                  id="close-btn"
                  className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 cursor-pointer"
                >
                  X
                </button>
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
                    <span className="text-xs text-indigo-600 cursor-pointer">
                      <p>(Hover to display breakdown cost)</p>
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
                <div id="result" className="mt-4"></div>
              </div>
            </div>
          )}
          {/* End of Donation popup content */}
        </div>
      </div>
    </div>
  );
};
