"use client";
import React, { useState } from "react";
import { addEnquiry } from "@/app/services/api";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const EnquiryForm: React.FC = () => {
  const [loader, setLoader] = useState(false);
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    name: yup.string().required("name is required"),
    message: yup.string().required("message is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data: any) => {
    const _data = new FormData();
    _data.append("name", data["name"]);
    _data.append("email", data["email"]);
    _data.append("message", data["message"]);
    setLoader(true);
    addEnquiry(_data)
      .then((res) => {
        setLoader(false);
        if (res.data.status) {
          toast.success("Enquery added successfully!");
          reset();
        } else {
          toast.error(res.data.message || "An error occurred");
          reset();
        }
      })
      .catch((error) => {
        setLoader(false);
        console.log(error);
        // toast.error("Unauthenticated Please Login!");
        reset();
      });
  };

  return (
    <div className="relative items-center justify-center md:my-10">
      <div className="flex-col">
        <span className="absolute left-0 top-[-1rem] lg:w-[53px] w-44 h-[3px] bg-[#013a5c] hidden lg:block mt-8" />
        <h5 className="text-[#000d2e] text-md md:text-sm font-medium  relative md:left-[-6rem] top-[-1.25rm] flex md:items-center items-start md:justify-center mb-5 sm:mt-3">
          Enquire WITH Us
        </h5>
        <div className="text-[#000d2e] lg:text-4xl md:text-2xl text-xl font-medium  lg:leading-[38px] leading-[25px]">
          Let build something
          <br />
          awesome together
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="md:h-24 text-[#000d2e] text-sm font-medium my-4">
            Name
            <input
              type="text"
              id="name"
              {...register("name", { required: true })}
              className="xl:w-[420px] lg:w-[342px] md:w-[200px]  h-[55px] rounded-[5px] border mt-2 py-3 px-4 block w-full md:min-w-80 border-gray-200  text-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
              placeholder=""
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>
          <div className="md:h-24 text-[#000d2e] text-sm font-medium my-4">
            Email Address
            <input
              type="text"
              id="email"
              {...register("email", { required: true })}
              className="xl:w-[420px] lg:w-[342px] md:w-[200px]  w-full h-[55px] rounded-[5px] border mt-2 py-3 px-4 block md:min-w-80 border-gray-200  text-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
              placeholder=""
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="text-[#000d2e] text-sm font-medium my-4">
            Your Message
            <div className="md:h-40 max-w-sm space-y-3">
              <textarea
                id="message"
                {...register("message", { required: true })}
                className="xl:w-[420px] lg:w-[342px] md:w-[330px]  h-[148px] py-3 px-4 block w-full border border-gray-200  rounded-[5px] mt-2 text-sm focus:outline-none focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                rows={3}
                defaultValue={""}
              />
              {errors.message && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.message.message}
                </p>
              )}
            </div>
            {!loader ? (
              <button className="lg:w-[420px] md:w-[320px] w-full h-[55px] relative bg-[#0670b1]  top-[19px]  text-white md:text-lg  text-md font-medium rounded-[5px] mt-5 hover:bg-black hover:text-white">
                Submit
              </button>
            ) : (
              <button
                type="button"
                className="lg:w-[420px] md:w-[320px] w-full h-[55px] flex items-center justify-center relative bg-[#0670b1] top-[19px] text-white md:text-lg text-md font-medium rounded-[5px] mt-10 hover:bg-black hover:text-white"
              >
                <span className="mr-2">Submit</span>
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="animate-spin"
                  viewBox="0 0 1792 1792"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"></path>
                </svg>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnquiryForm;
