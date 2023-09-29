import React, { FC, useState } from 'react';
import { Donate } from 'views/Donate';
interface BasicsViewProps {
  openPopup: () => void;
}

interface ImageData {
  name: string;
  src: string;
  link: string;
  description: string; // Add description property
}

const imageData: ImageData[] = [
  {
    name: 'Bob Ross Hospital Fund',
    src: 'https://images.prismic.io/hireup/afa55aee-b1db-486b-ad30-71557e58fe28_Steve+Ralph_broken+arm.JPG?auto=compress,format&rect=0,944,3024,2532&w=3024&h=2532',
    link: 'https://example.com/page1',
    description: 'Help support the Bob Ross Hospital Fund in providing medical care to those in need.',
  },
  {
    name: 'Lim\'s Family Fire Fund',
    src: 'https://media.istockphoto.com/id/171255212/photo/burnt-house.jpg?s=612x612&w=0&k=20&c=Of5iL_GKFPi2bSeZFF4LLB5LCGzbaIOOqrppsrPABsY=',
    link: 'https://example.com/page2',
    description: 'Contribute to the Lim Family Fire Fund to assist in rebuilding their home after a devastating fire.',
  },
  {
    name: 'Fund Alex\'s College Course ',
    src: 'https://media.discordapp.net/attachments/804328230378012703/1157052005404131408/image.png?ex=65173427&is=6515e2a7&hm=1463a29d1009619e2e11fb4b6057f3ae9dc1699962967802e17778e38ffa085e&=&width=584&height=545',
    link: 'https://example.com/page3',
    description: 'Support Alex in pursuing higher education by contributing to their college fund.',
  },
];

export const BasicsView: FC<BasicsViewProps> = ({ openPopup }) => {
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [isDonatePopupOpen, setIsDonatePopupOpen] = useState(false);

  const handleImageClick = (image: ImageData) => {
    setSelectedImage(image);
  };

  const handleModalClose = () => {
    setSelectedImage(null);
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
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900">
          <div className="bg-black p-4 rounded flex">
            <div>
              <img
                src={selectedImage.src}
                alt={selectedImage.name}
                style={{ maxWidth: '80vw', maxHeight: '70vh' }}
              />
            </div>
            <div className="flex flex-col justify-between ml-4">
              <div>
                <h2 className="text-2xl font-bold">{selectedImage.name}</h2> {/* Increase font size */}
                <p className="mt-2 text-lg">{selectedImage.description}</p> {/* Increase font size */}
              </div>
              <div>
                <button
                  className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => setIsDonatePopupOpen(true)}
                >
                  Donate Now
                </button>
                <button
                  className="mt-4 ml-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleModalClose}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


      {isDonatePopupOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900">
          <div className="bg-black p-4 rounded">
            <Donate closePopup={() => setIsDonatePopupOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
};