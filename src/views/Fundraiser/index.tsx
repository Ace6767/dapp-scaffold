import React, { FC, useState } from 'react';

export const HomeView: FC = () => {
  const [isDonationFormVisible, setDonationFormVisible] = useState(false);
  const [isSubmissionPopupVisible, setSubmissionPopupVisible] = useState(false);

  const [donationInfo, setDonationInfo] = useState({
    name: '',
    email: '',
    walletAddress: '',
    description: '',
    snapReportImage: null,
    fundTarget: 0,
    featuredImage: '',
  });

  const showDonationForm = () => {
    setDonationFormVisible(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDonationInfo({
      ...donationInfo,
      [name]: value,
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    setDonationInfo({
      ...donationInfo,
      snapReportImage: file,
    });
  };

  const handleDonationSubmit = () => {
    setSubmissionPopupVisible(true);

    setTimeout(() => {
      setSubmissionPopupVisible(false);
      window.location.reload();
    }, 500);
  };

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
    flexDirection: 'column',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    fontFamily: 'Arial, sans-serif',
  };

  const formContainerStyle: React.CSSProperties = {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '30px',
    borderRadius: '10px',
    textAlign: 'center',
    boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.4)',
    animation: 'fadeInUp 0.8s ease',
  };

  const inputStyle: React.CSSProperties = {
    color: 'black',
    width: '100%',
    border: '2px solid #000',
    borderRadius: '4px',
    padding: '14px',
    marginBottom: '20px',
    fontSize: '18px',
    fontWeight: 'bold',
  };

  const textareaStyle: React.CSSProperties = {
    ...inputStyle,
    height: '120px',
    resize: 'none',
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: '#007BFF',
    color: 'white',
    padding: '12px 24px',
    fontSize: '20px',
    fontWeight: 'bold',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease-in-out',
  };

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
      <div className="md:hero-content" style={formContainerStyle}>
        <div>
          <h2 className="text-4xl font-semibold mb-6" style={{ color: 'black', fontWeight: 'bold' }}>
            Donation Information
          </h2>
          <div className="mb-6">
            <input
              type="text"
              name="name"
              value={donationInfo.name}
              onChange={handleInputChange}
              placeholder="Your Name"
              style={inputStyle}
            />
          </div>
          <div className="mb-6">
            <input
              type="email"
              name="email"
              value={donationInfo.email}
              onChange={handleInputChange}
              placeholder="Email Address"
              style={inputStyle}
            />
          </div>
          <div className="mb-6">
            <input
              type="text"
              name="walletAddress"
              value={donationInfo.walletAddress}
              onChange={handleInputChange}
              placeholder="Wallet Address"
              style={inputStyle}
            />
          </div>
          <div className="mb-6">
            <textarea
              name="description"
              value={donationInfo.description}
              onChange={handleInputChange}
              placeholder="Description of the fundraiser"
              style={textareaStyle}
            />
          </div>
          <div className="mb-6">
            <input
              type="file"
              name="snapReportImage"
              accept="image/*"
              onChange={handleImageUpload}
              style={inputStyle}
            />
          </div>
          <div className="mb-6">
            <input
              type="number"
              name="fundTarget"
              value={donationInfo.fundTarget}
              onChange={handleInputChange}
              placeholder="Fund Target (SOL)"
              style={inputStyle}
            />
          </div>
          <div className="mb-6">
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
              style={buttonStyle}
            >
              Submit Donation
            </button>
          </div>
        </div>
      </div>
      {isSubmissionPopupVisible && (
        <div style={submissionPopupStyle}>
          <p>Your submission is recorded.</p>
        </div>
      )}
    </div>
  );
};
