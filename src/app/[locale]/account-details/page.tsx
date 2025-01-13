"use client"; // Ensure this line is relevant to your setup
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Image from "next/image";
import {
  changeProfilePhoto,
  fetchStates,
  GetDocumentType,
  updateUserProfile,
  userProfile,
} from "@/app/services/api";
import { toast } from "react-toastify";
import { useStore } from "@/app/store";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
const ProfileInpuField = dynamic(() => import("../components/ProfileInpuField/page"));
const SingleSelect = dynamic(() => import("../components/singleSelection/page"));
const MemberList = dynamic(() => import("../components/memberList/page"));
const Button = dynamic(() => import("../components/button/page"));
const AccountLayout = dynamic(() => import("../accountLayout"));
const DocumentsSection = dynamic(() => import("../components/DocumentsSection/page"));

interface DocType {
  value: number;
  label: string;
}

interface Country {
  value: number;
  label: string;
}

interface State {
  value: number;
  label: string;
}

interface multipleitem {
  content: any;
  title: any;
  id: number;
}
interface MemberListItem {
  id: string;
  member_name: string;
  mobile: string;
  relationship: string;
  is_emergency_contact: boolean;
}

interface UserDocListItem {
  doc_file: string;
  doc_type: string;
  expiry_date: Date; // or string if you're using date as a string format
  issued_date: Date; // or string if you're using date as a string format
  doc_no: string;
  issued_by: string;
}

interface ImageItem {
  file: String;
  imageUrl: string;
  id: number;
}

type ErrorMessage = {
  message: string;
};

type errors = {
  [key: string]: ErrorMessage | undefined;
};

const AccountDetails = () => {
  const router = useRouter();
  const hideSpinner = useStore((state) => state.hideSpinner);
  const showSpinner = useStore((state) => state.showSpinner);
  const globalLoader = useStore((state) => state.globalLoader);
  const [userType, setUserType] = useState(true);
  const [countries, setCountries] = useState<Country[]>([]);
  const [docTypes, setDocTypes] = useState<DocType[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [viewData, setViewData] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
  const [profileImage, setProfileImage] = useState();
  const [currencyList, setCurrencyList] = useState([]);
  const [userDocCount, setUserDocCount] = useState(0);
  const setProfileFlag = useStore((state) => state.setProfileFlag);

  const [selectedImages, setSelectedImages] = useState<(File | ImageItem)[]>(
    []
  );

  const validationSchema = Yup.object().shape({
    first_name: Yup.string()
      .required("First Name is required")
      .max(50, "First Name cannot be longer than 50 characters"),
    middle_name: Yup.string().max(
      50,
      "Middle Name cannot be longer than 50 characters"
    ),
    second_name: Yup.string()
      .required("Last Name is required")
      .max(50, "Last Name cannot be longer than 50 characters"), // Max length for second_name
    type: Yup.string()
      .required("Type is required")
      .max(30, "Type cannot be longer than 30 characters"), // Max length for type
    id: Yup.string()
      .required("ID is required")
      .max(20, "ID cannot be longer than 20 characters"), // Max length for id
    dob: userType
      ? Yup.date()
        .required("Date of birth is required")
        .max(new Date(), "Date of birth must be a past date")
        .test("is-adult", "You must be 18 years or older", (value) => {
          if (!value) return false;

          const today = new Date();
          const birthDate = new Date(value);

          const age = today.getFullYear() - birthDate.getFullYear();
          const monthDifference = today.getMonth() - birthDate.getMonth();

          if (
            monthDifference < 0 ||
            (monthDifference === 0 && today.getDate() < birthDate.getDate())
          ) {
            return age >= 18;
          }

          return age >= 18;
        })
      : Yup.date()
        .required("Establishment date is required")
        .max(new Date(), "Establishment date must be a past date"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(
        /^\+?\d+$/,
        "Phone number must contain only numbers or start with a '+' sign"
      )
      .max(15, "Phone number cannot be longer than 15 digits"), // Max length for phone
    po_box_no: Yup.string()
      .required("Po Box Number is required")
      .matches(/^\d+$/, "Po Box Number must contain only numbers")
      .max(10, "Po Box Number cannot be longer than 10 digits"), // Max length for Po Box Number
    country_id: Yup.string().required("Country is required"),
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
    state_id: Yup.string().required("State is required"),
    company_address: Yup.string()
      .required("Company address is required")
      .max(150, "Company address cannot be longer than 150 characters"),
    designation: userType
      ? Yup.string()
        .required("Designation is required")
        .max(50, "Designation name cannot be longer than 50 characters")
      : Yup.string().notRequired(),
    city: Yup.string()
      .required("City is required")
      .max(50, "City cannot be longer than 50 characters")
      .matches(
        /^[A-Za-z\s-]+$/, // Correct regex to allow only letters and spaces
        "City must contain only letters and spaces"
      ),
    address: userType
      ? Yup.string()
        .required("Address is required")
        .max(150, "Address cannot be longer than 150 characters")
      : Yup.string().nullable(),
    company_name: Yup.string()
      .required("Company name is required")
      .matches(
        /^[A-Za-z\s.-]+$/,
        "Company name must contain only letters, spaces, hyphens, or periods"
      )
      .notOneOf([""], "Company name cannot be just spaces")
      .trim()
      .matches(/[A-Za-z]/, "Company name must contain at least one letter")
      .max(50, "Company name cannot be longer than 50 characters"),

    salary:
      userType === true
        ? Yup.string()
          .required("Salary is required")
          .matches(/^\d+$/, "Salary must contain only numbers")
        : Yup.string().notRequired(),
    currency:
      userType === true
        ? Yup.string().required("currency is required")
        : Yup.string().notRequired(),
    bank: Yup.string()
      .required("Bank name is required")
      .max(50, "Bank name cannot be longer than 50 characters"),
    tax_reg_no: Yup.string().nullable(),
    fax: Yup.string().nullable(),
    website:
      userType === true
        ? Yup.string().nullable()
        : Yup.string().nullable().url("Must be a valid URL"),
    arabic_name: Yup.string(),
    user_members: Yup.array()
      .of(
        Yup.object().shape({
          member_name: Yup.string()
            .required("Name is required")
            .max(50, "Member name cannot be longer than 50 characters"), // Max length for member_name
          mobile: Yup.string().required("Mobile is required"),
          relationship: Yup.string()
            .required("Relationship is required")
            .max(20, "Relationship name cannot be longer than 20 characters"),
        })
      )
      .required("User members are required")
      .min(1, "At least one member is required"),
    user_doc: Yup.array()
      .of(
        Yup.object().shape({
          doc_file: Yup.mixed()
            .required("Document file is required")
            .test("isValidFileOrString", "Attach valid document", (value) => {
              if (value === "") {
                return false;
              }
              return true;
            }),
          doc_type: Yup.string().required("Document type is required"),
          issued_date: Yup.date()
            .required("Issued date is required")
            .max(
              Yup.ref("expiry_date"),
              "Issued date cannot be later than expiry date"
            ),
          expiry_date: Yup.date()
            .required("Expiry date is required")
            .min(
              Yup.ref("issued_date"),
              "Expiry date must be later than issued date"
            ),
          doc_no: Yup.string().required("Document number is required"),
          issued_by: Yup.string()
            .required("Issued by is required")
            .max(20, "Issued by name cannot be longer than 20 characters"),
        })
      )
      .required("User documents are required")
      .min(1, "At least one document is required"),
  });

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    control,
    getValues,
    clearErrors,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleCountryChange = (id: Number) => {
    fetchStates(id)
      .then((res) => {
        setStates(res.data.data);
      })
      .catch((err) =>
        console.log(err)
        // toast.error(err.message || "Failed to fetch data")
      );
  };

  useEffect(() => {
    userProfile()
      .then((res) => {
        const basic_details = res.data.data.basic_details;
        const currency = res.data.data.currency;
        setCurrencyList(currency);
        setViewData(res.data.data);
        setCountries(res.data.data.country);

        if (basic_details.type === 0) {
          handleDocTypeChange(0);
          setUserType(true);
        } else {
          handleDocTypeChange(1);
          setUserType(false);
        }
        if (basic_details.country_id)
          handleCountryChange(basic_details.country_id);
        const pic = basic_details.user_image;
        setProfileImage(pic);
        setValue("first_name", basic_details.first_name);
        setValue("arabic_name", basic_details.arabic_name);
        setValue("middle_name", basic_details.middle_name);
        setValue("second_name", basic_details.second_name);
        setValue("email", basic_details.email);
        setValue("id", basic_details.ref_no);
        setValue("dob", basic_details.dob);
        setValue("phone", basic_details.phone);
        setValue("po_box_no", basic_details.po_box_no);
        setValue("country_id", basic_details.country_id);
        setValue("state_id", basic_details.state_id);
        setValue("company_address", basic_details.company_address);
        setValue("designation", basic_details.designation);
        setValue("city", basic_details.city);
        setValue("address", basic_details.address);
        setValue("company_name", basic_details.company_name);
        setValue("salary", basic_details.salary);
        setValue("bank", basic_details.bank);
        setValue("tax_reg_no", basic_details.tax_reg_no);
        setValue("fax", basic_details.fax);
        setValue("website", basic_details.website);
        setValue("type", basic_details.type);
        setValue("currency", basic_details.currency_id);

        let contentTest = res.data.data.user_members;

        const contentArray: MemberListItem[] = contentTest.map(
          (item: {
            id: number;
            name: string;
            mobile: string;
            relationship: string;
            is_emergency_contact: boolean;
          }) => ({
            member_name: item.name,
            mobile: item.mobile,
            relationship: item.relationship,
            is_emergency_contact: item.is_emergency_contact,
            id: item.id,
          })
        );
        setValue("user_members", contentArray);

        let user_doc = res.data.data.user_doc;
        setUserDocCount(res.data.data.user_doc?.length);

        const userDocArray: UserDocListItem[] = user_doc.map(
          (item: {
            document_type: string;
            issued_by: string;
            expiry_date: string;
            issued_date: string;
            doc_no: string;
            doc_file: string;
            id: number;
          }) => ({
            doc_file: item.doc_file,
            doc_type: item.document_type,
            expiry_date: item.expiry_date,
            issued_date: item.issued_date,
            doc_no: item.doc_no,
            issued_by: item.issued_by,
            id: item.id,
          })
        );

        setValue("user_doc", userDocArray);
      })
      .catch((err) =>
        console.log(err)
        // toast.error(err.message || "Failed to fetch data")
      );
  }, []);

  const onSubmit = (formData: any) => {
    const _data = new FormData();

    _data.append("first_name", formData["first_name"]);
    _data.append("middle_name", formData["middle_name"]);
    _data.append("second_name", formData["second_name"]);
    _data.append("email", formData["email"]);
    _data.append("id", formData["id"]);
    _data.append("dob", moment(formData["dob"]).format("DD-MM-YYYY"));
    _data.append("phone", formData["phone"]);
    _data.append("po_box_no", formData["po_box_no"]);
    _data.append("country_id", formData["country_id"]);
    _data.append("state_id", formData["state_id"]);
    _data.append("company_address", formData["company_address"]);
    _data.append("designation", formData["designation"]);
    _data.append("city", formData["city"]);
    _data.append("address", formData["address"]);
    _data.append("company_name", formData["company_name"]);
    _data.append("salary", formData["salary"]);
    _data.append("bank", formData["bank"]);
    _data.append("tax_reg_no", formData["tax_reg_no"]);
    _data.append("fax", formData["fax"]);
    _data.append("website", formData["website"]);
    _data.append("type", formData["type"]);
    _data.append("arabic_name", formData["arabic_name"]);
    _data.append("currency_id", formData["currency"]);

    formData.user_doc.forEach((item: any, index: number) => {
      if (item.doc_file && item.doc_file.length > 0) {
        Array.from(item.doc_file).forEach((file, fileIndex) => {
          if (file instanceof File) {
            _data.append(`user_documents[${index}][doc_file]`, file);
          }
        });
        if (typeof item.doc_file === "string")
          _data.append(`user_documents[${index}][doc_file]`, item.doc_file);
      }
      if (item.id) {
        _data.append(`user_documents[${index}][id]`, item.id);
      }
      _data.append(`user_documents[${index}][doc_no]`, item.doc_no);
      _data.append(`user_documents[${index}][doc_type]`, item.doc_type);
      _data.append(
        `user_documents[${index}][issued_date]`,
        moment(item.issued_date).format("DD-MM-YYYY")
      );
      _data.append(
        `user_documents[${index}][expiry_date]`,
        moment(item.expiry_date).format("DD-MM-YYYY")
      );
      _data.append(`user_documents[${index}][issued_by]`, item.issued_by);
    });

    formData.user_members.forEach((item: any, index: number) => {
      if (item.id) {
        _data.append(`user_members[${index}][id]`, item.id);
      }
      _data.append(`user_members[${index}][member_name]`, item.member_name);
      _data.append(`user_members[${index}][mobile]`, item.mobile);
      _data.append(`user_members[${index}][relationship]`, item.relationship);
      _data.append(
        `user_members[${index}][is_emergency_contact]`,
        item.is_emergency_contact
      );
    });

    showSpinner();

    updateUserProfile(_data)
      .then((res) => {
        toast.success(res.data.message || "Success");
        hideSpinner();
        router.push(`/account-details-view`);
      })
      .catch((error) => {
        // toast.error("Failed to update profile");
        hideSpinner();
        console.log(error);
      });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const maxFileSize = 2 * 1024 * 1024; // 2 MB
    const validFiles = files
      ? Array.from(files).filter((file) => file.size <= maxFileSize)
      : [];
    const invalidFiles = files
      ? Array.from(files).filter((file) => file.size > maxFileSize)
      : [];
    setSelectedImages(validFiles);
    document.getElementById("file_input")?.click();
  };

  const handleProfilePic = () => {
    if (!selectedFile) {
      toast.error("Please select a file first");
      return;
    }

    const formData = new FormData();

    formData.append("user_image", selectedFile);

    changeProfilePhoto(formData)
      .then((res) => {
        toast.success(res.data.message || "Success");
        setProfileFlag(res.status);

        hideSpinner();
      })
      .catch((error) => {
        // toast.error("Failed to update profile Pic");
        hideSpinner();
        console.log(error.message);
      });
  };

  const handleFileChange = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  const CustomInput = ({ value, onClick }: any) => (
    <>
      <label className="block mb-1 text-zinc-500 text-xs text-start font-normal font-['DM Sans'] leading-3">
        {userType === false ? "Date of Establishment" : "Date of Birth"}
      </label>
      <div className="md:w-[160px] flex items-center relative border border-gray-600 rounded p-1">
        <input
          type="text"
          value={value}
          onClick={onClick}
          readOnly
          className="md:w-[110px] w-full h-[21px] border-none focus:outline-none"
        />
        <svg
          width="16"
          height="16"
          viewBox="0 0 11 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_6321_3301)">
            <path
              d="M10.6436 3.00895C10.6436 3.0088 10.6436 3.00867 10.6436 3.00854C10.6436 3.00841 10.6436 3.00826 10.6436 3.00813V1.58482C10.6436 1.10346 10.252 0.711863 9.77063 0.711863H8.86399V0.517064C8.86399 0.231945 8.63202 0 8.34693 0C8.06181 0 7.82986 0.231945 7.82986 0.517064V0.711863H3.16919V0.517064C3.16919 0.231945 2.93722 0 2.65213 0C2.36703 0 2.13506 0.231945 2.13506 0.517064V0.711863H1.22842C0.747065 0.711863 0.355469 1.10348 0.355469 1.58482V10.127C0.355469 10.6084 0.747086 11 1.22842 11H9.77063C10.252 11 10.6436 10.6084 10.6436 10.127V3.72079C10.6436 3.72064 10.6436 3.72051 10.6436 3.72038C10.6436 3.72026 10.6436 3.72011 10.6436 3.71998V3.00895ZM8.15211 0.517043C8.15213 0.409643 8.2395 0.322266 8.34693 0.322266C8.45433 0.322266 8.54173 0.409643 8.54173 0.517064V1.58441C8.54173 1.58456 8.5417 1.58469 8.5417 1.58482C8.5417 1.58488 8.5417 1.58495 8.5417 1.58503C8.5416 1.69235 8.45426 1.77962 8.34693 1.77962C8.23955 1.77962 8.15219 1.69228 8.15213 1.58492C8.15213 1.58488 8.15213 1.58486 8.15213 1.58482C8.15213 1.58475 8.15211 1.58469 8.15211 1.5846V0.517043ZM2.45733 0.517064C2.45733 0.409643 2.54471 0.322266 2.65213 0.322266C2.75953 0.322266 2.84693 0.409643 2.84693 0.517064V1.58441C2.84693 1.58456 2.8469 1.58469 2.8469 1.58482C2.8469 1.58488 2.8469 1.58495 2.8469 1.58503C2.8468 1.69235 2.75946 1.77962 2.65213 1.77962C2.54471 1.77962 2.45733 1.69224 2.45733 1.58484V0.517064ZM10.3213 10.127C10.3213 10.4307 10.0743 10.6777 9.77063 10.6777H1.22842C0.924762 10.6777 0.677734 10.4307 0.677734 10.127V10.0919C0.828082 10.2144 1.01979 10.2881 1.22842 10.2881H9.77063C9.97927 10.2881 10.171 10.2144 10.3213 10.0919V10.127ZM10.3213 3.55925H2.61846C2.52947 3.55925 2.45733 3.6314 2.45733 3.72038C2.45733 3.80937 2.52947 3.88152 2.61846 3.88152H10.3213V9.41512C10.3213 9.71878 10.0743 9.96581 9.77063 9.96581H1.22842C0.924762 9.96581 0.677734 9.71876 0.677734 9.41512V3.88152H1.97393C2.06292 3.88152 2.13506 3.80937 2.13506 3.72038C2.13506 3.6314 2.06292 3.55925 1.97393 3.55925H0.677734V3.16965H10.3213V3.55925ZM10.3213 2.84739H0.677734V1.58482C0.677734 1.28116 0.924762 1.03413 1.22842 1.03413H2.13506V1.42371H2.11822C2.02923 1.42371 1.95709 1.49585 1.95709 1.58484C1.95709 1.67383 2.02923 1.74597 2.11822 1.74597H2.16091C2.2288 1.95239 2.42328 2.10188 2.65213 2.10188C2.88098 2.10188 3.07546 1.95237 3.14335 1.74597H3.18601C3.275 1.74597 3.34715 1.67383 3.34715 1.58484C3.34715 1.49585 3.275 1.42371 3.18601 1.42371H3.16919V1.03413H7.82986V1.42371H7.81302C7.72403 1.42371 7.65189 1.49585 7.65189 1.58484C7.65189 1.67383 7.72403 1.74597 7.81302 1.74597H7.85571C7.9236 1.95239 8.11807 2.10188 8.34693 2.10188C8.57578 2.10188 8.77026 1.95237 8.83815 1.74597H8.88081C8.9698 1.74597 9.04195 1.67383 9.04195 1.58484C9.04195 1.49585 8.9698 1.42371 8.88081 1.42371H8.86399V1.03413H9.77063C10.0743 1.03413 10.3213 1.28118 10.3213 1.58482V2.84739Z"
              fill="black"
            />

            <path
              d="M1.42188 5.49707V6.92078C1.42188 7.00976 1.49402 7.08191 1.58301 7.08191H3.00669C3.09568 7.08191 3.16782 7.00976 3.16782 6.92078V5.49707C3.16782 5.40808 3.09568 5.33594 3.00669 5.33594H1.58301C1.49402 5.33594 1.42188 5.40808 1.42188 5.49707ZM1.74414 5.6582H2.84556V6.75964H1.74414V5.6582Z"
              fill="black"
            />
            <path
              d="M3.71973 7.08191H5.14343C5.23242 7.08191 5.30456 7.00976 5.30456 6.92078V5.49707C5.30456 5.40808 5.23242 5.33594 5.14343 5.33594H3.71973C3.63074 5.33594 3.55859 5.40808 3.55859 5.49707V6.92078C3.55859 7.00976 3.63074 7.08191 3.71973 7.08191ZM3.88086 5.6582H4.9823V6.75964H3.88086V5.6582Z"
              fill="black"
            />
            <path
              d="M5.85645 7.08191H7.28015C7.36914 7.08191 7.44128 7.00976 7.44128 6.92078V5.49707C7.44128 5.40808 7.36914 5.33594 7.28015 5.33594H5.85645C5.76746 5.33594 5.69531 5.40808 5.69531 5.49707V6.92078C5.69531 7.00976 5.76746 7.08191 5.85645 7.08191ZM6.01758 5.6582H7.11902V6.75964H6.01758V5.6582Z"
              fill="black"
            />
            <path
              d="M7.98926 7.08191H9.41294C9.50193 7.08191 9.57407 7.00976 9.57407 6.92078V5.49707C9.57407 5.40808 9.50193 5.33594 9.41294 5.33594H7.98926C7.90027 5.33594 7.82812 5.40808 7.82812 5.49707V6.92078C7.82812 7.00976 7.90027 7.08191 7.98926 7.08191ZM8.15039 5.6582H9.25181V6.75964H8.15039V5.6582Z"
              fill="black"
            />
            <path
              d="M3.00669 7.47656H1.58301C1.49402 7.47656 1.42188 7.54871 1.42188 7.6377V9.0614C1.42188 9.15039 1.49402 9.22253 1.58301 9.22253H3.00669C3.09568 9.22253 3.16782 9.15039 3.16782 9.0614V7.6377C3.16782 7.54871 3.09568 7.47656 3.00669 7.47656ZM2.84556 8.90027H1.74414V7.79883H2.84556V8.90027Z"
              fill="black"
            />
            <path
              d="M3.71973 9.21863H5.14343C5.23242 9.21863 5.30456 9.14648 5.30456 9.05749V7.63379C5.30456 7.5448 5.23242 7.47266 5.14343 7.47266H3.71973C3.63074 7.47266 3.55859 7.5448 3.55859 7.63379V9.05749C3.55859 9.14648 3.63074 9.21863 3.71973 9.21863ZM3.88086 7.79492H4.9823V8.89636H3.88086V7.79492Z"
              fill="black"
            />
            <path
              d="M5.85645 9.22253H7.28015C7.36914 9.22253 7.44128 9.15039 7.44128 9.0614V7.6377C7.44128 7.54871 7.36914 7.47656 7.28015 7.47656H5.85645C5.76746 7.47656 5.69531 7.54871 5.69531 7.6377V9.0614C5.69531 9.15039 5.76746 9.22253 5.85645 9.22253ZM6.01758 7.79883H7.11902V8.90027H6.01758V7.79883Z"
              fill="black"
            />
            <path
              d="M7.98926 9.21863H9.41294C9.50193 9.21863 9.57407 9.14648 9.57407 9.05749V7.63379C9.57407 7.5448 9.50193 7.47266 9.41294 7.47266H7.98926C7.90027 7.47266 7.82812 7.5448 7.82812 7.63379V9.05749C7.82812 9.14648 7.90027 9.21863 7.98926 9.21863ZM8.15039 7.79492H9.25181V8.89636H8.15039V7.79492Z"
              fill="black"
            />
            <path
              d="M1.77734 4.79004C1.77734 4.87903 1.84947 4.95117 1.93848 4.95117H2.65036C2.73935 4.95117 2.81149 4.87903 2.81149 4.79004C2.81149 4.70105 2.73935 4.62891 2.65036 4.62891H1.93848C1.84949 4.62891 1.77734 4.70105 1.77734 4.79004Z"
              fill="black"
            />
            <path
              d="M4.0752 4.94727H4.78708C4.87607 4.94727 4.94821 4.87512 4.94821 4.78613C4.94821 4.69714 4.87607 4.625 4.78708 4.625H4.0752C3.98621 4.625 3.91406 4.69714 3.91406 4.78613C3.91406 4.87512 3.98621 4.94727 4.0752 4.94727Z"
              fill="black"
            />
            <path
              d="M6.21191 4.94727H6.9238C7.01279 4.94727 7.08493 4.87512 7.08493 4.78613C7.08493 4.69714 7.01279 4.625 6.9238 4.625H6.21191C6.12293 4.625 6.05078 4.69714 6.05078 4.78613C6.05078 4.87512 6.12293 4.94727 6.21191 4.94727Z"
              fill="black"
            />
            <path
              d="M8.34863 4.95117H9.06052C9.14951 4.95117 9.22165 4.87903 9.22165 4.79004C9.22165 4.70105 9.14951 4.62891 9.06052 4.62891H8.34863C8.25964 4.62891 8.1875 4.70105 8.1875 4.79004C8.1875 4.87903 8.25964 4.95117 8.34863 4.95117Z"
              fill="black"
            />
          </g>
          <defs>
            <clipPath id="clip0_6321_3301">
              <rect width="11" height="11" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </>
  );

  const handleDocTypeChange = async (type: number) => {
    // setValue(`user_doc.0.doc_type`, "");
    // setValue(`user_doc.1.doc_type`, "");
    // setValue(`user_doc.2.doc_type`, "");
    // setValue(`user_doc.3.doc_type`, "");
    for (let i = 0; i < userDocCount; i++) {
      setValue(`user_doc.${i}.doc_type`, "");
    }
    await GetDocumentType(type)
      .then((res) => setDocTypes(res.data.data))
      .catch((err) =>
        console.log(err)
        // toast.error(err.message || "Failed to fetch data")
      );
  };

  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 120);

  return (
    <>
      <AccountLayout>
        <div className="bg-white lg:w-[989px] w-full p-4 md:ml-4  ml-0 rounded-lg mx-auto sm:w-full border-[10px] border-[#d9d9d9]/20">
          <h2 className="text-start text-[#116599] text-sm font-bold  font-['DM Sans'] uppercase leading-[13.47px] underline underline-offset-8">
            PERSONAL DETAILS
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="">
            <div className="grid lg:grid-cols-2 grid-cols-1 mt-8">
              {/* First Row */}
              <div className="md:grid md:flex-row md:grid-cols-3 grid-cols-1 gap-x-10 gap-y-1">
                <div className="col-span-1">
                  <ProfileInpuField
                    register={register}
                    name={"first_name"}
                    label={"First Name"}
                    errors={errors}
                  />
                </div>
                <div className="col-span-1">
                  <div className="mb-2">
                    <ProfileInpuField
                      register={register}
                      name={"middle_name"}
                      label={"Middle Name"}
                      errors={errors}
                    />
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="mb-2">
                    <ProfileInpuField
                      register={register}
                      name={"second_name"}
                      label={"Last Name"}
                      errors={errors}
                    />
                  </div>
                </div>
                {/* Second Row */}
                <div className="col-span-1">
                  <div className="mb-2">
                    <ProfileInpuField
                      disabled={true}
                      register={register}
                      name={"id"}
                      label={"ID"}
                      errors={errors}
                    />
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="mb-6">
                    <label className="block mb-1 text-zinc-500 text-xs text-start font-normal font-['DM Sans'] leading-3">
                      Type
                    </label>
                    <div className="flex mt-3">
                      <Controller
                        name="type"
                        control={control}
                        rules={{ required: true }} // Example validation rule
                        render={({ field }) => (
                          <>
                            <input
                              {...field}
                              type="radio"
                              value="0"
                              id="individual"
                              onChange={(e) => {
                                field.onChange(e);
                                setUserType(true);
                                handleDocTypeChange(0);
                              }}
                              checked={userType === true}
                            />
                            <label className="ml-1" htmlFor="0">
                              Individual
                            </label>

                            <input
                              className="ml-3"
                              {...field}
                              type="radio"
                              value="1"
                              id="company"
                              onChange={(e) => {
                                field.onChange(e);
                                setUserType(false);
                                handleDocTypeChange(1);
                              }}
                              checked={userType === false}
                            />
                            <label className="ml-1" htmlFor="1">
                              Company
                            </label>
                          </>
                        )}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-span-1"></div>
                {/* Third Row */}
                <div className="col-span-1 mb-3">
                  <Controller
                    name="dob"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        selected={field.value}
                        onChange={(date) => {
                          field.onChange(date);
                        }}
                        customInput={<CustomInput />}
                        dateFormat="dd/MM/YYYY"
                        showTimeInput={false}
                        showMonthDropdown
                        showYearDropdown
                        dateFormatCalendar="MMMM"
                        yearDropdownItemNumber={100}
                        scrollableYearDropdown
                        maxDate={new Date()}
                        minDate={minDate}
                      />
                    )}
                  />
                  {errors && errors["dob"] && (
                    <p className="mt-1 text-red-500 text-xs">
                      {errors["dob"]?.message}
                    </p>
                  )}
                </div>
                <div className="col-span-1">
                  <div className="mb-6">
                    <ProfileInpuField
                      register={register}
                      name={"phone"}
                      label={"Phone Number"}
                      errors={errors}
                    />
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="mb-6">
                    <ProfileInpuField
                      register={register}
                      name={"po_box_no"}
                      label={"Po Box Number"}
                      errors={errors}
                    />
                  </div>
                </div>
                {/* Fourth Row */}
                <div className="col-span-1">
                  <div className="w-full mb-6">
                    <label className="block mb-1 text-zinc-500 text-xs text-start font-normal font-['DM Sans'] leading-3">
                      {userType === false ? "Country" : "Nationality"}
                    </label>
                    <Controller
                      control={control}
                      name="country_id"
                      render={({ field: { value, onBlur, onChange, ref } }) => (
                        <SingleSelect
                          ref={ref}
                          value={countries?.find((c: any) => c.value === value)}
                          options={countries}
                          onChange={(selectedOption) => {
                            setValue("state_id", "");
                            setValue("city", "");
                            handleCountryChange(parseInt(selectedOption));
                            onChange(selectedOption);
                          }}
                          onBlur={onBlur}
                        />
                      )}
                    />
                    {errors && errors["country_id"] && (
                      <p className="mt-1 text-red-500 w-44 text-xs">
                        {errors["country_id"]?.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="mb-6">
                    <label
                      htmlFor="confirm_password"
                      className="block mb-1 text-zinc-500 text-xs text-start font-normal font-['DM Sans'] leading-3"
                    >
                      State
                    </label>
                    <Controller
                      control={control}
                      name="state_id"
                      render={({ field: { value, onBlur, onChange, ref } }) => (
                        <SingleSelect
                          ref={ref}
                          value={
                            value
                              ? states?.find((c: any) => c.value === value)
                              : null
                          }
                          options={states}
                          onChange={onChange}
                          onBlur={onBlur}
                        />
                      )}
                    />
                    {errors && errors["state_id"] && (
                      <p className="mt-1 text-red-500 w-44 text-xs">
                        {errors["state_id"]?.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="mb-6">
                    <div className="mb-6">
                      <ProfileInpuField
                        register={register}
                        name={"city"}
                        label={"City"}
                        errors={errors}
                      />
                    </div>
                  </div>
                </div>
                {/* Fifth Row */}
                {userType === false ? (
                  ""
                ) : (
                  <div className="col-span-3">
                    <div className="mb-6">
                      <label
                        htmlFor="address"
                        className="block mb-1 text-zinc-500 text-xs text-start font-normal font-['DM Sans'] leading-3"
                      >
                        Address
                      </label>
                      <textarea
                        {...register("address")}
                        id="address"
                        name="address"
                        rows={4} // Adjust the number of rows as needed
                        className="form-textarea md:w-[504px] w-full mt-1 block border border-gray-500 rounded-md shadow-sm p-3 focus:outline-none"
                      ></textarea>
                      {errors && errors["address"] && (
                        <p className="mt-1 text-red-500 text-xs">
                          {errors["address"]?.message}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                <div className="col-span-3">
                  <div className="mb-6">
                    <h2 className="text-start text-[#116599] text-sm font-bold  font-['DM Sans'] uppercase leading-[13.47px] underline underline-offset-8">
                      COMPANY DETAILS
                    </h2>
                  </div>
                </div>

                {userType ? (
                  <>
                    {/* Sub first Row */}
                    <div className="col-span-1">
                      <div className="md:h-16 mb-6">
                        <ProfileInpuField
                          register={register}
                          name={"company_name"}
                          label={"Company Name"}
                          errors={errors}
                        />
                      </div>
                    </div>
                    <div className="col-span-1">
                      <div className="md:h-16 mb-6">
                        <ProfileInpuField
                          register={register}
                          name={"designation"}
                          label={"Designation"}
                          errors={errors}
                        />
                      </div>
                    </div>
                    <div className="col-span-1">
                      <div className="md:h-16 mb-6">
                        <ProfileInpuField
                          disabled={true}
                          register={register}
                          name={"email"}
                          label={"Email"}
                          errors={errors}
                          type="Email"
                        />
                      </div>
                    </div>

                    {/* Sub Second Row */}
                    <div className="col-span-1">
                      <div className="md:h-16 mb-6">
                        <ProfileInpuField
                          register={register}
                          name={"salary"}
                          label={"Salary"}
                          errors={errors}
                        />
                      </div>
                    </div>

                    <div className="col-span-1">
                      <div className="md:h-16 mb-6">
                        <label
                          htmlFor="currency"
                          className="block mb-1 text-zinc-500 text-xs text-start font-normal font-['DM Sans'] leading-3"
                        >
                          Currency
                        </label>
                        <Controller
                          control={control}
                          name="currency"
                          render={({
                            field: { value, onBlur, onChange, ref },
                          }) => (
                            <SingleSelect
                              ref={ref}
                              value={
                                value
                                  ? currencyList?.find(
                                    (c: any) => c.value === value
                                  )
                                  : null
                              }
                              options={currencyList}
                              onChange={onChange}
                              onBlur={onBlur}
                            />
                          )}
                        />
                        {errors && errors["currency"] && (
                          <p className="mt-1 text-red-500 text-xs">
                            {errors["currency"]?.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-span-1">
                      <div className="md:h-16 mb-6">
                        <ProfileInpuField
                          register={register}
                          name={"bank"}
                          label={"Bank"}
                          errors={errors}
                        />
                      </div>
                    </div>
                    <div className="col-span-1"></div>

                    <div className="col-span-3">
                      <div className="mb-6">
                        <label className="block mb-1 text-zinc-500 text-xs text-start font-normal font-['DM Sans'] leading-3">
                          Company Address
                        </label>
                        <textarea
                          {...register("company_address")}
                          rows={4} // Adjust the number of rows as needed
                          className="form-textarea mt-1 md:w-[504px] block w-full border border-[#7d7d87] rounded-md shadow-sm p-3 focus:outline-none"
                        ></textarea>
                        {errors && errors["company_address"] && (
                          <p className="mt-1 text-red-500 text-xs">
                            {errors["company_address"]?.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Sub first Row */}

                    <div className="col-span-1">
                      <ProfileInpuField
                        register={register}
                        name={"company_name"}
                        label={"Company Name"}
                        errors={errors}
                      />
                    </div>
                    <div className="col-span-1">
                      <ProfileInpuField
                        register={register}
                        name={"tax_reg_no"}
                        label={"Tax Registration Number"}
                        errors={errors}
                      />
                    </div>
                    <div className="col-span-1">
                      <ProfileInpuField
                        register={register}
                        name={"bank"}
                        label={"Bank"}
                        errors={errors}
                      />
                    </div>

                    {/* Sub Second Row */}
                    <div className="col-span-1 md:w-40">
                      <label className="block text-gray-700 text-xs">
                        Email
                      </label>
                      <input
                        {...register("email")}
                        type="text"
                        id="email"
                        name="email"
                        className="form-input block w-full shadow-sm p-1 md:w-40 h-[30px] rounded-[5px] border border-[#7d7d87] px-4 py-2  text-neutral-950 text-[13px] font-normal"
                      />
                    </div>
                    <div className="col-span-1">
                      <ProfileInpuField
                        register={register}
                        name={"fax"}
                        label={"Fax"}
                        errors={errors}
                      />
                    </div>
                    <div className="col-span-1">
                      <ProfileInpuField
                        register={register}
                        name={"website"}
                        label={"Website"}
                        errors={errors}
                      />
                    </div>

                    <div className="col-span-1"></div>

                    <div className="col-span-3">
                      <div className="mb-6">
                        <label
                          htmlFor="address"
                          className="block text-gray-700 text-xs"
                        >
                          Company Address
                        </label>
                        <textarea
                          {...register("company_address")}
                          id="company_address"
                          name="company_address"
                          rows={4} // Adjust the number of rows as needed
                          className="form-textarea mt-1 block md:w-[504px] w-full border focus:outline-none border-[#7d7d87] rounded-md shadow-sm p-3"
                        ></textarea>
                        {errors && errors["company_address"] && (
                          <p className="mt-1 text-red-500 text-xs">
                            {errors["company_address"]?.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </>
                )}
                {/* Empty Grid Item for Spacing */}
                {/* <div className="col-span-1"></div> */}
                {/* Submit Button - Aligned to the Right */}
              </div>

              <div className="flex flex-col lg:items-start xl:items-center">
                {/* <input type="text" id="name" name="name" placeholder="أدخل الاسم باللغة العربية..." 
                 className="w-full p-2 border border-gray-300 rounded text-right">
                  <input */}
                {/* <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="أدخل الاسم باللغة العربية..."
                    readOnly
                    style={{
                      paddingRight: "30px",
                      width: "100%",
                      boxSizing: "border-box",
                      border: "none",
                    }}
                  /> */}
                <div className="justify-center items-center">
                  <div className="lg:w-[205px] h-[220px] bg-[#fcfcfc] w-full rounded-[5px]">
                    <label htmlFor="file-upload" className="w-full h-full">
                      <div className="border-2 border-dashed md:w-[155px] h-[150px] w-full border-gray-300 rounded-lg p-4 flex items-center justify-center mb-4 mx-auto cursor-pointer">
                        {selectedFile || profileImage ? (
                          <Image
                            width={155}
                            height={150}
                            src={
                              selectedFile
                                ? URL.createObjectURL(selectedFile)
                                : `${process.env.NEXT_PUBLIC_STORAGE_URL}${profileImage}`
                            }
                            alt="Selected"
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <div className="text-gray-400">
                            <svg
                              width="35"
                              height="39"
                              viewBox="0 0 35 39"
                              className="mx-4"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g filter="url(#filter0_d_7524_3876)">
                                <path
                                  d="M27.2206 5.08203H7.90063C6.37632 5.08203 5.14062 6.31773 5.14062 7.84203V27.162C5.14062 28.6863 6.37632 29.922 7.90063 29.922H27.2206C28.7449 29.922 29.9806 28.6863 29.9806 27.162V7.84203C29.9806 6.31773 28.7449 5.08203 27.2206 5.08203Z"
                                  stroke="white"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M17.5586 11.9805V23.0205"
                                  stroke="white"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M12.0391 17.5H23.0791"
                                  stroke="white"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </g>
                              <defs>
                                <filter
                                  id="filter0_d_7524_3876"
                                  x="-3"
                                  y="0.941406"
                                  width="41.1211"
                                  height="41.1211"
                                  filterUnits="userSpaceOnUse"
                                  colorInterpolationFilters="sRGB"
                                >
                                  <feFlood
                                    floodOpacity="0"
                                    result="BackgroundImageFix"
                                  />
                                  <feColorMatrix
                                    in="SourceAlpha"
                                    type="matrix"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    result="hardAlpha"
                                  />
                                  <feOffset dy="4" />
                                  <feGaussianBlur stdDeviation="2" />
                                  <feColorMatrix
                                    type="matrix"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                                  />
                                  <feBlend
                                    mode="normal"
                                    in2="BackgroundImageFix"
                                    result="effect1_dropShadow_7524_3876"
                                  />
                                  <feBlend
                                    mode="normal"
                                    in="SourceGraphic"
                                    in2="effect1_dropShadow_7524_3876"
                                    result="shape"
                                  />
                                </filter>
                              </defs>
                            </svg>
                            <p className="text-sm">ADD HERE</p>
                          </div>
                        )}
                      </div>
                    </label>
                    <div className="flex justify-center ml-32">
                      <input
                        type="file"
                        id="file-upload"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </div>
                    <div className="flex justify-center">
                      <label
                        onClick={handleProfilePic}
                        className="w-[119px] h-[29px] text-xs font-normal bg-[#0670b1] rounded-[5px] border border-[#0670b1] text-white hover:bg-white hover:border-black hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 mx-auto flex items-center justify-center cursor-pointer"
                      >
                        CHANGE PICTURE
                      </label>
                    </div>
                  </div>
                </div>
                <div className="">
                  <ProfileInpuField
                    register={register}
                    name={"arabic_name"}
                    label={"اسم"}
                    errors={errors}
                  />
                </div>
              </div>
            </div>
            {/*Member Details Content goes here */}

            <MemberList
              getValues={getValues}
              control={control}
              register={register}
              viewData={viewData}
              setValue={setValue}
              name={"user_members"}
              errors={errors}
            />

            {/*Documents Section Content goes here */}

            <DocumentsSection
              getValues={getValues}
              control={control}
              register={register}
              setValue={setValue}
              name={"user_doc"}
              handleImageUpload={handleImageUpload}
              docTypes={docTypes}
              errors={errors}
              setUserDocCount={setUserDocCount}
              userDocCount={userDocCount}
            />

            <div className="flex md:justify-end md:items-end my-4">
              <Button type="submit" isLoading={globalLoader}>
                Update
              </Button>
            </div>
          </form>
        </div>
      </AccountLayout>
    </>
  );
};

export default AccountDetails;
