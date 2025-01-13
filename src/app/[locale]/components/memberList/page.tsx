"use client";
import { FOUR, ZERO } from "@/app/utils/constants";
import { useFieldArray } from "react-hook-form";
import { toast } from "react-toastify";

interface MemberListProps {
  control: any;
  register: any;
  setValue?: any;
  getValues?: any;
  errors?: any;
  viewData: any;
  name: string;
}

const MemberList = ({
  control,
  register,
  setValue,
  getValues,
  viewData,
  errors,
  name,
}: MemberListProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: name,
  });

  if (fields.length === ZERO) {
    append({ member_name: "", mobile: "", relationship: "" });
  }

  const handleAdd = () => {
    if (fields.length < FOUR) {
      append({ member_name: "", mobile: "", relationship: "" });
    } else {
      toast.error("You can only add up to 4 items.");
    }
  };

  const handleRemove = (index: number) => {
    if (index) {
      remove(index);
    } else {
      toast.error("Atleast one member is required.");
    }
  };

  return (
    <>
      <div className="col-span-1"></div>
      <div className="col-span-1"></div>
      <div className="col-span-4 flex items-center justify-between">
        <h5 className="text-sm font-bold mb-1 text-[#116599] uppercase underline underline-offset-8">
          Member Details
        </h5>
        <button
          type="button"
          onClick={handleAdd}
          className="w-[47px] h-[28px] ml-2 text-sm bg-[#0670B1] text-white rounded"
        >
          Add
        </button>
      </div>

      <div className="col-span-3">
        {fields.map((item, index) => (
          <div
            className="flex flex-col md:flex-row md:items-center  items-start lg:w-[780px] w-full"
            key={item.id}
          >
            {fields.length > 1 ? (
              <div
                onClick={() => handleRemove(index)}
                className="w-[40px] h-[36px]  left-0 top-0 flex rounded-md mt-8 justify-center md:items-center items-center  px-[0.6rem] md:mr-4 bg-[#A51328] cursor-pointer"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 14 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M13.0606 3.88652H10.0723V3.13301C10.0717 2.56024 9.84383 2.01113 9.43881 1.60612C9.0338 1.20112 8.48468 0.973308 7.91191 0.972656H6.08625C5.51347 0.973292 4.96434 1.2011 4.55931 1.6061C4.15429 2.01111 3.92645 2.56023 3.92578 3.13301V3.88652H0.9375C0.75102 3.88652 0.572177 3.9606 0.440316 4.09246C0.308454 4.22433 0.234375 4.40317 0.234375 4.58965C0.234375 4.77613 0.308454 4.95497 0.440316 5.08683C0.572177 5.21869 0.75102 5.29277 0.9375 5.29277H1.31484V15.1588C1.3155 15.6542 1.51257 16.1291 1.86285 16.4793C2.21313 16.8296 2.68803 17.0267 3.1834 17.0273H10.8147C11.3101 17.0267 11.785 16.8296 12.1353 16.4794C12.4855 16.1291 12.6826 15.6542 12.6832 15.1588V5.29277H13.0605C13.247 5.29277 13.4258 5.21869 13.5577 5.08683C13.6895 4.95497 13.7636 4.77613 13.7636 4.58965C13.7636 4.40317 13.6895 4.22433 13.5577 4.09246C13.4258 3.9606 13.247 3.88652 13.0605 3.88652H13.0606ZM5.33209 3.13301C5.33221 2.93306 5.4117 2.74133 5.55308 2.59994C5.69446 2.45854 5.88618 2.37905 6.08613 2.37891H7.91203C8.11197 2.37908 8.30367 2.45859 8.44503 2.59997C8.5864 2.74136 8.66588 2.93307 8.66602 3.13301V3.88652H5.33203V3.13301H5.33209ZM11.277 15.1588C11.2753 15.2809 11.2261 15.3975 11.1397 15.4839C11.0534 15.5702 10.9367 15.6194 10.8146 15.6211H3.18352C3.0614 15.6195 2.94475 15.5702 2.85839 15.4839C2.77202 15.3975 2.72276 15.2809 2.72109 15.1588V5.29277H11.277V15.1588ZM4.72213 13.517V7.61074C4.72213 7.42426 4.79621 7.24542 4.92807 7.11356C5.05993 6.9817 5.23877 6.90762 5.42525 6.90762C5.61173 6.90762 5.79058 6.9817 5.92244 7.11356C6.0543 7.24542 6.12838 7.42426 6.12838 7.61074V13.517C6.12838 13.7035 6.0543 13.8823 5.92244 14.0142C5.79058 14.146 5.61173 14.2201 5.42525 14.2201C5.23877 14.2201 5.05993 14.146 4.92807 14.0142C4.79621 13.8823 4.72213 13.7035 4.72213 13.517ZM7.86984 13.517V7.61074C7.86984 7.42426 7.94392 7.24542 8.07578 7.11356C8.20765 6.9817 8.38649 6.90762 8.57297 6.90762C8.75945 6.90762 8.93829 6.9817 9.07015 7.11356C9.20201 7.24542 9.27609 7.42426 9.27609 7.61074V13.517C9.27609 13.7035 9.20201 13.8823 9.07015 14.0142C8.93829 14.146 8.75945 14.2201 8.57297 14.2201C8.38649 14.2201 8.20765 14.146 8.07578 14.0142C7.94392 13.8823 7.86984 13.7035 7.86984 13.517Z"
                    fill="white"
                  />
                </svg>
              </div>
            ) : null}

            <div className="h-16 flex flex-wrap items-center py-4">
              <label
                htmlFor={`user_members.${index}.member_name`}
                className=" block mb-1 text-zinc-500 text-xs text-start font-normal font-['DM Sans'] leading-3 min-w-[170px]"
              >
                Name
              </label>
              <input
                id={`user_members.${index}.member_name`}
                name={`user_members.${index}.member_name`}
                className="block mb-1 text-zinc-500 text-xs p-3 text-start font-normal font-['DM Sans'] leading-3 md:w-40 w-full h-[30px] focus:outline-none rounded-[5px] border border-[#7d7d87]"
                placeholder=""
                {...register(`user_members.${index}.member_name`)}
              />
              {errors?.user_members &&
                errors?.user_members[index]?.member_name && (
                  <p className="text-red-500 text-xs">
                    {errors?.user_members[index]?.member_name.message}
                  </p>
                )}
            </div>

            <div className="h-16 flex flex-wrap items-center  py-4">
              <label
                htmlFor={`user_members.${index}.mobile`}
                className="block mb-1 text-zinc-500 text-xs text-start font-normal font-['DM Sans'] leading-3 min-w-[170px]"
              >
                Mobile
              </label>
              <input
                id={`user_members.${index}.mobile`}
                name={`user_members.${index}.mobile`}
                className="block p-1  text-sm text-black resize-none0  md:w-40 w-full h-[30px] rounded-[5px] focus:outline-none border border-[#7d7d87]"
                placeholder=""
                {...register(`user_members.${index}.mobile`)}
              />

              {errors?.user_members && errors?.user_members[index]?.mobile && (
                <p className="mt-1 text-red-500 text-xs">
                  {errors?.user_members[index]?.mobile.message}
                </p>
              )}
            </div>

            <div className="h-16 flex flex-wrap items-center  py-4">
              <label
                htmlFor={`user_members.${index}.relationship`}
                className="block mb-1 text-zinc-500 text-xs text-start font-normal font-['DM Sans'] leading-3 min-w-[170px]"
              >
                Relationship
              </label>
              <input
                id={`user_members.${index}.relationship`}
                name={`user_members.${index}.relationship`}
                className="block p-1 text-sm text-black resize-none   md:w-40 w-full h-[30px] focus:outline-none rounded-[5px] border border-[#7d7d87]"
                placeholder=""
                {...register(`user_members.${index}.relationship`)}
              />
              {errors?.user_members &&
                errors?.user_members[index]?.relationship && (
                  <p className="mt-1 text-red-500 text-xs">
                    {errors?.user_members[index]?.relationship.message}
                  </p>
                )}
            </div>

            <div className="h-16 flex items-center md:ml-auto my-2">
              <label
                htmlFor={`user_members.${index}.is_emergency_contact`}
                className="flex items-center mb-2 mt-6 text-base font-medium text-black"
              >
                <span className="md:w-36 w-full mr-2 block mb-1  text-zinc-500 text-xs  p-3 text-start font-normal font-['DM Sans'] leading-3">
                  Emergency Contact
                </span>{" "}
                {/* Adjust margin-right for spacing */}
                <input
                  name={`user_members.${index}.is_emergency_contact`}
                  id={`user_members.${index}.is_emergency_contact`}
                  type="checkbox"
                  className="h-6 md:w-28 w-full text-blue-600 focus:ring-blue-500 focus:outline-none border-gray-300 rounded"
                  {...register(`user_members.${index}.is_emergency_contact`)}
                />
              </label>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MemberList;
