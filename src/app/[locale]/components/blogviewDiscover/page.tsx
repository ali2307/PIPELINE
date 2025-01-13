"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useStore } from "@/app/store";

const BlogviewDiscover: React.FC = ({}) => {
  const router = useRouter();
  const { carditem, title } = useStore((state) => state.blogViewDiscover);

  const handleCardClick = (slug: string, redirection_url: string) => {
    router.push(`${redirection_url}/${slug}`);
  };
  return (
    <div className="bg-[#fbfbfb] md:pt-10 pt-2 mb-16">
      <section className="container xl:w-[1408px] mx-auto">
        <div className="text-black md:text-3xl text-2xl absolute font-extrabold font-optima uppercase z-10 leading-[57.72px] p-4">
          {title ? title : "Discover More"}{" "}
        </div>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-2 p-3">
          {carditem.slice(0, 3).map((item: any) => (
            <motion.div
              whileHover={{ scale: 1.07 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              key={item.id}
              className="relative py-16 cursor-pointer"
              onClick={() => handleCardClick(item.slug, item.redirection_url)}
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${item.file?.[0]?.img_md_url}`}
                alt=""
                className="md:w-[400px] md:min-h-[265px] md:max-h-[265px] h-full w-full"
                width={389}
                height={265}
              />
              <div className="lg:w-[288px] w-full top-[72%] 2xl:left-28 absolute bg-white px-10 lg:max-h-24 md:max-h-32 max-h-36 p-5 sm:border">
                <p className="text-black lg:text-[25px] md:text-[20px] text-[20px] mb-2 font-normal capitalize leading-8 font-optima min-h-16 max-h-16 overflow-hidden max-w-72">
                  {item.title}
                </p>

                <span className="text-sky-700 lg:text-xl md:text-lg text-md font-medium font-optima">
                  {item.created_date}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BlogviewDiscover;
