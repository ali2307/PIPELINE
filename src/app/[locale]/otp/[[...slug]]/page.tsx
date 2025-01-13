"use client";

import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { useRouter } from "next/navigation";
import RegOtpImage from "./../../../assets/img/register-otp.png";
import { useStore } from "./../../../store/index";
import { otpVarification, resendOtp } from "@/app/services/api";
import { toast } from "react-toastify";
import Button from "../../components/button/page";
import { handleKeyDown, handleOtpChange } from "@/app/utils/util";
import EmailModal from "../../components/emailModal/page";

interface FormPageProps {
  params: any;
}

const Otp: React.FC<FormPageProps> = () => {
  const { email, id } = useStore((state) => state.registrationDetails);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({});

  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const hideSpinner = useStore((state) => state.hideSpinner);
  const showSpinner = useStore((state) => state.showSpinner);
  const globalLoader = useStore((state) => state.globalLoader);
  const onSubmit = (data: any) => {
    const otp = watch(["otp1", "otp2", "otp3", "otp4", "otp5", "otp6"]).join(
      ""
    );
    const _data = new FormData();
    _data.append("user_id", id);
    _data.append("otp", otp);
    showSpinner();
    otpVarification(_data)
      .then((res) => {
        if (res.data.status === true) {
          hideSpinner();
          toast.success(res.data.message || "successs");
          router.push(`login`);
        } else {
          toast.error(res.data.message || "Something went wrong");
          hideSpinner();
        }
      })
      .catch((error) => {
        hideSpinner();
        console.log(error);
        // toast.error(error.response.data.message || "An error occurred");
        reset();
      });
  };

  const handleResendOtp = () => {
    const _data = new FormData();
    _data.append("user_id", id);

    resendOtp(_data)
      .then((res) => {
        toast.success(res.data.message || "successs");
        reset();
        otpRefs.current[0]?.focus();
      })
      .catch((error) => {
        console.log(error);
        // toast.error(error.response.data.message || "An error occurred");
      });
  };

  return (
    <>
      <section className="h-screen bg-[#0670b12b] bg-no-repeat">
        <div className="md:py-36 py-20">
          <div className="flex justify-center items-center">
            <div className="sm:w-[305px] md:h-[68px] h-[98px] bg-neutral-50  sm:mt-12 rounded-tr-[31px] rounded-tl-[31px] shadow border">
              <h2 className="text-black md:text-2xl md:text-start text-center text-lg font-bold font-['DM Sans'] rounded py-4 md:px-20 px-5 md:py-4 ">
                Add properties in your cart
              </h2>
              <div className="md:w-[688px] md:h-[490px] w-full flex bg-white justify-center items-center shadow-lg overflow-hidden mx-auto rounded-br-[31px] rounded-bl-[31px]">
                <div className="2xl:block hidden justify-center items-center md:w-1/2 w-full bg-cover">
                  <div className="flex justify-center items-center">
                    <div className="md:w-[368px] md:h-[490px] w-full h-full flex justify-center flex-col items-center bg-white rounded-bl-[31px]">
                      <Image src={RegOtpImage} alt="" />
                      <p className="text-center text-neutral-800 text-base font-normal max-w-72 max-h-12 overflow-hidden mt-6 font-['DM Sans']">
                        Sign in to add properties to your cart, accessible
                        across all devices
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full h-full p-4 flex justify-center items-center bg-neutral-200 rounded-br-[31px]">
                  <div className="mx-auto flex w-full  max-w-md flex-col space-y-10">
                    <div className="flex flex-col items-center justify-center text-center space-y-2">
                      <div className="font-bold text-3xl text-neutral-700 mb-4">
                        <p>OTP Verification</p>
                      </div>
                      <div className="flex flex-row text-sm font-normal text-[#69707b]">
                        <p>
                          We will send you one time password in this
                          <br />
                          Email Address
                          <span className="text-center text-black text-[15px] font-semibold font-['Outfit']">
                            {email}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div>
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col space-y-6">
                          <div className="flex gap-1 flex-row items-center justify-between mx-auto w-full max-w-xs">
                            {Array.from({ length: 6 }).map((_, index) => {
                              const { ref: inputRef, ...inputProps } = register(
                                `otp${index + 1}`
                              );
                              return (
                                <div key={index} className="w-[50px] h-[47px] ">
                                  <input
                                    className="w-full h-full flex flex-col items-center justify-center text-center  outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                                    type="text"
                                    maxLength={1}
                                    ref={(e: any) => {
                                      inputRef(e);
                                      otpRefs.current[index] = e;
                                    }}
                                    {...inputProps}
                                    onChange={(event) =>
                                      handleOtpChange(index, event, otpRefs)
                                    }
                                    onKeyDown={(event) =>
                                      handleKeyDown(index, event, otpRefs)
                                    }
                                  />
                                </div>
                              );
                            })}
                          </div>
                          <div className="flex flex-col space-y-2">
                            <div className="mt-4 flex flex-col space-y-2 justify-center items-center">
                              <Button type="submit" isLoading={globalLoader}>
                                Verify
                              </Button>
                            </div>
                          </div>
                          <div className="flex flex-col space-y-2">
                            <div className="mt-4 flex flex-col justify-center items-center">
                              <a
                                className="cursor-pointer  underline text-gray-600 hover:text-sky-600"
                                onClick={handleResendOtp}
                              >
                                Resent OTP
                              </a>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Otp;
