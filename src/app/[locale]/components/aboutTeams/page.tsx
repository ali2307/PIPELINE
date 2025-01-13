"use client";
import React from "react";
import Image from "next/image";
import { useStore } from "./../../../store/index";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

const AboutTeams: React.FC = () => {
  const { title, content, carditem } = useStore((state) => state.aboutTeam);

  return (
    <>
      <section className="testimonial relative mx-auto mb-10">
        <div className="h-auto md:h-[635px] 2xl:w-[1245px] w-full relative bg-black p-8 md:p-16 justify-center items-center mx-auto">
          <div className="2xl:px-40 lg:px-40 px-6">
            <div className="flex items-center mb-4">
              <div className="border w-[44px] mr-3 h-[2px]" />
              <div className="text-justify text-white text-lg font-medium uppercase leading-[30px]">
                OUR TEAM
              </div>
            </div>
            <div className="text-white text-[22px] lg:text-[35px] md:text-[28px] font-medium leading-[36px] max-w-[360px] overflow-hidden max-h-28 md:leading-[40px] mb-4">
              {title}
            </div>
            <div
              className="text-justify text-white text-base md:text-md font-normal mb-8 mt-4 md:mt-6 max-w-2xl max-h-28 leading-[24px]"
              dangerouslySetInnerHTML={{
                __html: content,
              }}
            ></div>
          </div>

          <div className="flex gap-6 justify-center items-center">
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={30}
              loop={true}
              autoplay={{ delay: 3000 }}
              pagination={{ clickable: true }}
              className="w-full"
              breakpoints={{
                // Mobile: Show 1 slide initially, move 1 slide at a time
                0: {
                  slidesPerView: 1,
                  slidesPerGroup: 1,
                },
                // Tablet: Show 2 slides and move 2 slides at a time
                768: {
                  slidesPerView: 3,
                  slidesPerGroup: 1,
                },
                // Desktop: Show 4 slides and move 4 slides at a time
                1024: {
                  slidesPerView: 4,
                  slidesPerGroup: 4,
                },
              }}
            >
              {carditem.map((item: any) => (
                <SwiperSlide key={item.id}>
                  <div className="xl:w-[222px] md:w-[170px] w-full h-[210px] bg-white rounded-[10px] p-8 pt-6 flex flex-col items-center">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${item.file?.[0]?.img_md_url}`}
                      alt={item.name}
                      className="w-[93px] h-[93px] transition-transform duration-500 hover:scale-110 rounded-full object-cover"
                      width={93}
                      height={93}
                    />
                    <div className="text-center text-slate-700 text-lg font-semibold leading-tight py-3">
                      {item.title ? item.title : ""}
                    </div>
                    <div
                      className="text-center text-slate-900 opacity-90 text-sm font-normal max-h-4 overflow-hidden leading-tight"
                      dangerouslySetInnerHTML={{
                        __html: item.content,
                      }}
                    ></div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutTeams;
