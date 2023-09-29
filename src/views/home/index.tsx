import React, { FC, useState } from 'react';

// Define an interface for the image data
interface ImageData {
  name: string;
  src: string;
  link: string;
}



// Define an array of image data
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


export const BasicsView: FC = () => {
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);

  const handleImageClick = (image: ImageData) => {
    setSelectedImage(image);
  };

  const handleModalClose = () => {
    setSelectedImage(null);
  };

  return (
    <>
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
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-black p-4 rounded-lg flex">
            <img src={selectedImage.src} alt={selectedImage.name} style={{ width: '600px', height: '600px' }} />
            <div className="ml-4">
              <h2 className="text-2xl font-bold">{selectedImage.name}</h2>
              <p className="mt-2">
                DESCRIPTION WRITEN HERE
              </p>
              <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                <a href={selectedImage.link} target="_blank" rel="noopener noreferrer">
                  Page function(edited to send money ltr?)
                </a>
              </button>
              <button className="mt-4 ml-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={handleModalClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

