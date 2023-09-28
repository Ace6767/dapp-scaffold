import { FC, useState } from 'react';

export const HomeView: FC = () => {
  // State for controlling the donation modal
  const [isDonatorModalOpen, setDonatorModalOpen] = useState(false);

  // State for storing donation information
  const [donationInfo, setDonationInfo] = useState({
    name: '',
    email: '',
    description: '',
    snapReportImage: null,
    fundTarget: 0,
    featuredImage: '',
  });

  // Function to open the donation modal
  const openDonatorModal = () => {
    setDonatorModalOpen(true);
  };

  // Function to close the donation modal
  const closeDonatorModal = () => {
    setDonatorModalOpen(false);
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
    // Handle the donation submission logic here
    closeDonatorModal();
  };

// Styles for input elements
const inputStyle = {
  color: 'black',
  width: '100%',
  border: '1px solid #ccc',
  borderRadius: '4px',
  padding: '8px',
  marginBottom: '10px',
};

// Styles for the donation modal
const popupStyle: React.CSSProperties = {
  maxWidth: '400px',
  maxHeight: '400px',
  margin: '0 auto',
  overflowY: 'auto', // Allow vertical scrolling if content exceeds the container height
  opacity: isDonatorModalOpen ? 1 : 0, // Apply opacity 0 when modal is closed
  transition: 'opacity 0.3s ease-in', // Add a fade-in transition
  background: 'white', // Change background color to white
  borderRadius: '8px', // Add rounded corners
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Add a subtle box shadow
  padding: '20px', // Increase padding for a cleaner look
};

// Styles for the root container with background image
const rootStyle: React.CSSProperties = {
  backgroundImage: `url('https://png.pngtree.com/thumb_back/fh260/back_our/20190619/ourmid/pngtree-love-charity-crowdfunding-public-welfare-poster-publicity-board-image_137995.jpg')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
  width: '100vw', // Set the width to 100vw (viewport width)
  height: '100vh', // Set the height to 100vh (viewport height)
  overflowX: 'hidden', // Hide horizontal scrollbar if needed
  position: 'relative', // Added to position the logo and button
};

// Styles for the header text "CoinForCause"
const headerStyle: React.CSSProperties = {
  position: 'absolute',
  top: '20px',
  left: '20px', // Adjust the left position as needed
  color: 'black', // Set to black
  fontSize: '36px', // Increase font size
  fontWeight: 'bold', // Set to bold
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // Add text shadow
};

// Styles for the button container
const buttonContainerStyle: React.CSSProperties = {
  position: 'absolute',
  top: '90px', // Adjust the top position as needed
  left: '50%',
  transform: 'translateX(-50%)', // Center align horizontally
};

// Styles for the "I want to become a donator" button
const buttonStyle: React.CSSProperties = {
  backgroundColor: '#00BFFF', // Background color
  color: 'white', // Text color
  padding: '12px 24px', // Padding
  border: 'none', // Remove border
  borderRadius: '4px', // Rounded corners
  cursor: 'pointer', // Cursor style
  fontSize: '18px', // Font size
  fontWeight: 'bold', // Font weight
  marginTop: '10px', // Margin at the top
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', // Add a subtle box shadow
  transition: 'background-color 0.3s ease-in', // Add a hover effect
};

// Styles for the star icon
const starStyle: React.CSSProperties = {
  fontSize: '24px', // Font size
  marginLeft: '5px', // Margin on the left side
  verticalAlign: 'middle', // Align vertically with text
};

return (
  <div className="md:hero mx-auto p-4" style={rootStyle}>
    <div className="md:hero-content flex flex-col">
      <div style={headerStyle}>CoinForCause</div>
      <div style={buttonContainerStyle}>
        <button
          onClick={openDonatorModal}
          style={buttonStyle}
          className="bg-indigo-500 text-white font-semibold py-2 px-4 rounded hover:bg-indigo-600 cursor-pointer"
        >
          I want to become a fundraiser
          <span style={starStyle} role="img" aria-label="Star Icon">
            ⭐️
          </span>
        </button>
      </div>
    </div>
    {isDonatorModalOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-4 shadow-lg rounded-lg" style={popupStyle}>
          <h2 className="text-2xl font-semibold mb-4">Donation Information</h2>
          <div className="mb-4">
            <label className="block text-gray-600">Name:</label>
            <input
              type="text"
              name="name"
              value={donationInfo.name}
              onChange={handleInputChange}
              style={inputStyle}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600">Email address:</label>
            <input
              type="email"
              name="email"
              value={donationInfo.email}
              onChange={handleInputChange}
              style={inputStyle}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600">Description of the fundraiser:</label>
            <input
              name="description"
              value={donationInfo.description}
              onChange={handleInputChange}
              style={inputStyle}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600">Please snap your report as a proof of your description:</label>
            <input
              type="file"
              name="snapReportImage"
              accept="image/*"
              onChange={handleImageUpload}
              style={inputStyle}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600">Fund target (SOL):</label>
            <input
              type="number"
              name="fundTarget"
              value={donationInfo.fundTarget}
              onChange={handleInputChange}
              style={inputStyle}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600">Featured image:</label>
            <input
              type="file"
              name="featuredImage"
              accept="image/*"
              onChange={handleInputChange}
              style={inputStyle}
            />
          </div>
          <div className="text-right">
            <button
              onClick={handleDonationSubmit}
              className="bg-indigo-500 text-white font-semibold py-2 px-4 rounded hover:bg-indigo-600 cursor-pointer"
            >
              Submit Donation
            </button>
            <button
              onClick={closeDonatorModal}
              className="ml-2 text-gray-600 hover:text-gray-800 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
);
};

