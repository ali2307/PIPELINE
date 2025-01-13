"use client";
import React, { useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import { fetchUnits } from "@/app/services/api";
import { toast } from "react-toastify";
import Loader from "../components/loader/page";
import { useStore } from "../../store/index";
import { ZERO } from "@/app/utils/constants";
const PropertyViewCard = dynamic(
  () => import("../components/propertyViewCard/page")
);
const PropertyFilter = dynamic(
  () => import("../components/propertyFilter/page")
);

const Footer = dynamic(() => import("../components/footer/page"));
const SearchBanner = dynamic(() => import("../components/searchBanner/page"));

const SearchUnit: React.FC = (params: any) => {
  const hideSpinner = useStore((state) => state.hideSpinner);
  const showSpinner = useStore((state) => state.showSpinner);
  const globalLoader = useStore((state) => state.globalLoader);
  const setWishlistStatus = useStore((state) => state.setWishlistStatus);
  const { isWishlist, currentPage, totalPage, perPage } = useStore(
    (state) => state.propertyViewListing
  );
  const { filterCarditem } = useStore((state) => state.searchFilter);

  const setSearchFilterList = useStore((state) => state.setSearchFilterList);
  const setPropertyView = useStore((state) => state.setPropertyView);
  const setCurrentPage = useStore((state) => state.setCurrentPage);

  const propertyType = params.searchParams.propertyType || "";
  const bedsAndBaths = params.searchParams.bedsAndBaths || "";
  const price = params.searchParams.price || "";
  const communityId = params.searchParams.communityId || "";
  const selectedPageNumber = "";
  const finalFilterData = "";
  // const [carditem, setCardItem] = useState([]);
  useEffect(() => {
    fetchUnits(
      propertyType,
      price,
      bedsAndBaths,
      selectedPageNumber,
      perPage,
      communityId,
      finalFilterData
    )
      .then((res) => {
        setSearchFilterList(res.data.data, {
          propertyType,
          bedsAndBaths,
          price,
        });
      })
      .catch((err) => {
        console.log(err);
        // toast.error(err.response.data.message || "Failed to fetch data");
      });

    return () => {
      setWishlistStatus(false);
      setCurrentPage(1);
    };
  }, [isWishlist]);

  return (
    <>
      {globalLoader ? (
        <Loader />
      ) : (
        <>
          <SearchBanner />
          <div className="container md:w-[1066px] w-full mx-auto flex-wrap py-4">
            <div className="flex lg:flex-row flex-col">
              <PropertyFilter
                propertyType={propertyType}
                bedsAndBaths={bedsAndBaths}
              />
              {filterCarditem?.length > ZERO ? (
                <>
                  <Suspense fallback={<Loader />}>
                    <PropertyViewCard
                      carditem={filterCarditem}
                      price={price}
                      communityId={communityId}
                    />
                  </Suspense>
                </>
              ) : (
                <>
                  <div className="container w-full mx-auto flex flex-wrap py-12">
                    <PropertyViewCard
                      carditem={filterCarditem}
                      price={price}
                      communityId={communityId}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};
export default SearchUnit;
