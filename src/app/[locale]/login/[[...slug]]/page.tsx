"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";
import RegImage from "./../../../assets/img/register-form.png";
import InputField from "../../components/inpuField/page";
import InpuFieldPassword from "../../components/inpuFieldPassword/page";
import { userLogin } from "@/app/services/api";
import { usePathname, useRouter } from "next/navigation";
import { useStore } from "./../../../store/index";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import Button from "../../components/button/page";
import { passwordSchema } from "@/app/utils/util";

const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("User Name is mandatory"),
  password: passwordSchema.fields.password,
});

interface LoginModal {
  setIsCreateAccountModalOpen: (isOpen: boolean) => void;
  setIsLoginModalOpen: (isOpen: boolean) => void;
}

const Login: React.FC<LoginModal> = ({
  setIsCreateAccountModalOpen,
  setIsLoginModalOpen,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });
  const router = useRouter();
  const pathname = usePathname();
  const setSession = useStore((state) => state.setSession);
  const hideSpinner = useStore((state) => state.hideSpinner);
  const showSpinner = useStore((state) => state.showSpinner);
  const globalLoader = useStore((state) => state.globalLoader);

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
          setIsLoginModalOpen(false);
          // router.push(pathname); // Use replace instead of push
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
  const onRegister = () => {
    setIsCreateAccountModalOpen(true);
    setIsLoginModalOpen(false);
  };
  return (
    <>
      <section className="h-screen  bg-no-repeat">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="md:py-48 py-44">
            <div className="flex justify-center items-center">
              <div className="md:w-[690px] w-full md:h-[68px] h-[98px] bg-neutral-50 rounded-tr-[31px] rounded-tl-[31px] shadow border">
                <h2 className="text-black md:text-2xl md:text-start text-center text-lg font-bold font-['DM Sans'] rounded py-4 md:px-8 px-5 md:py-4">
                  Add properties in your cart
                </h2>
                <div className=" md:h-[400px] w-full flex bg-white justify-center items-center shadow-lg overflow-hidden mx-auto  rounded-br-[31px] rounded-bl-[31px]">
                  <div className="2xl:block hidden justify-center items-center md:w-1/2 w-full bg-cover ">
                    <div className="flex justify-center items-center">
                      <div className="md:w-[368px] md:h-[582px] w-full h-full flex justify-center flex-col items-center bg-white rounded-bl-[31px]">
                        <Image src={RegImage} alt="" />
                        <p className="text-center text-neutral-600 text-base font-normal max-w-72 max-h-12 overflow-hidden mt-6 font-['DM Sans']">
                          Sign in to add properties to your cart,
                          <br /> accessible across all devices
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-full flex flex-col p-8 justify-center  items-center bg-neutral-200 rounded-br-[31px]">
                    <div className="w-[270px]">
                      <InputField
                        register={register}
                        name={"email"}
                        label={"Email"}
                        errors={errors}
                        classname="md:w-[271px]"
                      />
                    </div>
                    <div className="mt-4 w-[270px] ">
                      <InpuFieldPassword
                        register={register}
                        name={"password"}
                        label={"Password"}
                        errors={errors}
                        type="password"
                        classname="w-[270px]"
                      />
                    </div>

                    <Link
                      className="flex justify-end w-full ml-4 text-sky-600 text-[13px] mr-10 hover:text-black"
                      href={"/forgot-password"}
                    >
                      Forgot Password
                    </Link>

                    <div className="mt-8 flex justify-center items-center">
                      <Button type="submit" isLoading={globalLoader}>
                        Sign In
                      </Button>
                    </div>
                    <div className="mt-6 flex items-center justify-center">
                      <div className="text-center max-w-72 leading-4">
                        <span className="text-black text-[14px] italic font-roboto font-medium">
                          Dont have an account?
                          <br />
                        </span>
                        <span className="text-center text-[#3889b4] text-sm font-medium pt-3 font-['Roboto'] hover:underline">
                          <a onClick={onRegister}>Create Account</a>
                        </span>
                      </div>
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
export default Login;
