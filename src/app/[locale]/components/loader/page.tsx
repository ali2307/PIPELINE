"use client";
import Image from "next/image";
import React from "react";
import Fly from "../../../assets/img/Adure_logo.gif";
import "./Loader.css";

const Loader: React.FC = () => {
  return (
    <>
      <div className="w-full h-screen flex justify-center items-center">
        <Image src={Fly} width={150} height={150} alt={"test"} />
        {/* <div className="loader"></div> */}
      </div>
    </>
  );
};

export default Loader;
