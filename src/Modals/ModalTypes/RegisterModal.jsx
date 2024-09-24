import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { postApiData } from '../../helpers/postApiData';
import { AuthRoutes } from './../../routes/authRoutes';
import useModal from "../../hooks/useModal";
import RegisterForm from './../../components/Forms/FormTypes/RegisterForm';
const RegisterModal = ({ closeModal, showImage }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState({
    name: "",
    mobile_number: "",
    password: "",
    rePassword: "",
    dial_code: "+20",
  });
  const { isModalOpen, modalType, openModal, closeOpenModal } = useModal();


  const validationSchema = Yup.object().shape({
    mobile_number: Yup.string().required("Phone number is required"),
    email: Yup.string().required("Email is required"),
    name: Yup.string().required("Full Name is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
      rePassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    console.log(values);
    
    setIsLoading(true);
    setUser(values);
    setErrors({});
    
      const response = await postApiData(AuthRoutes.REGISTER, values); // Use 'values' instead of 'user' here
      const { status, message, data } = response;
      if (status === 200) {
        closeModal();
        openModal("completeProfile");
      }
      if(status == 422)
      {
        setErrors(data);
      }
      
    setIsLoading(false);
    setSubmitting(false);
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const formik = useFormik({
    initialValues: {
      mobile_number: "",
      name: "",
      password: "",
      password_confirmation: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <div
        className={`flex flex-col ${showImage ? "w-1/2" : "w-full"} py-3 px-5`}
      >
        <div className="flex justify-end items-end text-right w-6">
          <img
            className="border-[1px] border-grayDarker p-1 my-2 rounded-full cursor-pointer"
            src="/home/x-close.svg"
            alt="close modal" onClick={closeModal}
          />
        </div>
        <div className="px-10 ml-10">
          <RegisterForm
            initialValues={user}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            errors={errors}
            showPassword={showPassword}
            showConfirmPassword={showConfirmPassword}
            togglePasswordVisibility={togglePasswordVisibility}
            toggleConfirmPasswordVisibility={toggleConfirmPasswordVisibility}
          />
        </div>
      </div>
      {showImage && (
        <div
          className="w-1/2 bg-cover bg-right flex relative"
          style={{ backgroundImage: `url('/home/loginImage.png')` }}
        >
          <div className=" justify-end p-8  text-white">
            <h2 className="text-3xl font-bold">Welcome back to Biddex</h2>
            <p className="mt-4 text-lg">Register your Account</p>
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterModal;
