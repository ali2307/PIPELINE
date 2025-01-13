"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import LogoImage from "../../assets/img/logo-2.svg";
import LoginForm from "../../assets/img/login-form-bg.jpg";
import LoginImage from "../../assets/img/login-1.jpg";
import Button from "../components/button/page";
import { useStore } from "@/app/store";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  forgotPasswordOtpVarification,
  otpVarification,
  resendOtp,
  resendOtpForgotPassword,
} from "@/app/services/api";
import { toast } from "react-toastify";
import { handleKeyDown, handleOtpChange } from "@/app/utils/util";
import EmailModal from "../components/emailModal/page";

interface CommonOtpProps {
  label: string;
}

interface CommonOtpProps {
  label: string;
}

interface errors {
  type: string;
  message: string;
}

const CommonOtp: React.FC<CommonOtpProps> = ({ label }) => {
  const [emailModalSatus, setEmailModalStatus] = useState(false);
  const { email, id } = useStore((state) => state.registrationDetails);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    watch,
    reset,
    clearErrors,
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

    if (otp.length === 6) {
      showSpinner(); // Show spinner during OTP verification

      if (id) {
        _data.append("user_id", id);
        _data.append("otp", otp);
        otpVarification(_data)
          .then((res) => {
            if (res.data.status === true) {
              hideSpinner();
              // toast.success(res.data.message || "Success");
              setEmailModalStatus(true);
            } else {
              toast.error(res.data.message || "OTP is incorrect");
              hideSpinner();
              resetOtpFields(); // Reset OTP fields after failed submission
            }
          })
          .catch((error) => {
            hideSpinner();
            console.log(error);
            // toast.error(error.response.data.message || "An error occurred");
            resetOtpFields(); // Reset OTP fields after error
          });
      } else {
        _data.append("otp", otp);
        _data.append("email", email);
        forgotPasswordOtpVarification(_data)
          .then((res) => {
            if (res.data.status === true) {
              hideSpinner();
              toast.success(res.data.message || "Success");
              router.push(`forgot-password-confirm`);
            } else {
              toast.error(res.data.message || "OTP is incorrect");
              hideSpinner();
              resetOtpFields(); // Reset OTP fields after failed submission
            }
          })
          .catch((error) => {
            hideSpinner();
            console.log(error);
            // toast.error(error.response.data.message || "An error occurred");
            resetOtpFields(); // Reset OTP fields after error
          });
      }
    } else {
      setError("otp", {
        type: "manual",
        message: "OTP required",
      });
    }
  };

  const resetOtpFields = () => {
    reset(); // Reset the form state
    otpRefs.current.forEach((input) => {
      if (input) input.value = ""; // Clear each input field manually
    });
    otpRefs.current[0]?.focus(); // Focus the first input field after reset
  };

  const handleResendOtp = () => {
    const _data = new FormData();
    if (id) {
      _data.append("user_id", id);
      resendOtp(_data)
        .then((res) => {
          toast.success(res.data.message || "OTP resent successfully");
          resetOtpFields(); // Reset OTP fields after OTP resend
        })
        .catch((error) => {
          console.log(error);
          // toast.error(error.response.data.message || "An error occurred");
        });
    } else {
      _data.append("email", email);
      resendOtpForgotPassword(_data)
        .then((res) => {
          toast.success(res.data.message || "OTP resent successfully");
          resetOtpFields(); // Reset OTP fields after OTP resend
        })
        .catch((error) => {
          console.log(error);
          // toast.error(error.response.data.message || "An error occurred");
        });
    }
  };

  return (
    <>
      <div className="flex ">
        <div className="md:w-[1750px] h-[1080px] min-h-screen items-center justify-center hidden 2xl:block">
          <Image
            src={LoginImage}
            alt=""
            className="relative md:w-[1750px] min-h-[1080px] max-h-[1080px] bg-cover object-cover"
            height={1080}
            width={1750}
          />
        </div>
        <div className="md:w-1/2 w-full min-h-screen ">
          <div className="flex items-center justify-center ">
            <div className="w-full items-center justify-center bg-[#fdfefe]">
              <div className=" relative flex items-center justify-center  top-32 z-20 lg:mb-4  mb-6">
                <Image src={LogoImage} alt="" />
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="relative lg:w-[450px] md:w-[378px] h-[615px]  md:top-[148px] top-[45px] justify-center items-center  p-8 rounded-[31px] w-full  py-28 mb-10 z-10 mx-auto">
                  <EmailModal
                    isOpen={emailModalSatus}
                    onClose={() => {
                      setEmailModalStatus(true);
                      router.push(`home-login`);
                    }}
                  />
                  <div className="flex items-center justify-center mb-14">
                    <h2 className="text-[#0670b1] text-[25px] font-bold font-['Roboto']">
                      OTP Verification
                    </h2>
                  </div>
                  <p className="md:w-[313px] w-full h-9 text-[#575454] text-[15px] font-normal text-center font-['Outfit'] mb-6 mx-auto">
                    We have sent you one time password to this email address{" "}
                    <span className="text-center text-black text-[15px] font-semibold font-['Outfit']">
                      {email}
                    </span>
                  </p>
                  <div className="flex gap-1 flex-row items-center justify-between mx-auto w-full max-w-xs">
                    {Array.from({ length: 6 }).map((_, index) => {
                      const { ref: inputRef, ...inputProps } = register(
                        `otp${index + 1}`
                      );
                      return (
                        <div key={index} className="w-[50px]  h-[47px] ">
                          <input
                            className="w-full h-full flex flex-col items-center justify-center text-center  outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                            type="text"
                            maxLength={1}
                            ref={(e: any) => {
                              inputRef(e);
                              otpRefs.current[index] = e;
                            }}
                            {...inputProps}
                            onChange={(event) => {
                              handleOtpChange(index, event, otpRefs);
                              clearErrors();
                            }}
                            onKeyDown={(event) => {
                              handleKeyDown(index, event, otpRefs);
                              clearErrors();
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                  {errors.otp && (
                    <p className=" text-red-500 text-sm w-44 ml-10">
                      {errors?.otp?.message?.toString()}
                    </p>
                  )}

                  <div className=" mt-8 flex justify-center items-center">
                    <Button
                      type="submit"
                      className="w-[115px] h-[65px]"
                      isLoading={globalLoader}
                    >
                      Submit
                    </Button>
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
                <div className="relative top-[-516px] h-full w-full z-0">
                  <Image
                    src={LoginForm}
                    alt=""
                    className="md:w-[450px] md:h-auto h-[545px] w-full right-32 object-cover bg-cover bg-no-repeat mx-auto"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommonOtp;
