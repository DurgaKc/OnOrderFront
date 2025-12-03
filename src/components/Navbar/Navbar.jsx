import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Typography,
  Dialog,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Login from "../../pages/UserPages/Login";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const handleLoginDialog = () => setOpenLoginDialog(true);
  const handleCloseLoginDialog = () => setOpenLoginDialog(false);

  let user = null;
  try {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      user = JSON.parse(storedUser);
    }
  } catch (err) {
    console.error("Invalid user in localStorage:", err);
    user = null;
  }

  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);

  // ✅ Check token on mount and open login dialog if not logged in
  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLogin(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLogin(false);
    toast.success("Logged out successfully!");
    navigate("/");
  };
  const links = [
    { name: "Home", path: "/" },
    { name: "Contact Us", path: "/contactUs" },
    // { name: "Go admin", path: "/admin" },
   
  ];

  const renderLinks = (isMobile = false) =>
    links.map((link) => (
      <Typography
        key={link.name}
        variant="h6"
        sx={{
          fontWeight: "bold",
          fontSize: "1.125rem",
          cursor: "pointer",
          textAlign: isMobile ? "center" : "left",
          my: isMobile ? 1 : 0,
        }}
        onClick={() =>
          link.protected ? handleProtectedClick(link.path) : navigate(link.path)
        }
      >
        {link.name}
      </Typography>
    ));

  return (
    <>
<AppBar
  position="static"
  sx={{
    backgroundColor: "#5fb298", // same greenish color as your reference
    color: "#fff", // white text for contrast
    boxShadow: "none",
  }}
>
  <Toolbar className="flex justify-between">
    {/* Logo Section */}
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <img
        src="/logo.jpeg"
        alt="restro Logo"
        style={{
          height: 55,
          width: 55,
          marginRight: 8,
          borderRadius: "50%",
          boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
        }}
      />
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", color: "#fff" }} // white text
      >
        Order Food
      </Typography>
    </Box>

    {/* Desktop Links */}
    <div className="hidden md:flex gap-6 items-center ">
      {renderLinks()}
      <Button
        onClick={isLogin ? handleLogout : handleLoginDialog}
        sx={{
          fontWeight: "bold",
          fontSize: "1.125rem",
          cursor: "pointer",
          color: "#fff", // white text
          borderRadius: "12px",
          textTransform: "none",
          backgroundColor: "#34d399", // lighter green for button
          px: 2,
          "&:hover": { backgroundColor: "#059669" }, // hover effect
        }}
      >
        {isLogin ? "Logout" : "Login"}
        {/* {user?.email ? ` (${user?.email})` : ""} */}
      </Button>
    </div>

    {/* Mobile Menu Icon */}
    <div className="md:hidden">
      <IconButton color="inherit" onClick={handleDrawerToggle}>
        <MenuIcon />
      </IconButton>
    </div>
  </Toolbar>

  {/* Mobile Drawer */}
  {mobileOpen && (
    <div className="flex flex-col items-center px-6 py-4 bg-[#5fb298] md:hidden">
      {renderLinks(true)}
      <Button
        onClick={isLogin ? handleLogout : handleLoginDialog}
        sx={{
          fontWeight: "bold",
          fontSize: "1.125rem",
          cursor: "pointer",
          color: "#fff",
          borderRadius: "12px",
          textTransform: "none",
          backgroundColor: "#34d399",
          "&:hover": { backgroundColor: "#059669" },
        }}
      >
        {isLogin ? "Logout" : "Login"}
        {user?.email ? ` (${user?.email})` : ""}
      </Button>
    </div>
  )}
</AppBar>



      {/* Login Dialog */}
      <Dialog
        sx={{ backgroundColor: "rgba(255, 255, 250, 0.6)" }}
        open={openLoginDialog}
        onClose={handleCloseLoginDialog}
      >
        <Login
          onClose={() => {
            handleCloseLoginDialog();
            const token = localStorage.getItem("token");
            if (token) setIsLogin(true); // update login state after successful login
          }}
        />
      </Dialog>
    </>
  );
}
