"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { subscriptionEmail } from "@/app/services/api";
import { toast } from "react-toastify";
import { useStore } from "./../../../store/index";

const Footer: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const {
    address,
    company,
    twitter_url,
    phone,
    logo,
    is_erp_integrated,
    instagram_url,
    facebook_url,
    email,
  } = useStore((state) => state.profile);

  const onSubmit = (data: any) => {
    const _data = new FormData();

    _data.append("email", data["email_address"]);
    subscriptionEmail(_data)
      .then((res) => {
        toast.success(res.data.message || "Success");
        reset();
      })
      .catch((error) => {
        console.log(error);
        // toast.error(error.response.data.message || "Failed to Subscribe");
        reset();
      });
  };
  return (
    <footer className="footer">
      <div className="container mx-auto md:block hidden ">
        <div className="flex px-8 pt-2 max-w-screen-xl flex-col lg:flex-row justify-center items-center  mx-auto  sm:px-6 lg:px-8">
          <h2 className="text-white text-center mt-5 font-bold md:text-3xl text-xl">
            Make your dreams a{" "}
            <span className="text-[#3176DE] font-bold md:text-3xl text-xl">
              reality
            </span>
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex justify-center max-w-sm mx-auto"
          >
            <div
              data-element="fields"
              data-stacked="false"
              className="flex md:flex-row items-center justify-center md:mx-10mx-0  w-full max-w-md md:mt-6 seva-fields formkit-fields"
            >
              <div className="relative w-full md:mr-2 md:mb-6 formkit-field">
                <label
                  htmlFor="member_email"
                  className="text-sm font-medium md:mb-5 mb-10 text-gray-900"
                >
                  Email address
                </label>
                <input
                  id="member_email"
                  className={`formkit-input bg-gray-50 border md:mb-0 mb-5 md:w-[286px] md:h-[47px] border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none block w-full pl-10 p-2.5 ${errors.email_address ? "" : ""
                    }`}
                  {...register("email_address", {
                    required: "Email address is required",
                  })}
                  aria-label="Email Address"
                  placeholder=""
                  type="email"
                />
              </div>
              <button
                data-element="submit"
                className="formkit-submit md:w-[134px] h-[47px] sm:ml-1"
              >
                <div className="formkit-spinner">
                  <div />
                  <div />
                  <div />
                </div>
                <span className="px-5 py-3.5 2xl:text-md sm:text-sm text-sm font-semibold text-center text-black bg-[#0670B1] rounded-tr-lg cursor-pointer hover:bg-black hover:text-white focus:ring-4 focus:ring-blue-300 ">
                  Subscribe
                </span>
              </button>
            </div>
          </form>
        </div>
        <div className="max-w-screen-xl px-4  pb-6 mx-auto sm:px-6 lg:px-8 ">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 md:pt-8 border-t mt-3 border-gray-800">
            <div className="sm:border-b border-gray-800 py-4">
              <div className="flex lg:justify-start justify-center text-teal-300 ">
                <Image
                  src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${logo[0]?.url}`}
                  alt=""
                  width={61}
                  height={60}
                />
              </div>
              <ul className="flex lg:justify-start justify-center mt-8 md:gap-8 gap-4 ">
                <li>
                  <a
                    href={facebook_url}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="text-white transition hover:text-blue-500/75"
                  >
                    <span className="sr-only">Facebook</span>
                    <svg
                      className="w-6 h-6"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 8 19"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href={twitter_url}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="text-white transition hover:text-blue-500/75"
                  >
                    <span className="sr-only">Twitter</span>
                    <svg
                      className="w-6 h-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 512 512"
                    >
                      <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href={instagram_url}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="text-white transition hover:text-blue-500/75"
                  >
                    <span className="sr-only">Instagram</span>
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
            <div className="grid md:pb-20 pb-4 grid-cols-1 gap-8 lg:col-span-2 md:grid-cols-3  lg:grid-cols-3 ">
              <div className="grid lg:justify-center md:justify-center justify-start items-end  sm:text-left">
                <p className="2xl:text-base font-bold text-white lg:text-lg text-md">
                  Company
                </p>
                <nav className="mt-2">
                  <ul className="space-y-3 text-sm md:text-left ">
                    <li>
                      <Link
                        className="text-[#979797] 2xl:text-base font-normal transition hover:text-white/75 lg:text-lg text-md"
                        href="/"
                      >
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="text-[#979797] 2xl:text-base font-normal transition hover:text-white/75 lg:text-lg text-md"
                        href="/about"
                      >
                        About
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="text-[#979797] 2xl:text-base font-normal  transition hover:text-white/75 lg:text-lg text-md"
                        href="/blog"
                      >
                        Blog
                      </Link>
                    </li>
                    <li>
                      <a
                        className="text-[#979797] 2xl:text-base font-normal transition hover:text-white/75 lg:text-lg text-md"
                        href="/contactus"
                      >
                        Contact
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="grid lg:justify-center md:justify-center items-start justify-start">
                <p className="2xl:text-base font-medium text-white lg:text-lg text-md">
                  Property Service
                </p>
                <nav className="mt-2">
                  <ul className="space-y-3 text-sm md:text-left ">
                    <li>
                      <a
                        className="text-[#979797] 2xl:text-base font-normal transition hover:text-white/75 lg:text-lg text-md"
                        href="/"
                      >
                        Commercial Rent
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-[#979797] 2xl:text-base font-normal transition hover:text-white/75 lg:text-lg text-md"
                        href="/"
                      >
                        Residential PLot
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-[#979797] 2xl:text-base font-normal transition hover:text-white/75 lg:text-lg text-md"
                        href="/"
                      >
                        Residential Villa
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-[#979797] 2xl:text-base font-normal transition hover:text-white/75 lg:text-lg text-md"
                        href="/"
                      >
                        Office
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="grid items-start lg:justify-start md:justify-center justify-start">
                <p className="font-medium 2xl:text-base text-white lg:text-lg text-md  md:text-start">
                  Contact us
                </p>
                <nav className="mt-2">
                  <ul className="space-y-3 text-sm md:text-left ">
                    <li>
                      <a
                        className="text-[#979797] 2xl:text-base font-normal transition hover:text-white/75 lg:text-lg text-md"
                        href="/"
                      >
                        {address}
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-[#979797] 2xl:text-base font-normal transition hover:text-white/75 lg:text-lg text-md"
                        href="/"
                      >
                        {email}
                      </a>
                    </li>
                    <li>
                      <a
                        className="flex group md:justify-start  gap-1.5"
                        href="/"
                      >
                        <span className="text-[#979797] 2xl:text-base font-normal transition group-hover:text-white/75 lg:text-lg text-md">
                          {phone}
                        </span>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      <span className="md:block hidden md:text-lg text-sm text-[#656565] font-medium font-optima py-4 text-center bg-[#313131]  items-center">
        © 2024 .All Rights Reserved.
      </span>

      {/* Mob-view */}

      <div className="container mx-auto sm:block hidden">
        <div className="max-w-screen-xl px-4 mx-auto sm:px-6 lg:px-8 ">
          <div className="grid grid-cols-1 lg:grid-cols-3 md:pt-8 border-t mt-3 border-gray-800">
            <div className="sm:border-b border-gray-700 py-4">
              <div className="flex flex-col items-center justify-center text-teal-300 ">
                <Image
                  src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${logo[0]?.url}`}
                  alt=""
                  width={61}
                  height={60}
                  className="w-[91px] h-[90px] my-5"
                />

                <p className="text-center text-[#979797] text-[15px] font-normal max-w-60 leading-6">
                  Hili Tower A, First Floor, Office 101
                  <br />
                  Al Khalidiya, Abu Dhabi, UAE
                </p>
                <span className="text-[#979797] text-[13px] font-normal">
                  leasing@adu-re.com |  +971 2 666 4433{" "}
                </span>
              </div>
              <ul className="flex lg:justify-start justify-center mt-4 md:gap-8 gap-4 ">
                <li>
                  <a
                    href={facebook_url}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="text-white transition hover:text-blue-500/75"
                  >
                    <span className="sr-only">Facebook</span>
                    <svg
                      className="w-4 h-4"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 8 19"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href={twitter_url}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="text-white transition hover:text-blue-500/75"
                  >
                    <span className="sr-only">Twitter</span>
                    <svg
                      className="w-4 h-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 512 512"
                    >
                      <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href={instagram_url}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="text-white transition hover:text-blue-500/75"
                  >
                    <span className="sr-only">Instagram</span>
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
            <div className="grid md:pb-20 pb-4 grid-cols-1 gap-5 lg:col-span-2 md:grid-cols-3  lg:grid-cols-3 ">
              <div className="grid lg:justify-center md:justify-center justify-start items-end  sm:text-left  ">
                <nav className="mt-2">
                  <ul className="space-y-3 text-sm md:text-left">
                    <li>
                      <Link
                        className="text-[#979797] 2xl:text-base font-normal transition hover:text-white/75 lg:text-lg text-md ml-6"
                        href="/"
                      >
                        Home
                      </Link>
                    </li>
                    <div className="w-[17rem] sm:border-b border-gray-700 "></div>
                    <li>
                      <Link
                        className="text-[#979797] 2xl:text-base font-normal transition hover:text-white/75 lg:text-lg text-md ml-6"
                        href="/about"
                      >
                        About
                      </Link>
                    </li>
                    <div className="w-[17rem] sm:border-b border-gray-700 "></div>
                    <li>
                      <Link
                        className="text-[#979797] 2xl:text-base font-normal  transition hover:text-white/75 lg:text-lg text-md ml-6"
                        href="/project-view/qaryat-al-hidd"
                      >
                        Projects
                      </Link>
                    </li>
                    <div className="w-[17rem] sm:border-b border-gray-700 "></div>
                    <li>
                      <Link
                        className="text-[#979797] 2xl:text-base font-normal  transition hover:text-white/75 lg:text-lg text-md ml-6"
                        href="/property"
                      >
                        Featured Properties
                      </Link>
                    </li>
                    <div className="w-[17rem]  sm:border-b border-gray-700"></div>
                    <li>
                      <Link
                        className="text-[#979797] 2xl:text-base font-normal  transition hover:text-white/75 lg:text-lg text-md ml-6"
                        href="/blog"
                      >
                        Blog
                      </Link>
                    </li>
                    <div className="w-[17rem]  sm:border-b border-gray-700 "></div>
                    <li>
                      <a
                        className="text-[#979797] 2xl:text-base font-normal transition hover:text-white/75 lg:text-lg text-md ml-6"
                        href="/contactus"
                      >
                        Contact
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      <span className="sm:block hidden md:text-lg text-sm text-[#656565] font-medium font-optima py-4 text-center bg-[#313131]  items-center">
        © 2024 .All Rights Reserved.
      </span>
    </footer>
  );
};
export default Footer;
