import { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { changePassword } from "../../../api/userApi";

export default function PasswordChange({ userId }) {
  const [values, setValues] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    showCurrent: false,
    showNew: false,
    showConfirm: false,
  });

  const [errors, setErrors] = useState({});

  // ✅ React Query mutation
  const mutation = useMutation({
    mutationFn: ({ oldPassword, newPassword }) =>
      changePassword({ userId, oldPassword, newPassword }),
    onSuccess: (data) => {
      toast.success(data.message || "Password changed successfully!");
      setValues({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
        showCurrent: false,
        showNew: false,
        showConfirm: false,
      });
      setErrors({});
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to change password");
    },
  });

  const handleChange = (prop) => (e) => {
    setValues({ ...values, [prop]: e.target.value });
    if (errors[prop]) setErrors({ ...errors, [prop]: "" });
  };

  const handleClickShowPassword = (prop) => {
    setValues({ ...values, [prop]: !values[prop] });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!values.currentPassword) newErrors.currentPassword = "Current password is required";
    if (!values.newPassword) newErrors.newPassword = "New password is required";
    else if (values.newPassword.length < 6) newErrors.newPassword = "Password must be at least 6 characters";
    if (!values.confirmPassword) newErrors.confirmPassword = "Please confirm your password";
    else if (values.newPassword !== values.confirmPassword) newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    mutation.mutate({ oldPassword: values.currentPassword, newPassword: values.newPassword });
  };

  const renderPasswordField = (label, valueProp, showProp) => (
    <TextField
      label={label}
      type={values[showProp] ? "text" : "password"}
      value={values[valueProp]}
      onChange={handleChange(valueProp)}
      error={!!errors[valueProp]}
      helperText={errors[valueProp]}
      required
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={() => handleClickShowPassword(showProp)} edge="end">
              {values[showProp] ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 400,
        mx: "auto",
        my: 10,
        p: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        boxShadow: 2,
        borderRadius: 2,
      }}
    >
      <Typography variant="h6" fontWeight={600} textAlign="center">
        Change Password
      </Typography>

      {renderPasswordField("Current Password", "currentPassword", "showCurrent")}
      {renderPasswordField("New Password", "newPassword", "showNew")}
      {renderPasswordField("Retype New Password", "confirmPassword", "showConfirm")}

      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 2, textTransform: "none", backgroundColor: "#5fb298", borderRadius: "10px" }}
        disabled={mutation.isLoading}
        startIcon={mutation.isLoading ? <CircularProgress size={20} /> : null}
      >
        {mutation.isLoading ? "Submitting..." : "Submit"}
      </Button>
    </Box>
  );
}
