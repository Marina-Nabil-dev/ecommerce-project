import React, { useState } from "react";
import { useFormik } from "formik";
import PasswordInput from "./../Fields/PasswordInput";
import FormField from "./../Fields/FormField";
import LoadingButton from "./../Fields/LoadingButton";
import GoogleRegisterButton from "./../Fields/GoogleRegisterButton";
import useModal from "../../../hooks/useModal";
import ModalComponent from './../../../Modals/ModalComponent';

function RegisterForm({
  initialValues,
  validationSchema,
  onSubmit,
  isLoading,
  errors,
  showPassword,
  showConfirmPassword,
  togglePasswordVisibility,
  toggleConfirmPasswordVisibility,
}) {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  const { isModalOpen, modalType, openModal, closeModal } = useModal();


  function handleLoginModal() {
    openModal("login");
  }

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <FormField
          label="Phone number or email"
          name="mobile_number"
          type="text"
          value={formik.values.mobile_number}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.mobile_number}
          backendError={
            errors && errors["mobile_number"] ? errors["mobile_number"] : null
          }
          touched={formik.touched.mobile_number}
          placeholder="1287748574"
          additionalContent={
            <span className="inline-flex items-center p-2 px-3 bg-gray-50 rounded-md rounded-r-none border-r border-gray-300 group-focus-within:border-black">
              +20
            </span>
          }
        />

        <FormField
          label="Full Name"
          name="name"
          type="text"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.name}
          backendError={errors["name"] ?? errors["name"]}
          touched={formik.touched.name}
          placeholder="John Doe"
        />

        <PasswordInput
          label="Password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.password}
          touched={formik.touched.password}
          backendError={errors ?? errors["password"][0]}
          showPassword={showPassword}
          toggleVisibility={togglePasswordVisibility}
        />

        <PasswordInput
          label="Confirm Password"
          name="password_confirmation"
          value={formik.values.password_confirmation}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.password_confirmation}
          touched={formik.touched.password_confirmation}
          backendError={errors ?? errors["password_confirmation"][0]}
          showPassword={showConfirmPassword}
          toggleVisibility={toggleConfirmPasswordVisibility}
        />

        <span className="text-gray-500 font-semibold text-sm">
          By creating an account you accept terms and conditions and Privacy
          Policy
        </span>
        <LoadingButton
          isLoading={isLoading}
          text="Create Account"
          onClick={formik.handleSubmit}
        />

        <div className="text-center mt-4">
          <p className="text-grayLight">Or</p>
          <GoogleRegisterButton />
        </div>

        <p className="mt-4 p-2 text-center text-gray-500">
          Already have an account?{" "}
          <a
            href="#"
            onClick={handleLoginModal}
            className="text-primary font-bold"
          >
            Sign in
          </a>
        </p>
      </form>

      {isModalOpen && (
        <ModalComponent
          isOpen={isModalOpen}
          closeModal={closeModal}
          modalType={modalType}
          showImage={true}
          modalProps={
            {
              /* pass any additional props here */
            }
          }
        />
      )}
    </>
  );
}

export default RegisterForm;
