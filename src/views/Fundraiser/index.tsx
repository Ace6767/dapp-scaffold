import React, { FC, useState } from 'react';

export const HomeView: FC = () => {
  // State for controlling the donation form visibility
  const [isDonationFormVisible, setDonationFormVisible] = useState(false);

  // State for controlling the submission confirmation popup visibility
  const [isSubmissionPopupVisible, setSubmissionPopupVisible] = useState(false);

  // State for storing donation information
  const [donationInfo, setDonationInfo] = useState({
    name: '',
    email: '',
    walletAddress: '',
    description: '',
    snapReportImage: null,
    fundTarget: 0,
    featuredImage: '',
  });

  // Function to show the donation form
  const showDonationForm = () => {
    setDonationFormVisible(true);
  };

  // Function to handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDonationInfo({
      ...donationInfo,
      [name]: value,
    });
  };

  // Function to handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    setDonationInfo({
      ...donationInfo,
      snapReportImage: file,
    });
  };

  // Function to handle donation submission
  const handleDonationSubmit = () => {
    // Display the submission confirmation popup
    setSubmissionPopupVisible(true);

    // After a delay, hide the submission confirmation popup and reload the webpage
    setTimeout(() => {
      // Hide the submission confirmation popup
      setSubmissionPopupVisible(false);

      // Reset the webpage
      window.location.reload();
    }, 500); // Adjust the delay time (in milliseconds) as needed
  };

  // Styles for input elements
  const inputStyle = {
    color: 'black',
    width: '100%',
    border: '2px solid #000',
    borderRadius: '4px',
    padding: '12px',
    marginBottom: '20px',
    fontSize: '18px',
    fontWeight: 'bold',
  };

  // Styles for the root container with background image
  const rootStyle: React.CSSProperties = {
    backgroundImage: `url('https://images.unsplash.com/photo-1663497653290-1b8f327096f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80')`,
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
    flexDirection: 'column', // Center items vertically
  };

  // Styles for the submission confirmation popup
  const submissionPopupStyle: React.CSSProperties = {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
    color: 'white',
    fontSize: '24px',
    fontWeight: 'bold',
  };

  return (
    <div className="md:hero mx-auto p-4" style={rootStyle}>
      <div className="md:hero-content">
        <div>
          <h2 className="text-3xl font-semibold mb-6" style={{ color: 'black', fontWeight: 'bold' }}>Donation Information</h2>
          <div className="mb-6">
            <label className="block text-gray-600" style={{ color: 'black', fontWeight: 'bold' }}>Name:</label>
            <input
              type="text"
              name="name"
              value={donationInfo.name}
              onChange={handleInputChange}
              style={inputStyle}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-600" style={{ color: 'black', fontWeight: 'bold' }}>Email address:</label>
            <input
              type="email"
              name="email"
              value={donationInfo.email}
              onChange={handleInputChange}
              style={inputStyle}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-600" style={{ color: 'black', fontWeight: 'bold' }}>Wallet address:</label>
            <input
              type="Walletaddress"
              name="Walletaddress"
              value={donationInfo.walletAddress}
              onChange={handleInputChange}
              style={inputStyle}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-600" style={{ color: 'black', fontWeight: 'bold' }}>Description of the fundraiser:</label>
            <input
              name="description"
              value={donationInfo.description}
              onChange={handleInputChange}
              style={inputStyle}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-600" style={{ color: 'black', fontWeight: 'bold' }}>Please snap your report as proof of your description:</label>
            <input
              type="file"
              name="snapReportImage"
              accept="image/*"
              onChange={handleImageUpload}
              style={inputStyle}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-600" style={{ color: 'black', fontWeight: 'bold' }}>Fund target (SOL):</label>
            <input
              type="number"
              name="fundTarget"
              value={donationInfo.fundTarget}
              onChange={handleInputChange}
              style={inputStyle}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-600" style={{ color: 'black', fontWeight: 'bold' }}>Featured image:</label>
            <input
              type="file"
              name="featuredImage"
              accept="image/*"
              onChange={handleImageUpload}
              style={inputStyle}
            />
          </div>
          <div className="text-center">
            <button
              onClick={handleDonationSubmit}
              className="bg-black text-white font-semibold py-3 px-6 rounded hover-bg-gray-800 cursor-pointer"
            >
              Submit Donation
            </button>
          </div>
        </div>
      </div>

      {/* Submission confirmation popup */}
      {isSubmissionPopupVisible && (
        <div style={submissionPopupStyle}>
          <p>Your submission is recorded.</p>
        </div>
      )}
    </div>
  );
};
