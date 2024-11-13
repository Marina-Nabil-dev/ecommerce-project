import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AuthRoutes } from "../../routes/authRoutes";
import FormField from './../../components/Forms/Fields/FormField';
import PasswordInput from './../../components/Forms/Fields/PasswordInput';
import ModalComponent from './../ModalComponent';
import GoogleRegisterButton from './../../components/Forms/Fields/GoogleRegisterButton';
import LoadingButton from './../../components/Forms/Fields/LoadingButton';
import { postApiData } from '../../helpers/postApiData';
import toast from "react-hot-toast";
import { useDispatch } from 'react-redux';
import { setToken } from '../../redux/Reducers/userReducer'; // Import the setToken action

const LoginModal = ({ closeModal, showImage }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  
  const dispatch = useDispatch();


  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
 

  const handleSubmit = async (values, { setSubmitting }) => {
    setIsLoading(true);
    setMessage("");
    setErrors({});

    const response = await postApiData(AuthRoutes.LOGIN, values, {});

    const { status, message, data } = response;
    if (status === 200) {
      localStorage.setItem("userToken", data.token);

      dispatch(setToken(data.token));
      
      toast.success(message);

      closeModal();
    }
    if (status == 422) {
      setErrors(data);
      setMessage(message);
      toast.error(message);
    }

    setIsLoading(false);
    setSubmitting(false);
  };

  const loginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
      dial_code: "+20",
    },

    validationSchema: Yup.object({
      email: Yup.string().required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters"),
    }),
    onSubmit: handleSubmit,
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  function handleOpenRegitserModal(e) {
    e.preventDefault();
    openModal("register");
  }

  return (
    <>
      <div
        className={`flex flex-col ${
          showImage ? "w-1/2" : "w-full"
        } max-w-4xl py-3 px-5`}
      >
        <div className="flex justify-end items-end text-right w-6">
          <img
            className="border-[1px] border-grayDarker p-1 my-2 rounded-full cursor-pointer"
            src="/home/x-close.svg"
            alt="close modal"
            onClick={closeModal}
          />
        </div>
        <form onSubmit={loginForm.handleSubmit} className="p-8">
          {message && <p className="text-red-500 font-semibold">{message}</p>}

          <FormField
            label="Email"
            name="email"
            type="email"
            value={loginForm.values.email}
            onChange={loginForm.handleChange}
            onBlur={loginForm.handleBlur}
            error={loginForm.errors.email}
            backendError={
              errors && errors["email"] ? errors["email"] : null
            }
            touched={loginForm.touched.email}
            placeholder="email"
          />

          <PasswordInput
            label="Password"
            name="password"
            value={loginForm.values.password}
            onChange={loginForm.handleChange}
            onBlur={loginForm.handleBlur}
            error={loginForm.errors.password}
            touched={loginForm.touched.password}
            backendError={
              errors && errors["password"] ? errors["password"] : null
            }
            showPassword={showPassword}
            togglePasswordVisibility={togglePasswordVisibility}
          />
          <LoadingButton
            isLoading={isLoading}
            text="Sign In"
            onClick={loginForm.handleSubmit}
          />

          <div className="text-center mt-4">
            <p className="text-grayLight">Or</p>
            <GoogleRegisterButton />
          </div>

          <p className="mt-4 text-center text-gray-500">
            Don't have an account?{" "}
            <a
              href="#"
              className="text-primary font-bold"
              onClick={handleOpenRegitserModal}
            >
              Create a new account
            </a>
          </p>
        </form>
      </div>

      {showImage && (
        <div
          className="w-1/2 bg-cover bg-right flex relative"
          style={{ backgroundImage: `url('/home/loginImage.png')` }}
        >
          <div className=" justify-end p-8  text-white">
            <h2 className="text-3xl font-bold">Welcome back to Biddex</h2>
            <p className="mt-4 text-lg">Login to your Account</p>
          </div>
        </div>
      )}

      {isModalOpen && (
        <ModalComponent
          isOpen={isModalOpen}
          closeModal={closeModal}
          modalType={modalType}
          showImage={false}
          modalProps={
            {
              /* pass any additional props here */
            }
          }
        />
      )}
    </>
  );
};

export default LoginModal;
