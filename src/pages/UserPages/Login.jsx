import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function Login({ onClose }) {
const navigate = useNavigate();

  const [values, setValues] = useState({ email: "example@gmail.com", password: "*****" });
  const [showPassword, setShowPassword] = useState(false);

  //  Single handleChange function
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  //  Mutation for login
  const mutation = useMutation({
    mutationFn: async (formData) => {
      return axios.post(`${backendUrl}/login`, formData);
    },
    onSuccess: (res) => {
      console.log("Success", res.data);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      toast.success("Logged in Successfully");
      navigate("/admin")
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Something went wrong!");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(values);
  };

  return (
    <Box>
      <Paper
        elevation={6}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 400,
          borderRadius: 4,
          textAlign: "center",
          backgroundColor: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(8px)",
          position: "relative", // ✅ Needed for close icon positioning
        }}
      >
        {/* Close Icon at Top Right */}
        <IoMdClose
          onClick={onClose}
          size={28}
          style={{
            cursor: "pointer",
            position: "absolute",
            top: 16,
            right: 16,
            color: "#555",
          }}
        />
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          sx={{ color: "#1e293b" }}
        >
          Welcome Back 👋
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, color: "#4b5563" }}>
          Please login to continue
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />

          <TextField
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 3 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              py: 1.5,
              backgroundColor: "#5fb298",
              fontSize: "1rem",
              fontWeight: "bold",
              borderRadius: "12px",
              textTransform: "none",
              "&:hover": { backgroundColor: "#44927c" },
            }}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
