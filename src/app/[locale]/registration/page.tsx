"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { useRouter } from "next/navigation";
import RegImage from "./../../assets/img/register-form.png";
import InputField from "../components/inpuField/page";
import { registration } from "@/app/services/api";
import { useStore } from "./../../store/index";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  passwordSchema,
  nameValidation,
  phoneNumberValidation,
} from "@/app/utils/util";
import Button from "../components/button/page";
import { toast } from "react-toastify";
import Link from "next/link";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is mandatory"),
  password: passwordSchema.fields.password,
  phone_number: phoneNumberValidation.required("Phone is required"),
  first_name: nameValidation,
});

interface RegisterModal {
  setIsCreateAccountModalOpen: (isOpen: boolean) => void;
  setIsLoginModalOpen: (isOpen: boolean) => void;
}

const Registration: React.FC<RegisterModal> = ({
  setIsLoginModalOpen,
  setIsCreateAccountModalOpen,
}) => {
  const setRegistrationDetails = useStore(
    (state) => state.setRegistrationDetails
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const router = useRouter();
  const hideSpinner = useStore((state) => state.hideSpinner);
  const showSpinner = useStore((state) => state.showSpinner);
  const globalLoader = useStore((state) => state.globalLoader);
  const onSubmit = (data: any) => {
    const _data = new FormData();
    _data.append("first_name", data["first_name"]);
    _data.append("second_name", data["second_name"]);
    _data.append("email", data["email"]);
    _data.append("phone", data["phone_number"]);
    _data.append("password", data["password"]);
    showSpinner();
    registration(_data)
      .then((res) => {
        if (res.data.status === true) {
          // const email = res.data.data.profile.email;
          setRegistrationDetails(res.data.data.profile);

          toast.success(res.data.message || "successs");
          hideSpinner();

          router.push(`otp`);
        } else {
          hideSpinner();
          toast.error(res.data.message || "Something went wrong");
        }
      })
      .catch((error) => {
        hideSpinner();
        console.log(error);
        // toast.error(error.response?.data.message || "An error occurred");
      });
  };
  const onLogin = () => {
    setIsCreateAccountModalOpen(false);
    setIsLoginModalOpen(true);
  };
  return (
    <>
      <section className="h-screen overflow-auto bg-cover object-cover bg-no-repeat">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-center items-center pt-24 md:pt-28 lg:mt-20 2xl:mt-0">
            <div className="w-[690px] md:h-[68px] h-[98px] bg-neutral-50 rounded-tr-[31px] rounded-tl-[31px] shadow border">
              <h2 className="text-black md:text-2xl md:text-start text-center text-lg font-bold font-['DM Sans'] rounded py-4 md:px-8 px-5 md:py-4 ">
                Add properties in your cart
              </h2>
              <div className="md:w-[688px] md:h-[700px] w-full flex bg-white justify-center items-center shadow-lg overflow-hidden mx-auto  rounded-br-[31px] rounded-bl-[31px]">
                <div className="2xl:block hidden justify-center items-center md:w-1/2 w-full bg-cover ">
                  <div className="flex justify-center items-center">
                    <div className="md:w-[368px] md:h-[582px] w-full h-full flex justify-center flex-col items-center bg-white rounded-bl-[31px]">
                      <Image src={RegImage} alt="" />
                      <p className="text-center text-neutral-800 text-base font-normal max-w-72 max-h-12 overflow-hidden mt-6 font-['DM Sans']">
                        Sign in to add properties to your cart, accessible
                        across all devices
                      </p>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2 w-full h-full p-8  bg-neutral-200 rounded-br-[31px]">
                  <InputField
                    register={register}
                    name={"first_name"}
                    label={"First Name"}
                    errors={errors}
                  />
                  <InputField
                    register={register}
                    name={"second_name"}
                    label={"Second Name"}
                    errors={errors}
                  />
                  <InputField
                    register={register}
                    name={"email"}
                    label={"Mail ID"}
                    errors={errors}
                  />
                  <InputField
                    register={register}
                    name={"phone_number"}
                    label={"Phone Number"}
                    errors={errors}
                  />
                  <InputField
                    register={register}
                    name={"password"}
                    label={"Password"}
                    errors={errors}
                    type="password"
                  />
                  <div className="mt-8 flex justify-center items-center">
                    <Button type="submit" isLoading={globalLoader}>
                      {" "}
                      Sign Up
                    </Button>
                  </div>
                  <div className="mt-4 flex items-center justify-center">
                    <div className="text-center max-w-72 leading-4">
                      <div className="text-center max-w-72 leading-4">
                        <span className="text-black text-[14px] font-roboto pb-5 font-medium">
                          Existing User ?
                        </span>
                        <span className="text-center text-[#3889b4] text-sm font-medium pt-3 font-['Roboto'] hover:underline">
                          <a onClick={onLogin}> Login</a>
                        </span>
                      </div>
                      <span className="text-black text-[12px] mt-3 font-thin font-['Roboto']">
                        By registering you accept our
                        <br />
                      </span>
                      <span className="text-sky-700 text-[12px] font-thin font-['Roboto'] hover:underline">
                        Terms &amp; Conditions
                      </span>
                      <span className="text-black text-[12px] font-thin font-['Roboto']">
                        {" "}
                        and our privacy policy.{" "}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};
export default Registration;
