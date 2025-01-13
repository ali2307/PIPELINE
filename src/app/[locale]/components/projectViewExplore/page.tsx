"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useStore } from "./../../../store/index";
import { ZERO } from "@/app/utils/constants";
interface NewArray {
  [key: string]: string | undefined; // Key is a string, value is a string or undefined
}

const ProjectViewExplore: React.FC = () => {
  const { title, content, carditem, subtitle } = useStore(
    (state) => state.projectViewExplore
  );
  const [newArray, setNewArray] = useState<NewArray>({});

  useEffect(() => {
    if (subtitle && subtitle?.length > ZERO) {
      const tempArray: NewArray = {}; // Provide type information
      subtitle.forEach((item: any, index: any) => {
        tempArray[`text${index + 1}`] = item.subheading;
      });
      setNewArray(tempArray);
    }
  }, [subtitle]);
  return (
    <>
      <section>
        <div className="container 2xl:w-[1461px] mx-auto py-12 md:shadow-none shadow">
          <div className=" w-full flex flex-col lg:flex-row mx-auto">
            <div className="w-full lg:w-1/3 lg:mt-28 ">
              <div className="md:pr-8 px-5">
                <div className="xl:pl-[45px] md:text-start text-center">
                  <div className="relative">
                    <h4 className="text-[#3f3f3f]/60 md:text-xl text-[12px] font-normal  text-start uppercase leading-[19.20px]">
                      Explore More
                    </h4>
                    <div className="absolute md:left-[319px] left-[260px] md:top-[74%] w-[173px] h-[0px] origin-top-left rotate-180 border border-[#635959] 2xl:block"></div>
                  </div>
                  <h2 className="text-black  text-2xl lg:text-[40px] md:text-[32px] mt-3 md:text-start text-start font-normal font-optima uppercase lg:min-w-[165px] lg:max-w-[332px]  overflow-hidden md:leading-[2.8rem] leading-[1.9rem]">
                    {title.toUpperCase()}
                  </h2>
                  <p
                    className="lg:max-w-[385px] lg:min-h-[235px] overflow-hidden text-justify text-black text-sm font-medium lg:py-10 py-3"
                    dangerouslySetInnerHTML={{
                      __html: content,
                    }}
                  ></p>
                </div>
                <div className="relative sm:h-[170px] ">
                  <div className="relative md:w-[161px] w-[142px] h-[142px]  border border-black mt-8"></div>
                  <div className="relative w-[full h-[90px] top-[-7rem] left-[3%] lg:left-[10%]  xl:w-[390px] lg:w-[225px] 2xl:bottom-[8.5rem] xl:-bottom-[1.2rem] xl:left-[43px] bg-[#eff6fa] items-center mb-3 flex justify-center">
                    <h3 className="md:min-w-[298px] md:max-w-[312px] min-w-[225px] max-w-[225px] overflow-hidden flex text-center text-black xl:text-xl text-md font-normal  py-5 items-center justify-center font-optima mx-auto ">
                      {newArray?.text1?.toLocaleUpperCase()}
                    </h3>
                    {/* </div> */}
                  </div>
                </div>
              </div>
            </div>
            {/* Right Images Section */}
            <div className="col-span-9 order-1">
              <div className="w-full grid md:grid-cols-2 grid-cols-1">
                <div className="">
                  {carditem?.slice(0, 1).map((item: any, index: number) => (
                    <>
                      <div className="w-full p-2 ">
                        <div className=" relative">
                          <Image
                            // src={explore1}
                            src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${item.file?.[0]?.img_md_url}`}
                            alt="Louvre Abu Dhabi"
                            width={460}
                            height={162}
                            className="md:w-[460px] min-h-[362px] max-h-[362px] w-full object-cover"
                          />
                          <div className="absolute right-8 my-4  w-24 h-[0px]  -rotate-180 border border-gray-500 hidden  2xl:block" />
                        </div>
                        <div className="py-5">
                          <p className="mt-2 md:text-start text-center  text-black max-w-[258px] min-w-[258px] overflow-hidden  text-[23px] font-normal font-optima">
                            {item.title}
                          </p>
                          <div className="relative md:left-[15rem] w-[41px] h-[0px] origin-top-right rotate-90 border border-gray-500 hidden  2xl:block" />
                        </div>
                      </div>
                    </>
                  ))}

                  <div className="w-full p-2 ">
                    {carditem?.slice(1, 2).map((item: any, index: number) => (
                      <>
                        <div className="relative">
                          <Image
                            src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${item.file?.[0]?.img_md_url}`}
                            alt="Yas Island Abu Dhabi"
                            width={460}
                            height={276}
                            className="md:w-[460px] min-h-[276px] max-h-[276px] w-full object-cover"
                          />
                          <div className="absolute right-8  my-4  w-24 h-[0px]  -rotate-180 border border-gray-500 hidden  2xl:block" />
                        </div>
                        <div className="py-5">
                          <p className="mt-2  md:text-start text-center text-black text-[23px] max-w-[258px] min-w-[258px] overflow-hidden  font-normal font-optima">
                            {item.title}
                          </p>
                          <div className="relative md:left-[15rem] w-[41px] h-[0px] origin-top-right rotate-90 border border-gray-500 hidden  2xl:block" />
                        </div>
                      </>
                    ))}
                  </div>
                  <div className="w-full  p-2  ">
                    {carditem?.slice(2, 3).map((item: any, index: number) => (
                      <>
                        <div className="relative ">
                          <Image
                            src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${item.file?.[0]?.img_md_url}`}
                            alt="The Grove Abu Dhabi"
                            width={460}
                            height={326}
                            className="md:w-[460px] min-h-[326px]  max-h-[326px] w-full object-cover"
                          />
                          <div className="absolute right-8 my-4  w-24 h-[0px] -rotate-180 border border-gray-500 hidden  2xl:block" />
                        </div>
                        <div className="py-5">
                          <p className="mt-2  md:text-start text-center text-black text-[23px] max-w-[258px] min-w-[258px] overflow-hidden   font-normal font-optima">
                            {item.title}
                          </p>
                          <div className="relative md:left-[15rem] w-[41px] h-[0px] origin-top-right rotate-90 border border-gray-500 hidden 2xl:block" />
                        </div>
                      </>
                    ))}
                  </div>
                </div>
                <div className="">
                  <div className="w-full p-2">
                    {carditem?.slice(3, 4).map((item: any, index: number) => (
                      <>
                        <div className="relative ">
                          <Image
                            src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${item.file?.[0]?.img_md_url}`}
                            alt="Louvre Abu Dhabi"
                            width={438}
                            height={247}
                            className="  min-h-[247px] max-h-[247px] w-full  object-cover"
                          />
                          <div className="absolute  right-0 my-4  w-24 h-[0px] -rotate-180 border bg-blue-700 border-gray-500 hidden 2xl:block" />
                        </div>
                        <div className="py-4">
                          <p className="mt-2  md:text-start text-center text-black text-[23px] max-w-[258px] min-w-[258px] overflow-hidden font-normal font-optima">
                            {item.title}
                          </p>
                          <div className="relative md:left-[15rem] right-[30rem]  w-[41px] h-[0px] origin-top-right rotate-90 border border-gray-500 hidden  2xl:block" />
                        </div>
                      </>
                    ))}
                  </div>
                  <div className="w-full  p-2">
                    {carditem?.slice(4, 5).map((item: any, index: number) => (
                      <>
                        <div className="relative">
                          <Image
                            src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${item.file?.[0]?.img_md_url}`}
                            alt="Saadiyat Beach Golf Club"
                            width={438}
                            height={198}
                            className="  min-h-[198px] max-h-[198px] w-full object-cover"
                          />
                          <div className="absolute   right-0  my-4  w-24 h-[0px]  -rotate-180 border border-gray-500 hidden  2xl:block" />
                        </div>
                        <div className="py-4">
                          <p className="mt-2  md:text-start text-center text-black text-[23px] max-w-[258px] min-w-[258px] overflow-hidden   font-normal font-optima">
                            {item.title}
                          </p>
                          <div className="relative md:left-[15rem] right-[30rem] w-[41px] h-[0px] origin-top-right rotate-90 border border-gray-500 hidden  2xl:block" />
                        </div>
                      </>
                    ))}
                  </div>
                  <div className="w-full  p-2">
                    {carditem?.slice(5, 6).map((item: any, index: number) => (
                      <>
                        <div className="relative">
                          <Image
                            src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${item.file?.[0]?.img_md_url}`}
                            alt="Kai Beach Abu Dhabi"
                            width={438}
                            height={247}
                            className=" min-h-[247px] max-h-[247px] w-full  object-cover"
                          />
                          <div className="absolute  right-0   my-4  w-24 h-[0px]  -rotate-180 border border-gray-500 hidden  2xl:block" />
                        </div>
                        <div className="py-4">
                          <p className="mt-2  md:text-start text-center text-black text-[23px] max-w-[258px] min-w-[258px] overflow-hidden   font-normal font-optima">
                            {item.title}
                          </p>
                          <div className="relative md:left-[15rem] right-[30rem]   w-[41px] h-[0px] origin-top-right rotate-90 border border-gray-500 hidden  2xl:block" />
                        </div>
                      </>
                    ))}
                  </div>
                  <div className="w-full p-2">
                    {carditem?.slice(6, 7).map((item: any, index: number) => (
                      <>
                        <div className="relative bg-yellow-300 ">
                          <Image
                            src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${item.file?.[0]?.img_md_url}`}
                            alt="Saadiyat Beach Golf Club"
                            width={438}
                            height={200}
                            className=" min-h-[200px] max-h-[200px] w-full  object-cover"
                          />
                          <div className="absolute right-0  my-4  w-24 h-[0px]  -rotate-180 border border-gray-500 hidden  2xl:block" />
                        </div>
                        <div className="py-4">
                          <p className="mt-2  md:text-start text-center text-black text-[23px] max-w-[258px] min-w-[258px] overflow-hidden   font-normal font-optima">
                            {item.title}
                          </p>
                          <div className="relative md:left-[15rem] right-[30rem] w-[41px] h-[0px] origin-top-right rotate-90 border border-gray-500 hidden 2xl:block" />
                        </div>
                      </>
                    ))}
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
export default ProjectViewExplore;
