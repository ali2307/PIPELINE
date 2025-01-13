"use client";
import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import Image from "next/image";
import Link from "next/link";
import Login from "../../login/[[...slug]]/page";
import Registration from "../../registration/page";
import ReactPaginate from "react-paginate";
import {
  addtoWishlist,
  fetchUnits,
  viewPropertyUnits,
} from "@/app/services/api";
import { toast } from "react-toastify";
import { useStore } from "./../../../store/index";
import { usePathname, useSearchParams } from "next/navigation";
import { SEARCH_UNIT_ROUTE, ZERO } from "@/app/utils/constants";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Pagination,
  EffectFlip,
  EffectCube,
  EffectCards,
} from "swiper/modules";
import "swiper/css/effect-flip";
interface UnitSpecification {
  id: number;
  name: string;
  value: string;
  icon: string;
}

interface File {
  img_md_url: string;
}

interface CardItem {
  is_wishlist: any;
  id: number;
  name: string;
  unit_no: string;
  rate: string;
  file: File[];
  unit_specifications: UnitSpecification[];
  area: string;
  description: string;
  slug: string;
}
interface SessionDataType {
  id: number;
  name: string;
  property: string;
  title: string;
  section_heading: string;
  content: string;
  section_images: [];
  parent_type_id: number;
  child_sections: [];
}
interface PropertyViewCardProps {
  carditem: CardItem[];
  price?: any;
  communityId?: number;
  bedsAndBaths?: any;
}

const PropertyViewCard: React.FC<PropertyViewCardProps> = ({
  carditem,
  price,
  communityId,
}) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isCreateAccountModalOpen, setIsCreateAccountModalOpen] =
    useState(false);

  const setWishlistStatus = useStore((state) => state.setWishlistStatus);
  const { isWishlist, currentPage, totalPage, perPage } = useStore(
    (state) => state.propertyViewListing
  );
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const segments = pathname.split("/");
  const slug = segments[3];
  const [sessionData, setSessionData] = useState<Array<SessionDataType>>([]);
  const setPropertyView = useStore((state) => state.setPropertyView);
  const setCurrentPage = useStore((state) => state.setCurrentPage);
  const setSearchFilterList = useStore((state) => state.setSearchFilterList);
  const { propertyType, bedsAndBaths } = useStore(
    (state) => state.searchFilter
  );

  const loginModalRef = useRef<HTMLDivElement>(null);
  const registerModalRef = useRef<HTMLDivElement>(null);
  const currentPageIndex = currentPage - 1;
  const isSearchUnit = segments[2] === SEARCH_UNIT_ROUTE;
  const { finalFilterData } = useStore((state) => state.finalFilterData);
  const setProperty = useStore((state) => state.setProperty);
  const propertyTypeFromParams = searchParams.get("propertyType") || "all";
  const bedsAndBathsParams = searchParams.get("bedsAndBaths");
  const effectivebedsAndBathsParams = bedsAndBaths || bedsAndBathsParams;
  const effectivePropertyType = propertyType || propertyTypeFromParams;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // For a smooth scroll transition
    });
  };

  const onPageChange = useCallback(
    async (selectedItem: { selected: number }) => {
      try {
        const selectedPageIndex = selectedItem.selected;
        const selectedPageNumber = selectedPageIndex + 1;
        setCurrentPage(selectedPageNumber);
        scrollToTop();
        if (isSearchUnit) {
          // Re-create obj here to ensure it has the latest data

          let obj = { ...Object.fromEntries(finalFilterData) };
          if (Object.keys(obj).length > ZERO) {
            obj.page = selectedPageNumber; // Update page property
            // obj.propertyType = effectivePropertyType;
            obj.price = "";
            obj.communityId = communityId || null;
            const res = await fetchUnits(
              "", // type
              "", // price
              "", // bedAndbath
              selectedPageNumber,
              perPage,
              communityId || null,
              obj
            );
            setSearchFilterList(res.data.data, {
              effectivePropertyType,
              effectivebedsAndBathsParams,
              price,
            });
          } else {
            const res = await fetchUnits(
              effectivePropertyType,
              price,
              effectivebedsAndBathsParams,
              selectedPageNumber,
              perPage,
              communityId || null,
              obj
            );
            setSearchFilterList(res.data.data, {
              effectivePropertyType,
              effectivebedsAndBathsParams,
              price,
            });
          }
        } else {
          let obj = { ...Object.fromEntries(finalFilterData) };
          const communityId = "";
          if (Object.keys(obj).length > ZERO) {
            obj.page = selectedPageNumber;
            const res = await fetchUnits(
              effectivePropertyType,
              price,
              effectivebedsAndBathsParams,
              selectedPageNumber,
              perPage,
              communityId,
              obj
            );
            setSearchFilterList(res.data.data, {
              effectivePropertyType,
              effectivebedsAndBathsParams,
              price,
            });
          } else {
            const res = await viewPropertyUnits(
              slug,
              selectedPageNumber,
              perPage
            );
            const d = res.data.data;
            setSessionData(d?.section_category_details || []);
            setPropertyView(d?.section_category_details || {});
          }
        }
      } catch (error: any) {
        console.log(error);
        // toast.error(error.message || "Failed to fetch data");
      }
      return () => {
        setSearchFilterList([], {}, {});
        setPropertyView({});
        setProperty([]);
        setSessionData([]);
        setCurrentPage(1);
      };
    },
    [slug, perPage, finalFilterData, isSearchUnit] // Make sure dependencies are set correctly
  );

  // Add to wishlist handler
  // const addToWishlist = (id: number) => {
  //   addtoWishlist(id)
  //     .then((res) => {
  //       setWishlistStatus(id, res.data.data.is_wishlist); // Update wishlist status for the specific item
  //       toast.success(res.data.message);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       // toast.error(error.message);
  //     });
  // };

  const addToWishlist = useCallback(
    (id: number) => {
      addtoWishlist(id)
        .then((res) => {
          setWishlistStatus(id, res.data.data.is_wishlist); // Update wishlist status for the specific item
          toast.success(res.data.message);
        })
        .catch((error) => {
          console.log(error);
          // toast.error(error.message);
        });
    },
    [addtoWishlist, setWishlistStatus] // Add dependencies here
  );

  // Modal handling for login/register
  const onLogin = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const closeRegisterModal = () => {
    setIsCreateAccountModalOpen(false);
  };

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isLoginModalOpen &&
        loginModalRef.current &&
        !loginModalRef.current.contains(event.target as Node)
      ) {
        closeLoginModal();
      }
      if (
        isCreateAccountModalOpen &&
        registerModalRef.current &&
        !registerModalRef.current.contains(event.target as Node)
      ) {
        closeRegisterModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isLoginModalOpen, isCreateAccountModalOpen]);

  // const effectiveCardItem =
  //   filterCarditem?.length > ZERO ? filterCarditem : carditem;
  // const effectiveCardItem = useMemo(
  //   () => (filterCarditem?.length > ZERO ? filterCarditem : carditem),
  //   [filterCarditem, carditem]
  // );

  return (
    <>
      <section className="xl:w-[780px] w-full flex flex-col xl:px-3 md:order-1 order-2">
        <div className="pb-8 lg:gap-20 lg:grid-cols-12">
          <div className="lg:mt-0 lg:col-span-9 flex-col lg:flex lg:justify-center text-center lg:mx-0 mx-auto ">
            {carditem?.length > ZERO ? (
              carditem?.map((item: any, index: number) => (
                <>
                  {/* desktop-view */}
                  <div
                    className="card md:flex-row flex-col lg:mt-2 mt-4 gap-3 rounded-xl md:flex hidden"
                    key={index}
                  >
                    <Swiper
                      modules={[Pagination, EffectCards]}
                      autoplay={{
                        delay: 3000, // 3 seconds delay between slides
                        disableOnInteraction: false, // Carousel keeps playing even after interaction
                      }} // Removed Navigation module
                      pagination={{ clickable: true }}
                      effect={"cards"}
                      loop
                      className="md:min-w-[324px] md:max-w-[324px] w-full md:min-h-[408px] md:max-h-[408px] min-h-[300px] max-h-[300px]"
                    >
                      {item.file?.map((img: any, idx: number) => (
                        <SwiperSlide key={idx}>
                          <Image
                            src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${img.img_md_url}`}
                            alt=""
                            className="w-full h-full object-cover rounded"
                            width={324}
                            height={408}
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>

                    <div className="xl:w-[421px] lg:h-[407px] w-full h-full flex flex-col justify-center lg:pl-10 py-4 sm:p-4 px-4">
                      <div className="flex justify-between items-center">
                        <span className="text-start text-md font-medium text-green-600 uppercase">
                          {item?.rate}
                        </span>
                        <a
                          className="justify-end cursor-pointer "
                          onClick={
                            localStorage.getItem("token")
                              ? () => addToWishlist(item?.id)
                              : onLogin
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            fill={item?.is_wishlist ? "red" : "white"}
                            stroke={item?.is_wishlist ? "red" : "black"}
                          >
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                          </svg>
                        </a>
                      </div>

                      <h3 className="text-2xl font-medium text-black md:min-w-80 md:max-w-80 overflow-hidden min-h-8 max-h-8 text-start">
                        {item.name}
                      </h3>

                      <h4 className="text-md font-normal text-gray-500 text-start sm:hidden">
                        Unit Number: {item.unit_no}
                      </h4>

                      <div className="gap-4 mt-6 md:flex hidden">
                        {item.unit_specifications
                          .slice(0, 2)
                          .map((specifi: any) => (
                            <div
                              className="flex flex-col items-start rounded"
                              key={specifi.id}
                            >
                              <div className="lg:w-[80px] w-full h-[38px] flex items-center justify-start  bg-[#edecea] rounded px-2">
                                <Image
                                  alt=""
                                  src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${specifi.icon}`}
                                  width={34}
                                  height={31}
                                  className="z-10 md:w-[20px] w-[20px] mr-3 min-h-[20px] max-h-[20px]"
                                />
                                <span className=" text-neutral-700 text-sm font-normal">
                                  {specifi.value}
                                </span>
                              </div>
                              <div className="text-stone-500 flex justify-start items-center text-xs font-normal capitalize">
                                {specifi.name}
                              </div>
                            </div>
                          ))}
                        <div className="flex flex-col items-start rounded">
                          <div className="lg:w-[90px] w-full h-[38px] flex items-center justify-start bg-[#edecea] rounded px-2">
                            <svg
                              width={19}
                              height={19}
                              viewBox="0 0 19 19"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M18.1381 0H5.18359V4.31818H0V19H12.9545V14.6818H18.1381V0Z"
                                fill="#484545"
                              />
                            </svg>
                            <span className=" text-neutral-700 text-sm pl-2 font-normal">
                              {item.area}
                            </span>
                          </div>
                          <div className="text-stone-500 text-start text-xs font-normal capitalize">
                            Area
                          </div>
                        </div>
                      </div>

                      <p
                        className="sm:hidden md:block lg:w-[299px] w-full min-h-[8.5rem] max-h-[8.5rem] overflow-hidden pt-8 pb-24 text-justify text-black text-[14px] font-normal leading-5"
                        dangerouslySetInnerHTML={{ __html: item.description }}
                      ></p>
                      <div className="flex flex-row lg:flex-row xl:gap-4 gap-5 mt-6">
                        <Link
                          href={"#"}
                          className="w-[250px] lg:h-10  md:w-[185px] text-zinc-100 text-xs md:text-sm font-medium px-2 text-center bg-green-800 focus:outline-none hover:bg-white-400 hover:shadow-2xl py-[0.5rem] rounded-[5px]"
                        >
                          Schedule Appointment
                        </Link>
                        <Link
                          href={`${item.redirection_url}/${item.slug}`}
                          className="w-[150px] lg:w-[106px] text-xs md:text-sm lg:h-10 h-full bg-white text-[14px] font-semibold border-black border lg:ml-4 text-black text-center md:px-4 px-2 hover:bg-sky-700 hover:border-none hover:text-white py-[0.5rem] rounded-[5px]"
                        >
                          View More
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Mobile View */}

                  <div
                    className="card md:flex-row flex-col lg:mt-2 mt-4 gap-3 rounded-xl sm:flex hidden "
                    key={index}
                  >
                    <div className="">
                      <a
                        className="flex relative justify-end cursor-pointer top-8 right-3"
                        onClick={
                          localStorage.getItem("token")
                            ? () => addToWishlist(item?.id)
                            : onLogin
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                          fill={item?.is_wishlist ? "red" : "white"}
                          stroke={item?.is_wishlist ? "red" : "black"}
                        >
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                      </a>
                      <Swiper
                        modules={[Pagination, EffectFlip]}
                        autoplay={{
                          delay: 3000, // 3 seconds delay between slides
                          disableOnInteraction: false, // Carousel keeps playing even after interaction
                        }}
                        effect={"flip"}
                        loop
                        pagination={{ clickable: true }}
                        className="md:min-w-[324px] md:max-w-[324px] w-full md:min-h-[408px] md:max-h-[408px] min-h-[300px] max-h-[300px]"
                      >
                        {item.file?.map((img: any, idx: number) => (
                          <SwiperSlide key={idx}>
                            <Image
                              src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${img.img_md_url}`}
                              alt=""
                              className="md:min-w-[324px] md:max-w-[324px] w-full md:min-h-[408px] md:max-h-[408px] min-h-[300px] max-h-[300px] bg-cover object-cover overflow-hidden rounded-t-xl"
                              width={324}
                              height={408}
                            />

                            <div className="absolute top-3 right-3 justify-end cursor-pointer">
                              <a
                                className="justify-end cursor-pointer "
                                onClick={
                                  localStorage.getItem("token")
                                    ? () => addToWishlist(item?.id)
                                    : onLogin
                                }
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  width="24"
                                  height="24"
                                  fill={item?.is_wishlist ? "red" : "white"}
                                  stroke={item?.is_wishlist ? "red" : "black"}
                                >
                                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                </svg>
                              </a>
                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                    <div className="lg:w-[421px] lg:h-[407px] w-full h-full flex flex-col justify-center lg:pl-12  sm:p-2 sm:py-4">
                      <div className="flex justify-between items-center">
                        <div className="text-start sm:block hidden flex-col">
                          {/* mob-view */}
                          <h3 className="sm:block text-xl font-medium text-black md:min-w-80 md:max-w-80 overflow-hidden text-start">
                            {item.name}
                          </h3>
                          {/* mob-view */}
                        </div>
                        <a
                          className="justify-end cursor-pointer sm:hidden md:block"
                          onClick={
                            localStorage.getItem("token")
                              ? () => addToWishlist(item?.id)
                              : onLogin
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            fill={item?.is_wishlist ? "red" : "white"}
                            stroke={item?.is_wishlist ? "red" : "black"}
                          >
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                          </svg>
                        </a>
                        {/* mob-view */}
                        <h4 className="text-sm font-normal text-gray-500 text-end">
                          Unit Number: {item.unit_no}
                        </h4>
                        {/* mob-view */}
                      </div>
                      <span className="text-start text-md font-medium text-green-600 uppercase">
                        {item?.rate}
                      </span>
                      <h3 className="md:block hidden text-2xl font-medium text-black md:min-w-80 md:max-w-80 overflow-hidden min-h-8 max-h-8 text-start">
                        {item.name}
                      </h3>

                      <h4 className="text-md font-normal text-gray-500 text-start sm:hidden">
                        Unit Number: {item.unit_no}
                      </h4>

                      <div className="gap-4 mt-6 md:flex hidden">
                        {item.unit_specifications
                          .slice(0, 2)
                          .map((specifi: any) => (
                            <div
                              className="flex flex-col items-start rounded"
                              key={specifi.id}
                            >
                              <div className="lg:w-[80px] w-full h-[38px] flex items-center justify-start  bg-[#edecea] rounded px-2">
                                <Image
                                  alt=""
                                  src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${specifi.icon}`}
                                  width={34}
                                  height={31}
                                  className="z-10 md:w-[20px] w-[20px] mr-3 min-h-[20px] max-h-[20px]"
                                />
                                <span className=" text-neutral-700 text-sm font-normal">
                                  {specifi.value}
                                </span>
                              </div>
                              <div className="text-stone-500 flex justify-start items-center text-xs font-normal capitalize">
                                {specifi.name}
                              </div>
                            </div>
                          ))}
                        <div className="flex flex-col items-start rounded">
                          <div className="lg:w-[90px] w-full h-[38px] flex items-center justify-start bg-[#edecea] rounded px-2">
                            <svg
                              width={19}
                              height={19}
                              viewBox="0 0 19 19"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M18.1381 0H5.18359V4.31818H0V19H12.9545V14.6818H18.1381V0Z"
                                fill="#484545"
                              />
                            </svg>
                            <span className=" text-neutral-700 text-sm pl-2 font-normal">
                              {item.area}
                            </span>
                          </div>
                          <div className="text-stone-500 text-start text-xs font-normal capitalize">
                            Area
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <div className="flex flex-col text-start mt-2">
                          <span
                            className="text-[#9c9c9c] text-xs font-normal font-['DM Sans']"
                            dangerouslySetInnerHTML={{ __html: item.location }}
                          ></span>
                        </div>
                        <div className="justify-end gap-1  sm:flex hidden">
                          {item.unit_specifications
                            .slice(0, 2)
                            .map((specifi: any) => (
                              <div
                                className="flex flex-col items-start rounded"
                                key={specifi.id}
                              >
                                <div className="lg:w-[80px] w-full h-[32px] flex items-center justify-start  bg-[#edecea] rounded px-1">
                                  <Image
                                    alt=""
                                    src={`${process.env.NEXT_PUBLIC_STORAGE_URL}${specifi.icon}`}
                                    width={34}
                                    height={31}
                                    className="z-10 md:w-[20px] w-[20px] mr-3 min-h-[20px] max-h-[20px]"
                                  />
                                  <span className=" text-neutral-700 text-sm font-normal">
                                    {specifi.value}
                                  </span>
                                </div>
                                <div className="text-stone-500 flex justify-start items-center text-xs font-normal capitalize">
                                  {specifi.name}
                                </div>
                              </div>
                            ))}
                          <div className="flex flex-col items-start rounded">
                            <div className="lg:w-[90px] w-full h-[32px] flex items-center justify-start bg-[#edecea] rounded px-1">
                              <svg
                                width={19}
                                height={19}
                                viewBox="0 0 19 19"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M18.1381 0H5.18359V4.31818H0V19H12.9545V14.6818H18.1381V0Z"
                                  fill="#484545"
                                />
                              </svg>
                              <span className=" text-neutral-700 text-sm pl-2 font-normal">
                                {item.area}
                              </span>
                            </div>
                            <div className="text-stone-500 text-start text-xs font-normal capitalize">
                              Area
                            </div>
                          </div>
                        </div>
                      </div>

                      <p
                        className="sm:hidden md:block lg:w-[299px] w-full min-h-[8.5rem] max-h-[8.5rem] overflow-hidden pt-8 pb-24 text-justify text-black text-[14px] font-normal leading-5"
                        dangerouslySetInnerHTML={{ __html: item.description }}
                      ></p>
                      <div className="flex flex-row lg:flex-row xl:gap-4 gap-5 mt-6">
                        <Link
                          href={`${item.redirection_url}/${item.slug}`}
                          className="w-[150px] lg:w-[106px] text-xs md:text-sm lg:h-10 h-full bg-white text-[14px] font-semibold border-black border lg:ml-4 text-black text-center md:px-4 px-2 hover:bg-sky-700 hover:border-none hover:text-white py-[0.5rem] rounded-[5px]"
                        >
                          View More
                        </Link>
                        <Link
                          href={"#"}
                          className="w-[250px] lg:h-10  md:w-[185px] text-zinc-100 text-xs md:text-sm font-medium px-2 text-center bg-green-800 focus:outline-none hover:bg-white-400 hover:shadow-2xl py-[0.5rem] rounded-[5px]"
                        >
                          Schedule Appointment
                        </Link>
                      </div>
                    </div>
                  </div>
                </>
              ))
            ) : (
              <h1>No Units Found</h1>
            )}

            {/* React Paginate Component */}
            {carditem?.length > ZERO && (
              <ReactPaginate
                previousLabel={"Prev"}
                nextLabel={"Next"}
                pageCount={totalPage}
                onPageChange={onPageChange}
                forcePage={currentPageIndex} // Ensures it displays the current page
                // pageRangeDisplayed={2} // Number of page numbers to display
                // marginPagesDisplayed={3} // Number of pages to display at the start and end
                containerClassName="flex justify-center items-center mt-6 "
                previousClassName="md:px-3 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                nextClassName="md:px-3 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                pageClassName="md:px-3 px-1 py-1 mx-1 border border-gray-300 text-gray-800 rounded hover:bg-gray-200"
                activeClassName="bg-green-600 text-white"
                disabledClassName="opacity-50 cursor-not-allowed"
                pageLinkClassName="block"
                previousLinkClassName="block"
                nextLinkClassName="block"
              />
            )}
          </div>
        </div>
      </section>

      {/* Modals */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 bg-[#111111d6] bg-opacity-50 flex justify-center items-center z-20">
          <div ref={loginModalRef}>
            <Login
              setIsCreateAccountModalOpen={setIsCreateAccountModalOpen}
              setIsLoginModalOpen={setIsLoginModalOpen}
            />
          </div>
        </div>
      )}
      {isCreateAccountModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
          <div ref={registerModalRef}>
            <Registration
              setIsCreateAccountModalOpen={setIsCreateAccountModalOpen}
              setIsLoginModalOpen={setIsLoginModalOpen}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default PropertyViewCard;
