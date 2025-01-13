"use client";
import React from "react";
import { useStore } from "./../../../store/index";
import dynamic from "next/dynamic";

// Dynamically import VideoPlayer
const VideoPlayer = dynamic(() => import("../videoPlayer/page"), {
  loading: () => <div>Loading Video Player...</div>,
});
const CommunityViewDiscover: React.FC = () => {
  const { video, thumbnail } = useStore((state) => state.communitytViewDiscover);
  return (
    <>
      <section className="relative">
        <div className=" md:h-[787px] h-auto bg-gradient-to-l from-black to-black relative">
          <VideoPlayer
            src={`${process.env.NEXT_PUBLIC_STORAGE_URL_S3}${video?.[0]?.img_md_url}`}
            className="md:min-h-[787px] md:max-h-[787px] min-h-[450px] max-h-[450px] w-full bg-cover object-cover"
            autoPlay={false}
            thumbnail={`${process.env.NEXT_PUBLIC_STORAGE_URL_S3}${thumbnail?.[0]?.img_md_url}`}
            muted={true}
            loop={true}
            showPlayButton={true}
          />
        </div>
      </section>
    </>
  );
};
export default CommunityViewDiscover;
