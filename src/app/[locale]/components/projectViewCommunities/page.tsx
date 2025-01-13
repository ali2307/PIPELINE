"use client";
import React from "react";
import { useStore } from "./../../../store/index";
import dynamic from "next/dynamic";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Pagination,
  EffectFlip,
  EffectCube,
  EffectCards,
  EffectFade,
} from "swiper/modules";
import "swiper/css/effect-flip";

// Dynamically import CommunityViewCard
const CommunityViewCard = dynamic(() => import("../communityViewCard/page"), {
  loading: () => <div>Loading...</div>,
});

const ProjectViewCommunities: React.FC = () => {
  const { title, carditem } = useStore((state) => state.projectViewCommunity);
  return (
    <section>
      <div className="relative bg-white md:mt-0">
        <h2 className="text-black bg-white lg:text-[40px] md:text-[30px] text-center text-[24px] font-normal font-optima py-8">
          {title.toUpperCase()}
        </h2>
        <Swiper
          modules={[Autoplay, Pagination]}
          pagination={{ clickable: true }} // Enable pagination dots
          loop={true} // Enable infinite loop
          autoplay={{
            delay: 4000, // Auto-slide every 3 seconds
            disableOnInteraction: false,
          }} // Enable autoplay
          className="w-full" // Custom styling
        >
          {carditem?.map((item: any, index: number) => (
            <SwiperSlide key={index}>
              <CommunityViewCard item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ProjectViewCommunities;
