import React, { useState } from "react";
import AuthLayout from "../components/Layouts/AuthLayout";
import FromSignUp from "../components/Fragments/FormSignUp";
import { registerService } from "../services/authService";
import AppSnackbar from "../components/Elements/AppSnackbar";

const SignUp = () => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleRegister = async (name, email, password) => {
    try {
      await registerService(name, email, password);
      setSnackbar({
        open: true,
        message: "Registrasi berhasil! Silakan login.",
        severity: "success",
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.msg || "Registrasi gagal, coba lagi.",
        severity: "error",
      });
    }
  };

  return (
    <AuthLayout>
      <FromSignUp onSubmit={handleRegister} />
      <AppSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleCloseSnackbar}
      />
    </AuthLayout>
  );
};

export default SignUp;
