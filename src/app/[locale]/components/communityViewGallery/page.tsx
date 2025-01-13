"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useStore } from "./../../../store/index";

const CommunityViewGallery: React.FC = () => {
  const { title, slides } = useStore((state) => state.communityViewGallery);
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // Track the selected image

  const openModal = (imageUrl: string) => setSelectedImage(imageUrl); // Open modal with image URL
  const closeModal = () => setSelectedImage(null); // Close the modal

  return (
    <>
      <section className="relative py-8 sm:px-4">
        <h4 className="text-center text-black lg:text-[42px] md:text-[30px] text-[25px] font-normal font-optima uppercase mb-4">
          {title}
        </h4>

        <div className="relative md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2">
          {/* First image */}
          {slides?.slice(0, 1).map((image: any) => (
            <div
              className="md:col-span-1 col-span-12 row-span-1 cursor-pointer"
              key={image.id}
              onClick={() =>
                openModal(
                  `${process.env.NEXT_PUBLIC_STORAGE_URL}/${image.img_md_url}`
                )
              }
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${image.img_md_url}`}
                alt="Large Image"
                className="md:h-[650px] h-32 w-full bg-cover object-cover"
                width={634}
                height={650}
              />
            </div>
          ))}

          {/* Second section */}
          <div className="w-full flex flex-col gap-2 sm:mt-2">
            <div className="flex flex-row gap-2">
              <div className="flex flex-col gap-2">
                {slides?.slice(1, 2).map((image: any) => (
                  <div
                    className="md:col-span-1 col-span-12 row-span-2 cursor-pointer"
                    key={image.id}
                    onClick={() =>
                      openModal(
                        `${process.env.NEXT_PUBLIC_STORAGE_URL}/${image.img_md_url}`
                      )
                    }
                  >
                    <Image
                      src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${image.img_md_url}`}
                      alt="Large Image"
                      className="md:w-[468px] md:h-[170px] w-full bg-cover object-cover"
                      width={468}
                      height={170}
                    />
                  </div>
                ))}

                {slides?.slice(2, 3).map((image: any) => (
                  <div
                    className="md:col-span-1 col-span-6 row-span-2 cursor-pointer"
                    key={image.id}
                    onClick={() =>
                      openModal(
                        `${process.env.NEXT_PUBLIC_STORAGE_URL}/${image.img_md_url}`
                      )
                    }
                  >
                    <Image
                      src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${image.img_md_url}`}
                      alt="Large Image"
                      className="md:w-[468px] md:h-[164px] bg-cover  w-full object-cover"
                      width={468}
                      height={164}
                    />
                  </div>
                ))}
              </div>

              {slides?.slice(3, 4).map((image: any) => (
                <div
                  className="md:col-span-1 col-span-12 row-span-2 cursor-pointer "
                  key={image.id}
                  onClick={() =>
                    openModal(
                      `${process.env.NEXT_PUBLIC_STORAGE_URL}/${image.img_md_url}`
                    )
                  }
                >
                  <Image
                    src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${image.img_md_url}`}
                    alt="Large Image"
                    className="md:w-[565px] md:h-[343px] bg-cover w-full h-full object-cover"
                    width={435}
                    height={343}
                  />
                </div>
              ))}
            </div>

            <div className="flex md:flex-row flex-col gap-2">
              {slides?.slice(4, 5).map((image: any) => (
                <div
                  className="col-span-2 row-span-2 cursor-pointer"
                  key={image.id}
                  onClick={() =>
                    openModal(
                      `${process.env.NEXT_PUBLIC_STORAGE_URL}/${image.img_md_url}`
                    )
                  }
                >
                  <Image
                    src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${image.img_md_url}`}
                    alt="Large Image"
                    className="md:w-[742px] md:h-[298px] bg-cover w-full object-cover"
                    width={742}
                    height={298}
                  />
                </div>
              ))}

              {slides?.slice(5, 6).map((image: any) => (
                <div
                  className="col-span-2 row-span-2 cursor-pointer"
                  key={image.id}
                  onClick={() =>
                    openModal(
                      `${process.env.NEXT_PUBLIC_STORAGE_URL}/${image.img_md_url}`
                    )
                  }
                >
                  <Image
                    src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${image.img_md_url}`}
                    alt="Large Image"
                    className="md:w-[300px] md:h-[298px] w-full h-32 bg-cover object-cover"
                    width={244}
                    height={298}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Last image */}
          {slides?.slice(6, 7).map((image: any) => (
            <div
              className="md:col-span-1 col-span-11 row-span-1 cursor-pointer sm:mt-2"
              key={image.id}
              onClick={() =>
                openModal(
                  `${process.env.NEXT_PUBLIC_STORAGE_URL}/${image.img_md_url}`
                )
              }
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_STORAGE_URL}/${image.img_md_url}`}
                alt="Large Image"
                className="md:h-[650px] w-full h-32 bg-cover object-cover"
                width={634}
                height={650}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div className="relative">
            <Image
              src={selectedImage}
              alt="Selected Image"
              className="object-contain w-auto h-auto max-w-[90vw] max-h-[90vh]"
              width={800}
              height={800}
            />
            <button
              className="absolute top-2 right-2 text-white text-2xl"
              onClick={closeModal}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CommunityViewGallery;
