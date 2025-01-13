"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import LoginImage from "../../assets/img/login-1.jpg";
import LogoImage from "../../assets/img/logo-1.png";
import LoginForm from "../../assets/img/login-form-bg.jpg";
import Button from "../components/button/page";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import InputField from "../components/inpuField/page";
import { useStore } from "@/app/store";
import { resetPasswordOtpVarification } from "@/app/services/api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const ForgotPassword: React.FC = () => {
  const router = useRouter();
  const hideSpinner = useStore((state) => state.hideSpinner);
  const showSpinner = useStore((state) => state.showSpinner);
  const globalLoader = useStore((state) => state.globalLoader);
  const setRegistrationDetails = useStore(
    (state) => state.setRegistrationDetails
  );
  const { email } = useStore((state) => state.registrationDetails);

  const LoginSchema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
  });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const onSubmit = (data: any) => {
    showSpinner();
    setRegistrationDetails({ email: data.email });
    const _data = new FormData();
    _data.append("email", data.email);
    resetPasswordOtpVarification(_data)
      .then((res) => {
        if (res.data.status) {
          toast.success("OTP sent successfully", {
            onClose: () => {
              reset();
              router.push(`common-otp`);
            },
          });
        } else {
          toast.error(res.data.message || "Something went wrong");
          reset();
        }
        hideSpinner();
      })
      .catch((err) => {
        console.log(err);
        // toast.error(err.response?.data.message || "Failed to fetch data");
        reset();
        hideSpinner();
      });
  };

  return (
    <div className="flex h-screen md:gap-8">
      <div className=" w-full hidden md:flex items-center justify-center">
        <Image src={LoginImage} alt="" className="w-full h-full object-cover" />
      </div>

      <div className="lg:w-1/3 w-full flex items-center justify-center">
        <div className="w-full flex-col bg-[#fdfefe] flex items-center justify-center">
          <div className="relative flex items-center justify-center mt-8 mb-[1.5rem]  z-20">
            <Image src={LogoImage} alt="w-[127px] h-[122px]" />
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="relative z-10 flex flex-col justify-center items-center"
          >
            <div className="absolute flex flex-col justify-center items-center  h-[545px]  p-8 rounded-[31px] w-full z-10">
              <div className="mb-10">
                <h2 className="text-[#0670b1] text-center text-[25px] font-bold font-['Roboto']">
                  Forget Password
                </h2>
              </div>

              <div className="mt-2">
                <InputField
                  register={register}
                  name={"email"}
                  label={"Email"}
                  errors={errors}
                  classname="xl:w-[271px] w-full"
                />
              </div>

              <div className="">
                <p className="max-w-[446px] text-[#535252] text-xs leading-4 text-center">
                  Once submitted an email will be sent to the email address on
                  file and will include a link back to the site to reset your
                  password We will share an OTP in your email.
                </p>
              </div>

              <div className="mt-8 flex justify-center items-center ">
                <Button
                  type="submit"
                  className="w-[115px] h-14"
                  isLoading={globalLoader}
                >
                  Get OTP
                </Button>
              </div>

              <div className="mt-8 flex flex-col justify-center items-center">
                <span className="text-black text-[13px] font-thin font-['Roboto'] italic">
                  Dont have an account?
                  <br />
                </span>
                <span
                  onClick={() => router.push("home-registration")}
                  className="text-sky-700 text-[13px] font-thin font-['Roboto'] hover:underline cursor-pointer"
                >
                  Create account
                </span>
              </div>
            </div>
            <div className="relative inset-0 z-0">
              <Image
                src={LoginForm}
                alt=""
                className="lg:w-[360px] h-[520px] w-full object-cover bg-cover rounded-[31px] bg-no-repeat"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
