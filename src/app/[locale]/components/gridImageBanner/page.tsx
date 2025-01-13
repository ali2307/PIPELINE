import Image from "next/image";
import React from "react";

interface Image {
  src: string;
  alt: string;
  img_md_url: any;
  imageUrl: string;
}
interface GridBannerProps {
  slides: Image[];
  className?: string;
}

const GridImageBanner: React.FC<GridBannerProps> = ({ slides, className }) => {
  const imageCount = slides.length;

  return (
    <div
      className={`grid grid-rows-1 gap-2`}
      style={{
        gridTemplateColumns: `repeat(${imageCount}, minmax(0, 1fr))`, // Dynamic column count
      }}
    >
      {slides.map((image, index) => (
        <div
          key={index}
          className={`${className} relative w-full  md:max-h-[584px] overflow-hidden`} // Adjust height as needed
        >
          <Image
            alt={image.alt}
            fill
            className="bg-cover object-cover"
            src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${image.img_md_url}`}
          />
        </div>
      ))}
    </div>
  );
};

export default GridImageBanner;
