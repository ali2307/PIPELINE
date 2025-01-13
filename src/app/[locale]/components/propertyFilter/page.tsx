"use client";
import { FlilterListData, SearchFliterUnit } from "@/app/services/api";
import { useStore } from "@/app/store/index";
import { COMMERCIAL, RESIDENTIAL } from "@/app/utils/constants";
import { useParams, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Select from "react-select";
interface Props {
  propertyType?: "commercial" | "residential" | "all";
  bedsAndBaths?: any;
}
interface Filter {
  parent: any;
  id: any;
  name: string;
  label: string;
  options: any[];
}
const PropertyFilter: React.FC<Props> = ({ propertyType, bedsAndBaths }) => {
  const [selectedFilters, setSelectedFilters] = useState<any>({});
  const setSearchFilterList = useStore((state) => state.setSearchFilterList);
  const [FilterList, setFilterList] = useState<Filter[]>();
  const [formFields, setFormFields] = useState({ keyword: "", search: "" }); // New state for keyword and search
  const [property, setProperty] = useState<any>(propertyType);
  const params = useParams();
  const propertyID = params.id ? params.id[0] : "";
  const pathname = usePathname();
  const slugUrl = pathname.split("/")[2]; // Adjust index if necessary
  const setFinalFilterData = useStore((state) => state.setFinalFilterData);
  const [filtersVisible, setFiltersVisible] = useState(false);

  useEffect(() => {
    // setFilterList(filterData);
    FlilterListData(property, slugUrl)
      .then((res) => {
        const data = res.data.data;
        setFilterList(data);
      })
      .catch((err) => {
        console.log(err);
        // toast.error("Failed to fetch data");
      });
    return () => {
      setSelectedFilters([]);
      setFinalFilterData([]);
      setFilterList([]);
    };
  }, [property]);
  const propertyHandle = (prop: string) => {
    setProperty(prop);
  };

  // const filterHandleChange = (
  //   e: React.ChangeEvent<HTMLSelectElement>,
  //   filter: any
  // ) => {
  //   const { name, value } = e.target;

  //   // Update the selected filters state first
  //   setSelectedFilters((prev: any) => {
  //     const updatedFilters = {
  //       ...prev,
  //       [name]: {
  //         // Store the selected value with its IDs
  //         value: value,
  //         id: filter.id,
  //         parent: filter.parent,
  //       },
  //     };
  //     return updatedFilters; // Just return the updated filters
  //   });
  // };
  const filterHandleChange = (e: React.ChangeEvent<HTMLSelectElement>, filter: Filter) => {
    const { name, value } = e.target;

    setSelectedFilters((prevFilters: any) => ({
      ...prevFilters,
      [name]: { value, id: filter.id, parent: filter.parent },
    }));
  };
  // const filterHandleChangeMultiple = (
  //   e: React.ChangeEvent<HTMLSelectElement> | any,
  //   filter: Filter
  // ) => {
  //   const { name, value } = e.target || { name: filter.name, value: e };

  //   setSelectedFilters((prev: any) => ({
  //     ...prev,
  //     [name]: Array.isArray(value)
  //       ? value.map((v: any) => v.value) // Handle multi-select values
  //       : value,
  //   }));
  // };


  const HandleFilterSubmit = (e: any) => {
    e.preventDefault();
    const formdata = new FormData();

    // -----for paylod structure----
    const entries = Object.entries(selectedFilters);

    entries.forEach((filterValue, index) => {
      const [key, value] = filterValue;

      // If the value is an object, append its properties
      if (typeof value === "object" && value !== null) {
        Object.entries(value).forEach(([innerKey, innerValue]) => {
          // Use type assertion to specify the type of innerValue
          formdata.append(
            `search_key[${index}][${innerKey}]`,
            innerValue as string | Blob
          );
        });
      } else {
        // Use type assertion to specify the type of value
        formdata.append(`search_key[${index}][${key}]`, value as string | Blob);
      }
    });

    // -----for paylod structure end----

    if (propertyType !== undefined) {
      formdata.append("propertyType", property); // Assuming propertyType is defined
    }
    if (formFields.keyword) {
      formdata.append("keyword", formFields.keyword);
    }
    if (formFields.search) {
      formdata.append("search", formFields.search);
    }
    if (propertyID) {
      formdata.append("propertyID", propertyID);
    }

    // if (bedsAndBaths) {
    //   formdata.append("bedsAndBaths", bedsAndBaths);
    // }

    formdata.append("page", "");
    const fetchData = async () => {
      try {
        const res = await SearchFliterUnit(formdata);
        setSearchFilterList(res.data.data, {}, propertyID);
      } catch (err) {
        console.log(err);
        // toast.error("Failed to fetch data");
      }
    };

    fetchData();
    setFinalFilterData(formdata);
  };
  const toggleFilters = () => {
    setFiltersVisible((prevState) => !prevState);
  };

  const clearFilters = (e: any) => {
    e.preventDefault();
    // Reset selected filters
    setSelectedFilters({});
    // Reset form fields
    setFormFields({ keyword: "", search: "" });
    // Optionally reset any other form elements or values you might have
    const formdata = new FormData();
    if (propertyID) {
      formdata.append("propertyID", propertyID);
    }
    if (propertyType !== undefined) {
      formdata.append("propertyType", property); // Assuming propertyType is defined
    }

    const fetchData = async () => {
      try {
        const res = await SearchFliterUnit(formdata);
        setSearchFilterList(res.data.data, {}, propertyID);
      } catch (err) {
        console.log(err);
        // toast.error("Failed to fetch data");
      }
    };

    fetchData();
  };

  return (
    <>
      <aside className=" w-full flex flex-col items-center  mx-0 order-1 md:order-2">
        <div className="place-self-center lg:col-span-3 sm:flex-column sm:justify-center flex-row order-2 md:flex-col mx-auto">
          <div className="md:flex hidden">
            {slugUrl === "property-view" && propertyType !== "all" ? (
              <>
                {property === RESIDENTIAL && (
                  <button
                    value={RESIDENTIAL}
                    onClick={(e) =>
                      propertyHandle((e.target as HTMLButtonElement).value)
                    }
                    className={`lg:w-[129px] w-full h-10 md:text-xl text-sm font-normal mr-2 relative text-center justify-center items-center flex py-4 px-0 rounded 
              ${
                bedsAndBaths || property === RESIDENTIAL
                  ? "bg-sky-700 text-zinc-100"
                  : "bg-slate-100 text-black"
              } 
              focus:outline-none focus:border-gray-300 hover:bg-white-400 hover:shadow-2xl`}
                  >
                    Residential
                  </button>
                )}
                {property === COMMERCIAL && (
                  <button
                    value={COMMERCIAL}
                    onClick={(e) =>
                      propertyHandle((e.target as HTMLButtonElement).value)
                    }
                    className={`lg:w-[129px] w-full h-10 md:text-xl text-sm font-normal relative text-center justify-center items-center flex py-4 px-0 rounded 
${
  property === COMMERCIAL
    ? "bg-sky-700 text-zinc-100"
    : "bg-slate-100 text-black"
} 
focus:outline-none focus:border-gray-300 hover:bg-white-400 hover:shadow-2xl`}
                  >
                    Commercial
                  </button>
                )}
              </>
            ) : (
              <>
                <button
                  value={RESIDENTIAL}
                  onClick={(e) =>
                    propertyHandle((e.target as HTMLButtonElement).value)
                  }
                  className={`lg:w-[129px] w-full h-10 md:text-xl text-sm font-normal mr-2 relative text-center justify-center items-center flex py-4 px-0 rounded 
              ${
                bedsAndBaths || property === RESIDENTIAL
                  ? "bg-sky-700 text-zinc-100"
                  : "bg-slate-100 text-black"
              } 
              focus:outline-none focus:border-gray-300 hover:bg-white-400 hover:shadow-2xl`}
                >
                  Residential
                </button>
                <button
                  value={COMMERCIAL}
                  onClick={(e) =>
                    propertyHandle((e.target as HTMLButtonElement).value)
                  }
                  className={`lg:w-[129px] w-full h-10 md:text-xl text-sm font-normal relative text-center justify-center items-center flex py-4 px-0 rounded 
              ${
                property === COMMERCIAL
                  ? "bg-sky-700 text-zinc-100"
                  : "bg-slate-100 text-black"
              } 
              focus:outline-none focus:border-gray-300 hover:bg-white-400 hover:shadow-2xl`}
                >
                  Commercial
                </button>
              </>
            )}
          </div>
          <form action="" onSubmit={HandleFilterSubmit}>
            <div className="flex justify-center items-center gap-2">
              {!filtersVisible && (
                <div className="w-full h-[43px] relative rounded-[3px] focus:outline-none border-[#000] md:mt-4">
                  <input
                    id="voice-search"
                    type="search"
                    name="search"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-14 p-2.5 "
                    placeholder="Search Properties..."
                    value={formFields.search}
                    onChange={(e) =>
                      setFormFields({ ...formFields, search: e.target.value })
                    }
                  />
                  <button
                    type="submit"
                    className="absolute inset-y-0 end-0 flex items-center pe-3"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                        stroke="#418BCA"
                        stroke-width="2.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        opacity="0.4"
                        d="M21 20.9984L16.65 16.6484"
                        stroke="#5669FF"
                        stroke-width="2.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              )}
              {/* Filter Icon only visible on mobile */}
              <div className="block lg:hidden" onClick={toggleFilters}>
                <svg
                  width="25"
                  height="37"
                  viewBox="0 0 25 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.4285 9.71763H4.85711C4.12854 9.71763 3.64282 9.23192 3.64282 8.50335C3.64282 7.77478 4.12854 7.28906 4.85711 7.28906H19.4285C20.1571 7.28906 20.6428 7.77478 20.6428 8.50335C20.6428 9.23192 20.1571 9.71763 19.4285 9.71763Z"
                    fill="#727272"
                  />
                  <path
                    d="M15.7858 16.9989H8.50005C7.77148 16.9989 7.28577 16.5132 7.28577 15.7846C7.28577 15.056 7.77148 14.5703 8.50005 14.5703H15.7858C16.5143 14.5703 17.0001 15.056 17.0001 15.7846C17.0001 16.5132 16.5143 16.9989 15.7858 16.9989Z"
                    fill="#727272"
                  />
                  <path
                    d="M23.0714 2.42857H1.21429C0.485714 2.42857 0 1.94286 0 1.21429C0 0.485714 0.485714 0 1.21429 0H23.0714C23.8 0 24.2857 0.485714 24.2857 1.21429C24.2857 1.94286 23.8 2.42857 23.0714 2.42857Z"
                    fill="#727272"
                  />
                </svg>
              </div>
            </div>

            {/* Filter options visible on desktop */}

            <div className="hidden md:block">
              {FilterList?.map((filter, index) => (
                <div key={index} className="filter-dropdown">
                  {/* {filter.name === "unit_type" && (
                    <Select
                      isMulti
                      name={filter.name}
                      options={filter.options}
                      value={filter.options.filter((option) =>
                        (selectedFilters[filter.name] || []).includes(option.value)
                      )}
                      onChange={(selected: any) => filterHandleChangeMultiple(selected, filter)}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      placeholder={filter.label}
                    />
                  )} */}
                  <select
                    name={filter.name}
                    value={selectedFilters[filter.name]?.value || ""}
                    onChange={(e) => filterHandleChange(e, filter)} // Pass the id here
                    id={filter.name}
                    className="inline-flex pr-6 justify-between w-full px-4 py-2 text-sm font-normal h-10 text-gray-600 mt-4 bg-gray-100 shadow-sm hover:bg-gray-50 hover:text-gray-900 focus:outline-none rounded-md focus:border-gray-300"
                  >
                    <option value="null">{filter.label}</option>
                    {filter.options.map((option, idx) => (
                      <option key={idx} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
              <div className="flex mt-3 items-center justify-center gap-3  pb-">
                <button
                  type="button"
                  className="px-4 w-full text-sm rounded-md py-2 text-gray-600 bg-gray-200"
                  onClick={clearFilters}
                >
                  Clear
                </button>
                <button
                  className="px-4 w-full text-sm rounded-md py-2 text-white bg-sky-700 "
                  type="submit"
                >
                  Apply Filter
                </button>
              </div>
            </div>

            {/* Filters visible only when toggled on mobile */}

            {filtersVisible && (
              <>
                <div className="sm:block hidden mt-1">
                  <div className="w-72 mx-auto bg-white shadow-md rounded-t-xl">
                    <h2 className="mb-4 text-black text-sm font-optima  font-normal uppercase border-b-[#cccccc] border-b py-6 px-6 ">
                      FILTER
                    </h2>
                    {/* Property Type Section */}
                    <div className="mb-4 border py-3 mx-3 rounded-md">
                      <label className="block mb-2 text-[#4b4b4b] font-optima  text-sm font-normal  uppercase px-6 underline py-3 ">
                        PROPERTY TYPE
                      </label>

                      <div className="flex space-x-2 px-4">
                        <button
                          value={RESIDENTIAL}
                          onClick={(e) =>
                            propertyHandle(
                              (e.target as HTMLButtonElement).value
                            )
                          }
                          className={`lg:w-[129px] w-full border border-[#d9d9d9] hover:border-[#0670b1] h-10 md:text-xl text-sm font-normal mr-2 relative text-center justify-center items-center flex py-4 px-0 rounded-md
              ${
                bedsAndBaths || property === RESIDENTIAL
                  ? "bg-white text-[#0670b1]  hover:border-[#0670b1]"
                  : "bg-white border text-black border-[#d9d9d9]  "
              } 
              focus:outline-none focus:border-gray-300  hover:border-[#409bd3] font-optima `}
                        >
                          Residential
                        </button>
                        <button
                          value={COMMERCIAL}
                          onClick={(e) =>
                            propertyHandle(
                              (e.target as HTMLButtonElement).value
                            )
                          }
                          className={`lg:w-[129px] border hover:border-[#0670b1] w-full h-10 md:text-xl text-sm font-normal relative text-center justify-center items-center flex py-4 px-0 rounded-md 
              ${
                property === COMMERCIAL
                  ? "border border-[#0670b1] text-[#0670b1] "
                  : " text-black"
              } 
              focus:outline-none focus:border-gray-300 hover:border-[#409bd3] border-[#d9d9d9] font-optima `}
                        >
                          Commercial
                        </button>
                      </div>
                    </div>
                    {/* Bedrooms Section */}
                    <div className="mb-4 mx-3">
                      {FilterList?.map((filter, index) => (
                        <div key={index} className="filter-dropdown">
                          <select
                            name={filter.name}
                            value={selectedFilters[filter.name]?.value || ""}
                            onChange={(e) => filterHandleChange(e, filter)} // Pass the id here
                            id={filter.name}
                            className="border opacity-9 font-optima border-[#d9d9d9] inline-flex pr-6 justify-between w-full px-4 py-2 text-sm font-normal h-10 text-[#4b4b4b] mt-2 shadow-sm hover:bg-gray-50 hover:text-gray-900 focus:outline-none  rounded-md focus:border-gray-300"
                          >
                            <option value="null text-[#4b4b4b] ">
                              {filter.label}
                            </option>
                            {filter.options.map((option, idx) => (
                              <option key={idx} value={option.value}>
                                {option.label}
                                {/* Display the 'key' (label) here */}
                              </option>
                            ))}
                          </select>
                        </div>
                      ))}
                    </div>
                    <div className="flex mt-3 items-center justify-center gap-3">
                      <button
                        type="button"
                        className="px-4  w-full text-sm rounded-md py-3 text-sky-600 text-start font-optima "
                        onClick={clearFilters}
                      >
                        Clear
                      </button>
                      <button
                        className="md:w-[137px] h-[29px] text-[#f2f2f2] text-xs font-medium px-4 w-full rounded-md  bg-sky-700 font-optima"
                        type="submit"
                      >
                        Apply Filter
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </form>
        </div>
      </aside>
    </>
  );
};
export default PropertyFilter;
