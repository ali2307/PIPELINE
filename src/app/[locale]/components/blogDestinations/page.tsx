"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useStore } from "./../../../store/index";
import { motion, AnimatePresence } from "framer-motion";
import { ZERO } from "@/app/utils/constants";

const BlogDestinations: React.FC = () => {
  const { title, carditem } = useStore((state) => state.blogListing);
  const router = useRouter();
  const handleCardClick = (slug: string, redirection_url: string) => {
    // Implement click handling logic here (e.g., navigate to blog details)
    router.push(`${redirection_url}/${slug}`);
  };

  if (carditem.length == ZERO) {
    return (
      <>
        <section
          className="flex flex-col justify-center items-center pt-5 lg:pt-10 md:pt-40 mt-0 w-full relative"
          id="image-section"
        >
          <div className="w-full flex flex-col justify-center items-center p-4">
            <div className="col-span-12 flex flex-col justify-center items-center text-center text-black text-[16px] pt-4 md:text-[30px] font-medium font-optima leading-tight max-h-24 overflow-hidden md:leading-[38.48px]">
              <h2>No Blogs are available</h2>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <div className="md:w-[30%] md:h-[319px] h-[20px] w-full bg-cover object-cover lg:py-20 lg:px-40 px-0 py-0 md:absolute bg-zinc-300 opacity-30"></div>
      <section className="container relative mx-auto">
        <h2 className="text-black text-xl lg:text-5xl md:text-3xl md:absolute font-black font-optima uppercase lg:left-[18rem] md:p-0 p-4 text-center md:py-24 py-5 leading-tight  md:mb-4">
          {title}
        </h2>
        <div className="mx-auto md:pt-[12rem] md:pb-[6rem] 2xl:px-64">
          <div className="lg:grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-10 gap-8">
            {carditem &&
              carditem.length > ZERO &&
              carditem.map((item: any) => (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  key={item.id}
                  className="relative py-2 cursor-pointer mb-6 mx-auto "
                  onClick={() =>
                    handleCardClick(item.slug, item.redirection_url)
                  }
                >
                  <div className="2xl:w-[510px] lg:w-[475px] w-full min-h-[346px] max-h-[346px] relative">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${item.file?.[0]?.img_md_url}`}
                      // width={510}

                      // height={346}
                      alt="Discover Image"
                      className=" "
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>

                  <div className="w-full xl:w-[428px]  sm:border md:w-full top-[74%] left-1/2 md:left-[50%] 2xl:left-[60%] transform -translate-x-1/2 absolute bg-white px-6 md:px-20 py-6 md:py-6">
                    <p className="text-black text-lg lg:text-[25px] md:text-[20px] mb-2  font-normal capitalize leading-snug md:leading-7 font-optima max-h-[1.6rem] md:max-h-20 max-w-[21rem] overflow-hidden  line-clamp-2">
                      {item.title}
                    </p>
                    <span className="text-sky-700 text-base md:text-md font-medium font-optima">
                      {item.created_at}
                    </span>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
};
export default BlogDestinations;
