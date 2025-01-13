"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import LoginImage from "../../assets/img/login-1.jpg";
import LogoImage from "../../assets/img/logo-1.png";
import LoginForm from "../../assets/img/create-account.jpg";
import Button from "../components/button/page";
import InputFieldPassword from "../components/inpuFieldPassword/page";
import InputField from "../components/inpuField/page";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { useStore } from "@/app/store";
import { registration } from "@/app/services/api";
import { toast } from "react-toastify";
import Link from "next/link";
import Select from "react-select";
import { getCountryCodeAndDials } from "@/app/utils/dial";
// Import your country code function

// You can define types here
export type CountryOption = {
  value: string;
  label: string;
  dialCode: string;
  flagUrl: string; // Add the flag URL
};

const HomeRegistration: React.FC = () => {
  const setRegistrationDetails = useStore(
    (state) => state.setRegistrationDetails
  );
  const router = useRouter();
  const hideSpinner = useStore((state) => state.hideSpinner);
  const showSpinner = useStore((state) => state.showSpinner);
  const globalLoader = useStore((state) => state.globalLoader);

  // Schema for validation using Yup
  const LoginSchema = yup.object().shape({
    first_name: yup
      .string()
      .required("First name is mandatory")
      .matches(/^[A-Za-z]+$/, "First name must contain only letters"),
    second_name: yup
      .string()
      .required("Last name is mandatory")
      .matches(/^[A-Za-z]+$/, "Last name must contain only letters"),
    phone_no: yup
      .string()
      .required("Phone number is mandatory")
      .matches(
        /^\+?[0-9]+$/,
        "Phone number must contain only numbers and may start with a '+'"
      ),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/\d/, "Password must contain at least one number")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      ),
    email: yup
      .string()
      .email("Please enter a valid email address")
      .required("Email is mandatory"),
    country: yup.string().required("Phone number is mandatory"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });

  // Function to handle form submission
  useEffect(() => {
    setValue("country", "AE");
    setValue("phone_no", "+971");
  }, [setValue]);

  const onSubmit = (data: any) => {
    const _data = new FormData();
    _data.append("first_name", data["first_name"]);
    _data.append("second_name", data["second_name"]);
    _data.append("email", data["email"]);
    _data.append("phone", data["phone_no"]);
    _data.append("password", data["password"]);
    showSpinner();
    registration(_data)
      .then((res) => {
        if (res.data.status === true) {
          setRegistrationDetails(res.data.data.profile);
          toast.success(res.data.message || "successs");
          hideSpinner();
          router.push(`common-otp`);
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

  // Preparing country options data with flags and dial codes
  const countryOptions = getCountryCodeAndDials().map((item: any) => {
    const [countryCode, dialCode] = item.value.split(";");
    return {
      value: countryCode,
      label: item.label,
      dialCode,
      flagUrl: `https://purecatamphetamine.github.io/country-flag-icons/3x2/${countryCode
        .split(";")[0]
        .toUpperCase()}.svg`, // Flag URL
    };
  });

  return (
    <div className="flex max-h-screen md:gap-8">
      <div className="w-full hidden md:flex items-center justify-center">
        <Image
          src={LoginImage}
          alt=""
          className="w-full h-full bg-cover object-cover"
        />
      </div>

      <div className="xl:w-1/3 w-full flex items-center justify-center md:mt-28 lg:mt-20 mt-24">
        <div className="w-full h-full flex flex-col bg-[#fdfefe] items-center justify-center">
          {/* Logo Section */}
          <div className="relative flex items-center justify-center mb-[1rem] z-20 ">
            <Image src={LogoImage} alt="Logo" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="relative z-10">
            <div className="absolute w-full flex flex-col items-center justify-center p-8 rounded-[31px]  z-10 mx-auto">
              <div className=" mb-4">
                <h2 className="text-[#0670b1] text-[25px] font-bold mt-4">
                  Create Account
                </h2>
              </div>

              <div className="flex flex-col justify-center md:items-center">
                <div className="">
                  <InputField
                    register={register}
                    name={"first_name"}
                    label={"First Name"}
                    errors={errors}
                    classname="md:w-[271px]"
                  />
                </div>
                <div className="">
                  <InputField
                    register={register}
                    name={"second_name"}
                    label={"Last Name"}
                    errors={errors}
                    classname="md:w-[271px]"
                  />
                </div>
                <div className="">
                  <InputField
                    register={register}
                    name={"email"}
                    label={"Mail ID"}
                    errors={errors}
                    classname="md:w-[271px]"
                  />
                </div>

                {/* Controller for react-select */}
                <div className="">
                  <label className="text-black/opacity-60 text-[14px] font-normal pl-3">
                    Phone Number
                  </label>
                  <div className="h-14 flex mb-4">
                    {/* Country Selector */}

                    <div className="flex-grow mr-2 mt-2">
                      <Controller
                        name="country"
                        control={control}
                        defaultValue="AE"
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={countryOptions}
                            getOptionValue={(e: CountryOption) => e.value}
                            formatOptionLabel={(e: CountryOption) => (
                              <div className="flex items-center ">
                                <Image
                                  src={e.flagUrl}
                                  alt={e.label}
                                  width={24}
                                  height={16}
                                />
                                <span className="pl-2">{e.label}</span>
                              </div>
                            )}
                            value={
                              countryOptions.find(
                                (option) => option.value === field.value
                              ) || null
                            }
                            onChange={(selectedOption) => {
                              field.onChange(selectedOption?.value || ""); // Update with the selected value
                              setValue(
                                "phone_no",
                                selectedOption?.dialCode || ""
                              ); // Update phone number
                            }}
                            isSearchable={false}
                            components={{
                              SingleValue: ({ data }) => (
                                <div className="contents items-center justify-center w-full">
                                  <Image
                                    src={data.flagUrl}
                                    alt={data.label}
                                    width={24}
                                    height={16}
                                  />
                                </div>
                              ),
                            }}
                            styles={{
                              control: (base) => ({
                                ...base,
                                padding: 0, // Adjust padding
                                display: "flex",
                                alignItems: "center",
                                borderRadius: "8px",
                                minHeight: "39px",
                                minWidth: "80px",
                                height: "100%",
                                width: "100%",
                              }),
                              valueContainer: (base) => ({
                                ...base,
                                marginTop: "3px", // Match the styles you want
                                display: "flex",
                                height: "auto",
                                flexDirection: "row",
                                justifyContent: "center",
                                padding: 0,
                                minHeight: "10px",
                              }),
                              singleValue: (base) => ({
                                ...base,
                                fontFamily: "Poppins, sans-serif",
                                fontSize: "12px",
                                lineHeight: "16px",
                                marginLeft: "8px",
                              }),
                              menu: (base) => ({
                                ...base,
                                width: "200px",
                              }),
                              option: (base) => ({
                                ...base,
                                display: "flex",
                                alignItems: "center",
                                padding: "10px",
                              }),
                              placeholder: (base) => ({
                                ...base,
                                width: "10px",
                              }),
                            }}

                          />
                        )}
                      />
                    </div>

                    {/* Phone Number Input */}
                    <div className="h-16 flex-grow w-[182px]">
                      <input
                        className={` h-[39px] bg-white text-gray-700 outline-none  border-gray-300 py-2  block w-full appearance-none rounded-lg mt-2 pl-2`}
                        autoComplete="off"
                        type={"text"}
                        {...register("phone_no")}
                      />
                      {errors &&
                        errors["phone_no"] && ( // Check if errors and errors[name] exist
                          <p className="mt-1 text-red-500 text-xs md:w-40 ml-1">
                            {errors["phone_no"]?.message}
                          </p>
                        )}
                    </div>
                  </div>
                </div>

                <div className="">
                  <div className="w-full">
                    <InputFieldPassword
                      register={register}
                      name={"password"}
                      label={"Password"}
                      errors={errors}
                      classname="md:w-[271px]"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-center items-center px-4">
                <Button type="submit" isLoading={globalLoader}>
                  Sign Up
                </Button>
              </div>

              <div className="mt-4 text-center">
                <span className="text-black text-[14px] font-medium">
                  Existing User?
                </span>

                <span className="text-[#3889b4] text-sm font-medium hover:underline ml-2">
                  <Link href="home-login">Login</Link>
                </span>
              </div>
            </div>

            {/* Background Image behind the form */}
            <div className="relative top-0 h-full w-full z-0 ">
              <Image
                src={LoginForm}
                alt=""
                className="w-[380px] h-[720px] object-cover rounded-[31px] bg-no-repeat mx-auto"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HomeRegistration;
