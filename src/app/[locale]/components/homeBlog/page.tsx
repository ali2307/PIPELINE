"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useStore } from "./../../../store/index";

const HomeBlog: React.FC = () => {
  const { title, carditem } = useStore((state) => state.homeBlog);
  const blogPosts = carditem?.slice(0, 3);
  const router = useRouter();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  const handleCardClick = (slug: string, redirection_url: string) => {
    router.push(`${redirection_url}/${slug}`);
  };

  return (
    <section className="relative pb-10 pt-[2rem] px-3">
      <h2 className="2xl:text-[44px] text-2xl leading-tight font-bold text-center md:pb-8 text-black mb-1">
        {title}
      </h2>
      <div className="container relative xl:w-[1075px] w-full mx-auto">
        {/* Desktop View */}
        <div className="hidden md:block lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {blogPosts.map((item: any, index: number) => (
              <motion.div
                viewport={{ once: true }}
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                key={item.id}
                className="shadow cursor-pointer rounded-bl-[5px] rounded-br-[5px] overflow-hidden my-6"
                onClick={() => handleCardClick(item.slug, item.redirection_url)}
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${item.file?.[0]?.img_md_url}`}
                  width={335}
                  height={226}
                  alt="Discover Image"
                  className="w-[335px] min-h-[226px] max-h-[226px] bg-cover object-cover bg-no-repeat transition-transform duration-500 hover:scale-110 overflow-hidden"
                  layout="responsive"
                  objectFit="cover"
                />
                <div className="py-4 pb-5 px-6 lg:h-[228px] md:h-[280px]">
                  <h3 className="lg:text-base text-xl text-black lg:max-h-[4.5rem] lg:min-h-[4.5rem] overflow-hidden line-clamp-3 min-h-[4.5rem] max-h-[4.8rem] font-medium max-w-md">
                    {item.title}
                  </h3>
                  <p
                    className="lg:text-sm text-base text-black mt-4 mb-5 lg:min-h-16 lg:max-h-16 min-h-12 max-h-24 overflow-hidden capitalize"
                    dangerouslySetInnerHTML={{
                      __html: item.content,
                    }}
                  ></p>
                  <a>
                    <span className="text-black lg:text-sm text-base">
                      READ MORE »
                    </span>
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Mobile View */}
        <div className="embla-container block md:hidden">
          <div className="embla" ref={emblaRef}>
            <div className="embla__container flex">
              {blogPosts.map((item: any, index: number) => (
                <div
                  key={index}
                  className="embla__slide w-[33.33%] flex-shrink-0 cursor-pointer"
                  onClick={() =>
                    handleCardClick(item.slug, item.redirection_url)
                  }
                >
                  <div className="shadow cursor-pointer rounded-bl-[5px] rounded-br-[5px] overflow-hidden my-6">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${item.file?.[0]?.img_md_url}`}
                      width={335}
                      height={226}
                      alt="Discover Image"
                      className="w-[335px] min-h-[226px] max-h-[226px] bg-cover object-cover bg-no-repeat transition-transform duration-500 hover:scale-110 overflow-hidden"
                      layout="responsive"
                      objectFit="cover"
                    />
                    <div className="py-4 pb-5 px-6 lg:h-[228px] h-[278px]">
                      <h3 className="lg:text-base text-xl text-black lg:max-h-[4.5rem] lg:min-h-[4.5rem] min-h-[5rem] max-h-[5rem]  overflow-hidden line-clamp-3 font-medium max-w-md">
                        {item.title}
                      </h3>
                      <p
                        className="lg:text-sm text-base text-black mt-4 mb-5 lg:min-h-16 lg:max-h-16 min-h-12 max-h-24 overflow-hidden capitalize"
                        dangerouslySetInnerHTML={{
                          __html: item.content,
                        }}
                      ></p>
                      <a>
                        <span className="text-black lg:text-sm text-base">
                          READ MORE »
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeBlog;
