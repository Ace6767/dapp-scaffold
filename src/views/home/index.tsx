import { FC } from 'react';

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
  return (
    <div className="flex flex-wrap justify-center">
      {imageData.map((image) => (
        <a href={image.link} key={image.name}>
          <div className="m-4">
            <img src={image.src} alt={image.name} style={{ width: '300px', height: '300px' }} />
            <p className="text-center">{image.name}</p>
          </div>
        </a>
      ))}
    </div>
  );
};