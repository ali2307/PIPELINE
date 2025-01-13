"use client";
import React from "react";
import { addUserReview } from "@/app/services/api";
import { useForm, SubmitHandler } from "react-hook-form";
import { useStore } from "./../../../store/index";
import { toast } from "react-toastify";

type ReviewFormInputs = {
  message: string;
};

const ReviewForm: React.FC = () => {
  const { unitId } = useStore((state) => state.unitReview);
  const setReviewStatus = useStore((state) => state.setReviewStatus);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ReviewFormInputs>();

  const onSubmit: SubmitHandler<ReviewFormInputs> = (data) => {
    const _data = new FormData();
    _data.append("unit_id", unitId);
    _data.append("description", data["message"]);
    addUserReview(_data)
      .then((res) => {
        setReviewStatus(res.data.status);
        if (res.data.status === true) {
          toast.success("Review added successfully!");
          reset();
        } else {
          toast.error(res.data.message || "An error occurred");
          reset();
        }
      })
      .catch((error) => {
        console.log(error);
        // toast.error("Unauthenticated Please Login!");
        reset();
      });
  };

  return (
    <>
      <section className="container mx-auto p-4">
        <div className="xl:w-[1102px] lg:w-[930px] w-full mx-auto px-6">
          <h2 className="text-black flex items-start text-sm text-start font-medium mb-4">
            Write a Review
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <textarea
              id="message"
              rows={4}
              {...register("message", { required: true })}
              className="md:w-[610px] h-[95px] block p-2.5 w-full text-sm text-gray-900 focus:outline-none rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Write your review here..."
            />
            {errors.message && (
              <p className="text-red-500 text-xs mt-1">
                This field is required
              </p>
            )}
            <button
              type="submit"
              className="lg:w-[100px] h-[40px] text-white bg-[#0670B1] hover:bg-black hover:text-white flex justify-start mt-4 hover:bg-gradient-to-br  focus:outline-none font-medium rounded-lg text-base px-6 py-2.5 text-start me-2 mb-2"
            >
              Submit
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default ReviewForm;
