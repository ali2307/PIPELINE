"use client";
import React, { useEffect, useState } from "react";
import AccountLayout from "../accountLayout";
import { userProfile } from "@/app/services/api";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import moment from "moment";
import { useStore } from "@/app/store/index";
import avatharImg from "@/app/assets/img/avathar.png";

interface ViewData {
  id?: string;
  address?: string;
  bank?: string;
  city?: string;
  company_address?: string;
  company_name?: string;
  country_id?: number;
  designation?: string;
  dob?: string;
  email?: string;
  fax?: number;
  first_name?: string;
  middle_name?: string;
  phone?: number;
  po_box_no?: number;
  ref_no?: string;
  salary?: number;
  second_name?: string;
  state_id?: number;
  tax_reg_no?: number;
  type?: number;
  user_image?: string;
  user_type?: string;
  username?: string;
  website?: string;
  country?: string;
  state?: string;
}

interface UserDoc {
  doc_file?: string;
  doc_no?: number;
  document_type?: number;
  expiry_date?: string;
  issued_by?: string;
  issued_date?: number;
  doument_type_name?: string;
}

interface UserMembers {
  is_emergency_contact?: boolean;
  mobile?: number;
  name?: string;
  relationship?: string;
}

const AccountDetailsView: React.FC = () => {
  const router = useRouter();
  // const [viewData, setViewData] = useState<ViewData>({});
  // const [userDocs, setUserDocs] = useState<UserDoc[]>([]);
  // const [userMembers, setUserMembers] = useState<UserMembers[]>([]);
  const setAccountDetails = useStore((state) => state.setAccountDetails);
  const { userdata } = useStore((state) => state.accountDetails);

  useEffect(() => {
    userProfile().then((res) => {
      const basic_details = res.data.data.basic_details;
      const user_docs = res.data.data.user_doc;
      const user_members = res.data.data.user_members;
      setAccountDetails({
        basic_details,
        user_docs,
        user_members,
      });
      // setViewData(basic_details);
      // setUserDocs(user_docs);
      // setUserMembers(user_members);
    });
  }, []);

  return (
    <AccountLayout>
      <div className="lg:w-[963px] w-full bg-white lg:ml-4 rounded-lg">
        <div className="card-body border-[7px] border-[#d9d9d9]/20 p-4">
          <h2 className="text-start text-[#013a5c] underline underline-offset-8 text-sm font-medium font-['DM Sans'] uppercase leading-[13.47px]">
            PERSONAL DETAILS
          </h2>
          <div className="grid lg:grid-cols-3 grid-col-1 pt-8 pb-3">
            <div className="relative flex md:left-12 justify-center items-center md:w-[205px] bg-[#fcfcfc] rounded-[5px]">
              <div className="flex items-center h-[194px]  w-full rounded-[5px] ">
                <label
                  htmlFor="file-upload"
                  className="flex justify-center items-center w-full h-full"
                >
                  <div className="border-2 border-dashed md:w-[165px] md:h-[165px] border-[#5d6269] rounded-lg flex items-center justify-center mx-auto cursor-pointer">
                    <Image
                      width={175}
                      height={150}
                      src={
                        userdata?.basic_details?.user_image
                          ? `${process.env.NEXT_PUBLIC_STORAGE_URL}${userdata?.basic_details?.user_image}`
                          : avatharImg
                      }
                      alt=""
                      className="h-full object-cover rounded-lg"
                    />
                  </div>
                </label>
              </div>
            </div>
            <div className="profile-info text-start">
              <div className="flex py-2">
                <p className="w-[90px] text-[#7e7e7e] text-xs font-normal font-['DM Sans'] leading-3">
                  Name :
                </p>
                <strong className="text-[#111111] text-[13px] font-normal font-['DM Sans'] leading-3 px-5">
                  {`${userdata?.basic_details?.first_name} ${userdata?.basic_details?.middle_name} ${userdata?.basic_details?.second_name} `}
                </strong>
              </div>
              <div className="flex py-2">
                <p className="w-[90px] text-[#7e7e7e] text-xs font-normal font-['DM Sans'] leading-3">
                  Date of Birth :
                </p>
                <strong className="text-[#111111] text-[13px] font-normal font-['DM Sans'] leading-3 px-5">
                  {userdata?.basic_details?.dob === null
                    ? null
                    : moment(userdata?.basic_details?.dob).format("DD/MM/YYYY")}
                </strong>
              </div>
              <div className="flex py-2">
                <p className="w-[90px] text-[#7e7e7e] text-xs font-normal font-['DM Sans'] leading-3">
                  Phone Number :
                </p>
                <strong className="text-[#111111] text-[13px] font-normal font-['DM Sans'] leading-3 px-5">
                  {userdata?.basic_details?.phone}
                </strong>
              </div>
              <div className="flex py-2">
                <p className="w-[90px] text-[#7e7e7e] text-xs font-normal font-['DM Sans'] leading-3">
                  Nationality :
                </p>
                <strong className="text-[#111111] text-[13px] font-normal font-['DM Sans'] leading-3 px-5">
                  {userdata?.basic_details?.country}
                </strong>
              </div>
              <div className="flex py-2">
                <p className="w-[90px] text-[#7e7e7e] text-xs font-normal font-['DM Sans'] leading-3">
                  City :
                </p>
                <strong className="text-[#111111] text-[13px] font-normal font-['DM Sans'] leading-3 px-5">
                  {userdata?.basic_details?.city}
                </strong>
              </div>
              <div className="flex py-2">
                <p className="w-[90px] text-[#7e7e7e] text-xs font-normal font-['DM Sans'] leading-3">
                  Address :
                </p>

                <strong className="text-[#111111] text-[13px] font-normal font-['DM Sans'] leading-3 px-5">
                  {userdata?.basic_details?.address}
                </strong>
              </div>
            </div>
            <div className="profile-info text-start">
              <div className="flex py-2">
                <p className="w-[90px] text-[#7e7e7e] text-xs font-normal leading-3 pr-5">
                  ID :
                </p>
                <strong className="text-[#111111] text-[13px] font-normal leading-3 px-5">
                  {userdata?.basic_details?.ref_no}
                </strong>
              </div>
              <div className="flex py-2">
                <p className="w-[90px] text-[#7e7e7e] text-xs font-normal font-['DM Sans'] leading-3">
                  Type :
                </p>
                <strong className="text-[#111111] text-[13px] font-normal leading-3 px-5">
                  {userdata?.basic_details?.type === 0
                    ? "Individual"
                    : "Company"}
                </strong>
              </div>
              <div className="flex py-2">
                <p className="w-[90px] text-[#7e7e7e] text-xs font-normal font-['DM Sans'] leading-3">
                  Po.Box Number :
                </p>
                <strong className="text-[#111111] text-[13px] font-normal font-['DM Sans'] leading-3 px-5">
                  {userdata?.basic_details?.po_box_no}
                </strong>
              </div>
              <div className="flex py-2">
                <p className="w-[90px] text-[#7e7e7e] text-xs font-normal font-['DM Sans'] leading-3">
                  State :
                </p>
                <strong className="text-[#111111] text-[13px] font-normal font-['DM Sans'] leading-3 px-5">
                  {userdata?.basic_details?.state}
                </strong>
              </div>
            </div>
          </div>
        </div>
        <div className="card-body border-[7px] border-[#d9d9d9]/20 pt-4 pb-2 px-5">
          <h2 className="text-start text-[#013a5c] underline underline-offset-8 text-sm font-medium font-['DM Sans'] uppercase leading-[13.47px]">
            COMPANY DETAILS
          </h2>
          <div className="grid lg:grid-cols-2 grid-cols-1 py-4 px-5 gap-4">
            <div className="profile-info text-start">
              <div className="flex py-2">
                <p className="w-[112px] text-[#7e7e7e] text-xs font-normal font-['DM Sans'] leading-3">
                  Company Name :
                </p>
                <strong className="text-[#111111] text-[13px] font-normal font-['DM Sans'] leading-3 px-5">
                  {userdata?.basic_details?.company_name}
                </strong>
              </div>
              <div className="flex py-2">
                <p className="w-[112px] text-[#7e7e7e] text-xs font-normal font-['DM Sans'] leading-3">
                  Designation :
                </p>
                <strong className="text-[#111111] text-[13px] font-normal font-['DM Sans'] leading-3 px-5">
                  {userdata?.basic_details?.designation}
                </strong>
              </div>
              <div className="flex py-2">
                <p className="w-[112px] text-[#7e7e7e] text-xs font-normal font-['DM Sans'] leading-3">
                  Company Address :
                </p>
                <strong className="text-[#111111] text-[13px] font-normal font-['DM Sans'] leading-3 px-5">
                  {userdata?.basic_details?.company_address}
                </strong>
              </div>
            </div>
            <div className="profile-info text-start">
              <div className="flex py-2">
                <p className="w-[60px] text-[#7e7e7e] text-xs font-normal leading-3 pr-5">
                  Email :
                </p>
                <strong className="text-[#111111] text-[13px] font-normal leading-3">
                  {userdata?.basic_details?.email}
                </strong>
              </div>
              <div className="flex py-2">
                <p className="w-[60px] text-[#7e7e7e] text-xs font-normal font-['DM Sans'] leading-3">
                  Salary :
                </p>
                <strong className="text-[#111111] text-[13px] font-normal leading-3 ">
                  {userdata?.basic_details?.salary}{" "}
                  <span>{userdata?.basic_details?.currency_code}</span>
                </strong>
              </div>
              <div className="flex py-2">
                <p className="w-[60px] text-[#7e7e7e] text-xs font-normal font-['DM Sans'] leading-3">
                  Bank :
                </p>
                <strong className="text-[#111111] text-[13px] font-normal font-['DM Sans'] leading-3">
                  {userdata?.basic_details?.bank}
                </strong>
              </div>
            </div>
          </div>
        </div>
        <div className="card-body border-[7px] border-[#d9d9d9]/20 p-4">
          <h2 className="text-start text-[#013a5c] underline underline-offset-8 text-sm font-medium font-['DM Sans'] uppercase leading-[13.47px]">
            MEMBER DETAILS
          </h2>
          <div className="grid grid-cols-1 py-6">
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 bg-[#F5FCFF]">
                  <tr>
                    <th
                      scope="col"
                      className="text-[#7E7E7E] text-xs font-normal leading-3 px-6 py-3"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="text-[#7E7E7E] text-xs font-normal leading-3 px-6 py-3"
                    >
                      Mobile
                    </th>
                    <th
                      scope="col"
                      className="text-[#7E7E7E] text-xs font-normal leading-3 px-6 py-3"
                    >
                      Relationship
                    </th>
                    <th
                      scope="col"
                      className="text-[#7E7E7E] text-xs font-normal leading-3 px-6 py-3"
                    ></th>
                    <th
                      scope="col"
                      className="text-[#7E7E7E] text-xs font-normal leading-3 px-6 py-3"
                    ></th>
                  </tr>
                </thead>
                <tbody>
                  {userdata?.user_members?.map((member: any, index: number) => {
                    return (
                      <tr className="bg-white border-b" key={index}>
                        <td className="text-[#111111] text-[13px] font-normal font-['DM Sans'] leading-3 px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                          {member.name}
                        </td>
                        <td className="text-[#111111] text-[13px] font-normal font-['DM Sans'] leading-3 px-6 py-4">
                          {member.mobile}
                        </td>
                        <td className="text-[#111111] text-[13px] font-normal font-['DM Sans'] leading-3 px-6 py-4">
                          {member.relationship}
                        </td>
                        <td className="text-[#7E7E7E] text-[13px] font-normal font-['DM Sans'] leading-3 px-6 py-4">
                          {member.is_emergency_contact
                            ? "Emergency Contact"
                            : ""}
                        </td>
                        <td className="text-[#111111] text-[13px] font-normal font-['DM Sans'] leading-3 px-6 py-4"></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="card-body border-[7px] border-[#d9d9d9]/20 p-6">
          <h2 className="text-start text-[#013a5c] underline underline-offset-8 text-sm font-medium font-['DM Sans'] uppercase leading-[13.47px]">
            DOCUMENTS SECTION
          </h2>
          <div className="grid grid-cols-1 py-6">
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 bg-[#F5FCFF]">
                  <tr>
                    <th
                      scope="col"
                      className="text-[#7E7E7E] text-xs font-normal leading-3 px-6 py-3"
                    >
                      Document Type
                    </th>
                    <th
                      scope="col"
                      className="text-[#7E7E7E] text-xs font-normal leading-3 px-6 py-3"
                    >
                      Document Number
                    </th>
                    <th
                      scope="col"
                      className="text-[#7E7E7E] text-xs font-normal leading-3 px-6 py-3"
                    >
                      Issued By
                    </th>
                    <th
                      scope="col"
                      className="text-[#7E7E7E] text-xs font-normal leading-3 px-6 py-3"
                    >
                      Issued Date
                    </th>
                    <th
                      scope="col"
                      className="text-[#7E7E7E] text-xs font-normal leading-3 px-6 py-3"
                    >
                      Expiry Date
                    </th>
                    <th
                      scope="col"
                      className="text-[#7E7E7E] text-xs font-normal leading-3 px-6 py-3"
                    >
                      Attachments
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {userdata?.user_docs?.map((doc: any, index: number) => {
                    return (
                      <tr className="bg-white border-b" key={index}>
                        <td className="text-[#111111] text-[13px] font-normal font-['DM Sans'] leading-3 px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                          {doc.doument_type_name}
                        </td>
                        <td className="text-[#111111] text-[13px] font-normal font-['DM Sans'] leading-3 px-6 py-4">
                          {doc.doc_no}
                        </td>
                        <td className="text-[#111111] text-[13px] font-normal font-['DM Sans'] leading-3 px-6 py-4">
                          {doc.issued_by}
                        </td>
                        <td className="text-[#111111] text-[13px] font-normal font-['DM Sans'] leading-3 px-6 py-4">
                          {moment(doc.issued_date).format("DD/MM/YYYY")}
                        </td>
                        <td className="text-[#111111] text-[13px] font-normal font-['DM Sans'] leading-3 px-6 py-4">
                          {moment(doc.expiry_date).format("DD/MM/YYYY")}
                        </td>
                        <td className="px-6 py-4">
                          <div className="w-[102px] flex flex-wrap flex-col">
                            <Link
                              className="inline-block text-gray-600"
                              href={`${process.env.NEXT_PUBLIC_STORAGE_URL}${doc.doc_file}`}
                              target="_blank"
                            >
                              <div className="flex">
                                <p className="block mb-1 text-[#0670B1] hover:text-black text-xs text-start font-normal font-['DM Sans'] leading-3 w-20 text-sm truncate">
                                  {doc.doc_file}
                                </p>
                                <svg
                                  width="11"
                                  height="11"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <g clip-path="url(#clip0_11554_4168)">
                                    <path
                                      d="M10.6823 4.09291C10.599 4.00959 10.4643 4.00959 10.381 4.09291L4.56463 9.90926C4.13588 10.338 3.5637 10.5739 2.95296 10.5739C2.342 10.5739 1.76961 10.338 1.34107 9.90926C0.912527 9.4805 0.676413 8.90833 0.676413 8.29737C0.676413 7.68663 0.912314 7.11424 1.34107 6.6857L7.1572 0.869138C7.77455 0.252001 8.74373 0.28972 9.41159 0.957148C10.0792 1.62479 10.1172 2.59418 9.49981 3.21153L4.03593 8.67562C3.73056 8.981 3.23318 8.98121 2.92717 8.67562C2.62159 8.36983 2.62159 7.87245 2.92717 7.56687L6.6285 3.86553C6.71183 3.78221 6.71183 3.64753 6.6285 3.56421C6.54518 3.48089 6.4105 3.48089 6.32718 3.56421L2.62585 7.26533C2.15405 7.73713 2.15405 8.50472 2.62585 8.97673C3.09808 9.44896 3.86588 9.44811 4.33725 8.97673L9.80135 3.51264C10.5905 2.72332 10.5525 1.49501 9.71312 0.655612C8.87394 -0.183575 7.64542 -0.22172 6.85609 0.567602L1.03953 6.38416C0.530226 6.89326 0.25 7.57262 0.25 8.29737C0.25 9.02212 0.530226 9.7017 1.03953 10.2108C1.54863 10.7201 2.22799 11.0003 2.95296 11.0003C3.6775 11.0003 4.35707 10.7201 4.86617 10.2108L10.6823 4.39424C10.7656 4.31091 10.7656 4.17602 10.6823 4.09291Z"
                                      fill="black"
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_11554_4168">
                                      <rect
                                        width="11"
                                        height="11"
                                        fill="white"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </div>
                            </Link>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="flex justify-end items-end my-2">
          <button
            type="button"
            onClick={() => router.push(`/account-details`)}
            className="w-[78px] h-10 relative focus:outline-none text-white bg-[#004570] hover:bg-black hovre:text-white font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
          >
            Edit
          </button>
        </div>
      </div>
    </AccountLayout>
  );
};

export default AccountDetailsView;
