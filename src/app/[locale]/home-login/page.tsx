"use client";
import React from "react";
import Image from "next/image";
import LoginImage from "../../assets/img/login-1.jpg";
import LogoImage from "../../assets/img/logo-1.png";
import LoginForm from "../../assets/img/login-form-bg.jpg";
import Button from "../components/button/page";
import Link from "next/link";
import InputFieldPassword from "../components/inpuFieldPassword/page";
import InputField from "../components/inpuField/page";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { useStore } from "@/app/store";
import { userLogin } from "@/app/services/api";
import { toast } from "react-toastify";

const HomeLogin: React.FC = () => {
  const router = useRouter();
  const hideSpinner = useStore((state) => state.hideSpinner);
  const showSpinner = useStore((state) => state.showSpinner);
  const globalLoader = useStore((state) => state.globalLoader);
  const setSession = useStore((state) => state.setSession);

  const LoginSchema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email format")
      .required("User Name required"),
    password: yup.string().required("Password required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const onSubmit = (data: any) => {
    const _data = new FormData();
    _data.append("email", data["email"]);
    _data.append("password", data["password"]);
    showSpinner();

    userLogin(_data)
      .then((res) => {
        if (res.data.status === true) {
          hideSpinner();
          toast.success(res.data.message || "successs");
          setSession(res);
          router.replace("home"); // Use replace instead of push
          // router.back();
        } else {
          toast.error(res.data.message || "Something went wrong");
          hideSpinner();
        }
      })
      .catch((error) => {
        hideSpinner();
        console.log(error);
        // toast.error(error.response.data.message || "An error occurred");
      });
  };
  return (
    <div className="flex h-screen md:gap-8">
      <div className="w-full hidden md:flex items-center justify-center">
        <Image
          src={LoginImage}
          alt="Login Image"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="xl:w-1/3 w-full flex items-center justify-center">
        <div className="w-full flex flex-col bg-[#fdfefe] items-center justify-center">
          <div className="relative flex items-center justify-center mt-8 mb-[1.4rem] z-20">
            <Image src={LogoImage} alt="Logo" />
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="relative z-10 flex flex-col justify-center items-center"
          >
            <div className="absolute lg:w-[345px] md:w-[378px]  p-8 rounded-[31px] w-full  z-10 mx-auto ">
              <div className="flex items-center justify-center mb-14">
                <h2 className="text-[#0670b1] text-[25px] font-bold">Login</h2>
              </div>

              <div className="mt-4 flex justify-center items-center">
                <InputField
                  register={register}
                  name={"email"}
                  label={"User Name"}
                  errors={errors}
                  classname="md:w-[271px] mx-auto"
                />
              </div>

              <div className="w-full flex justify-center items-center">
                <InputFieldPassword
                  register={register}
                  name={"password"}
                  type={"password"}
                  label={"Password"}
                  errors={errors}
                  classname="md:w-[271px]  mx-auto"
                />
              </div>
              <div className="flex justify-end  items-end w-full  mr-24 text-sky-600 text-[13px] hover:text-black">
                <Link href={"forgot-password"}>Forgot Password</Link>
              </div>
              <div className="mt-8 flex justify-center items-center">
                <Button type="submit" isLoading={globalLoader}>
                  Sign In
                </Button>
              </div>
              <div className="mt-4 flex items-center justify-center">
                <div className="text-center leading-4">
                  <span className="text-black text-[12px] font-normal  italic">
                    Dont have an account?
                    <br />
                  </span>
                  <span
                    onClick={() => router.push("home-registration")}
                    className="text-sky-700 text-[13px] font-normal hover:underline cursor-pointer"
                  >
                    Create account
                  </span>
                </div>
              </div>
            </div>
            <div className="relative top-0 h-full w-full z-0 rounded-[33px]">
              {/* <Image
                src={LoginForm}
                alt="Form Background"
                className="md:w-[450px] md:h-[516px] h-full rounded-[26px] w-full object-cover bg-cover bg-no-repeat mx-auto"
              /> */}
              <Image
                src={LoginForm}
                alt=""
                className="lg:w-[360px] h-[520px] w-full object-cover bg-cover rounded-[31px] bg-no-repeat mx-auto"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HomeLogin;
