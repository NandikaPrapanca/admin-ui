import React from "react";
import AuthLayout from "../components/Layouts/AuthLayout";
import FromSignUp from "../components/Fragments/FormSignUp";

const SignUp = () => {
  return (
    <AuthLayout>
      <FromSignUp />
    </AuthLayout>
  );
};

export default SignUp;