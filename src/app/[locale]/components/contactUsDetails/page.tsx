import React from "react";

interface ContactUsDetailsProps {
  address: string;
  phoneNumber: string;
  email: string;
  company: string;
}

const ContactUsDetails: React.FC<ContactUsDetailsProps> = ({
  address,
  phoneNumber,
  email,
  company,
}) => {
  return (
    <React.Fragment>
      <div className="flex">
        <div className="h-12 p-2 flex items-center bg-white rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg mr-5 mt-12">
          <svg
            width={27}
            height={23}
            viewBox="0 0 27 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.85826 1.76626V21.1951H15.4297V1.76626H3.85826ZM2.89397 0H16.394C16.6497 0 16.895 0.0930437 17.0758 0.258663C17.2567 0.424281 17.3583 0.648909 17.3583 0.883129V22.0782C17.3583 22.3125 17.2567 22.5371 17.0758 22.7027C16.895 22.8683 16.6497 22.9614 16.394 22.9614H2.89397C2.63823 22.9614 2.39296 22.8683 2.21212 22.7027C2.03128 22.5371 1.92969 22.3125 1.92969 22.0782V0.883129C1.92969 0.648909 2.03128 0.424281 2.21212 0.258663C2.39296 0.0930437 2.63823 0 2.89397 0Z"
              fill="#4ECB71"
            />
            <path
              d="M5.78571 5.29883H13.5V7.06509H5.78571V5.29883ZM5.78571 10.5976H13.5V12.3639H5.78571V10.5976ZM5.78571 15.8964H13.5V17.6626H5.78571V15.8964ZM17.3571 12.3639H21.2143V14.1301H17.3571V12.3639ZM17.3571 15.8964H21.2143V17.6626H17.3571V15.8964ZM0 21.1952H27V22.9614H0V21.1952Z"
              fill="#4ECB71"
            />
            <path
              d="M17.3583 8.83071V21.1945H23.144V8.83071H17.3583ZM16.394 7.06445H24.1083C24.364 7.06445 24.6093 7.1575 24.7901 7.32312C24.971 7.48873 25.0726 7.71336 25.0726 7.94758V22.0776C25.0726 22.3118 24.971 22.5365 24.7901 22.7021C24.6093 22.8677 24.364 22.9608 24.1083 22.9608H16.394C16.1382 22.9608 15.893 22.8677 15.7121 22.7021C15.5313 22.5365 15.4297 22.3118 15.4297 22.0776V7.94758C15.4297 7.71336 15.5313 7.48873 15.7121 7.32312C15.893 7.1575 16.1382 7.06445 16.394 7.06445Z"
              fill="#4ECB71"
            />
          </svg>
        </div>
        <div className="flex flex-col">
          <h4 className="text-[#000d2e] md:text-2xl text-[17px] font-medium font-['DM Sans'] leading-[23px] mb-3">
            Pay us a visit
          </h4>
          <h2 className="mb-3">{company}</h2>
          <h2>{address}</h2>
        </div>
      </div>
      {/* Vertical Line */}
      <div className="mx-5 w-0.5 h-52 bg-gray-400" />
      {/* Second Box */}
      <div className="flex">
        <div className="inline-block p-4 h-12 bg-white rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg">
          <svg
            width={18}
            height={22}
            viewBox="0 0 18 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.80006 0.641742L4.73706 0.106895C5.37634 -0.0693422 6.06378 -0.0265819 6.67117 0.227199C7.27855 0.480981 7.76439 0.928452 8.03806 1.48614L9.39606 4.25196C9.63176 4.73178 9.69745 5.26716 9.58392 5.78293C9.47039 6.2987 9.18334 6.76896 8.76306 7.12767L6.69606 8.89157C6.41906 9.13243 6.62906 10.0712 7.64106 11.6775C8.65406 13.2848 9.43706 13.9204 9.79806 13.8215L12.5061 13.0632C13.055 12.9094 13.6427 12.9168 14.1867 13.0843C14.7308 13.2519 15.2041 13.5711 15.5401 13.9973L17.4701 16.4472C17.8599 16.9419 18.0404 17.5494 17.978 18.1568C17.9157 18.7642 17.6147 19.3302 17.1311 19.7497L15.6391 21.0438C15.1574 21.4615 14.5634 21.7547 13.9176 21.8936C13.2718 22.0324 12.5974 22.0119 11.9631 21.8341C8.83706 20.9577 5.94206 18.3567 3.23906 14.0679C0.530064 9.7726 -0.492935 6.14956 0.220064 3.18959C0.363869 2.59316 0.678754 2.04264 1.13226 1.59478C1.58577 1.14693 2.16148 0.817944 2.80006 0.641742Z"
              fill="black"
            />
          </svg>
        </div>
        <div className="flex flex-col">
          <h4 className="text-[#000d2e] md:text-2xl text-[17px] font-medium font-['DM Sans'] leading-[23px] ml-3">
            Or drop us a line
          </h4>
          <h2 className="ml-4 mt-4">{email}</h2>
          <h2 className="ml-4 mt-4">{phoneNumber}</h2>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ContactUsDetails;
