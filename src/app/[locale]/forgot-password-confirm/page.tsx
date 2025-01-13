"use client";
import Image from "next/image";
import React from "react";
import LoginImage from "../../assets/img/login-1.jpg";
import LogoImage from "../../assets/img/logo-1.png";
import LoginForm from "../../assets/img/create-account.jpg";
import Button from "../components/button/page";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import InputFieldPassword from "../components/inpuFieldPassword/page";
import { useStore } from "@/app/store";
import { resetUpdate } from "@/app/services/api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const ForgotPasswordConfirm = () => {
  const router = useRouter();
  const hideSpinner = useStore((state) => state.hideSpinner);
  const showSpinner = useStore((state) => state.showSpinner);
  const globalLoader = useStore((state) => state.globalLoader);
  const { email } = useStore((state) => state.registrationDetails);

  const LoginSchema = yup.object().shape({
    password: yup
      .string()
      .required("Password Required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must include letters, numbers, and a special character"
      ),
    cnf_password: yup
      .string()
      .required("Confirm Password Required")
      .oneOf([yup.ref("password")], "Passwords must match"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const onSubmit = (data: any) => {
    showSpinner();
    const _data = new FormData();
    _data.append("email", email);
    _data.append("password", data.password);
    _data.append("password_confirmation", data.cnf_password);
    resetUpdate(_data)
      .then((res) => {
        if (res.data.status) {
          toast.success("Password reset successful", {
            onClose: () => {
              reset();
              router.push("home-login");
            },
          });
        } else {
          toast.error(res.data.message || "Something went wrong");
        }
        hideSpinner();
      })
      .catch((err) => {
        console.log(err);
        // toast.error(err.message || "Failed to fetch data");
        hideSpinner();
      });
  };

  return (
    <div className="flex h-screen  md:gap-8">
      <div className=" w-full hidden md:flex items-center justify-center ">
        <Image src={LoginImage} alt="" className="w-full h-full object-cover" />
      </div>

      <div className="lg:w-1/3 w-full flex items-center justify-center bg-[#fdfefe]">
        <div className="w-full flex  flex-col items-center justify-center relative">
          <div className="relative z-20 flex items-center justify-center mb-6 ">
            <Image src={LogoImage} alt="" />
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="relative z-10 w-full flex flex-col items-center justify-center"
          >
            <div className="absolute rounded-[31px] z-10">
              <div className="flex items-center justify-center mb-8 ">
                <h2 className="text-[#0670b1] text-[25px] text-center font-bold font-['Roboto']">
                  New Password
                </h2>
              </div>
              <div className="h-28 w-full flex justify-center items-center ">
                <InputFieldPassword
                  register={register}
                  name={"password"}
                  type={"password"}
                  label={"New Password"}
                  errors={errors}
                  classname="xl:w-[278px] "
                />
              </div>
              <div className="h-28 w-full flex justify-center items-center ">
                <InputFieldPassword
                  register={register}
                  name={"cnf_password"}
                  type={"password"}
                  label={"Confirm New Password"}
                  errors={errors}
                  classname="xl:w-[278px] "
                />
              </div>
              <div className="flex justify-center items-center">
                <Button
                  type="submit"
                  className="w-[115px] h-[65px]"
                  isLoading={globalLoader}
                >
                  Sign in
                </Button>
              </div>
            </div>
            <div className="relative z-0">
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

export default ForgotPasswordConfirm;
