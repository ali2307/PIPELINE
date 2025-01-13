"use client";
import React from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useStore } from "./../../../store/index";
import { ZERO } from "@/app/utils/constants";
import { useRouter } from "next/navigation";

const TrendingBlog: React.FC = () => {
  const router = useRouter();
  const { title, carditem } = useStore((state) => state.blogTrending);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }, [Autoplay()]);

  const handleCardClick = (slug: string, redirection_url: string) => {
    // Implement click handling logic here (e.g., navigate to blog details)
    router.push(`${redirection_url}/${slug}`);
  };
  return (
    <>
      {carditem && carditem.length > ZERO && (
        <div className="embla">
          <div className="embla__viewport md:mt-12" ref={emblaRef}>
            <div className="embla__container">
              {carditem?.map((data: any) => (
                <div key={data.id} className="embla__slide">
                  <section
                    className="container grid grid-cols-1 mx-auto mb-44 cursor-pointer justify-center items-center"
                    onClick={() =>
                      handleCardClick(data.slug, data.redirection_url)
                    }
                  >
                    <div className="mx-auto">
                      <div className="text-black relative md:text-5xl text-2xl font-bold font-optima mx-auto uppercase leading-[57.72px] lg:mt-6">
                        <div className="indent-10 font-extrabold lg:text-6xl md:text-3xl md:text-start">
                          {title}
                        </div>
                        <Image
                          alt=""
                          src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${data.file[0]?.img_md_url}`}
                          width={1437.56}
                          height={600.05}
                          className="md:h-[500.05px] h-[325px] md:mt-6 bg-no-repeat bg-cover object-cover mx-auto overflow-hidden"
                        />
                        <div className="absolute flex justify-center items-center md:top-[85%] top-[78%]  mx-auto">
                          <div className="w-full flex justify-between shadow-lg bg-white  z-30 lg:p-10 p-4 2xl:mx-16 lg:mx-20 sm:mx-2 lg:py-12 ">
                            <div className="flex flex-col md:flex-row 2xl:w-[1228px] xl:w-[975px]  md:w-[750px] w-full justify-between mx-auto">
                              <div className="flex-col xl:px-10 px-2">
                                <p className="text-black text-xl font-medium font-optima  text-balance max-w-[480px]  xl:max-h-32 max-h-12 overflow-hidden ">
                                  {data.title
                                    ? data.title
                                    : "SAADIYAT NIGHTS: STING DAZZLES FANS WITH UNFORGETTABLE SHOW IN ABU DHABI"}
                                </p>
                                <div className="text-sky-700 text-xl capitalize font-normal mt-4 font-optima mb-3">
                                  {data.created_at}
                                </div>
                              </div>
                              <div className="hidden 2xl:block w-[148px] h-[0px] origin-top-left rotate-90 border top-8 md:left-[462px] absolute border-[#969292] 2xl:left-[686px]" />
                              <p className="text-black text-lg font-normal justify-center items-center leading-tight md:mx-10 font-optima capitalize max-w-[490px] md:max-h-28 max-h-28 overflow-hidden">
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: data.content
                                      ? data.content
                                      : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type",
                                  }}
                                />
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default TrendingBlog;
