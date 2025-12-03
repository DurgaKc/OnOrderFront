import { AppBar, Toolbar, Box, IconButton, Typography, Grid } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import Admin from "../../pages/adminPages/admin/Admin";

export default function AdminNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const links = [
    { name: "Home", path: "/admin" },
    { name: "Add Items", path: "/admin/add-items" },
    { name: "Item Lists", path: "/admin/item-lists" },
    { name: "Orders", path: "/admin/orders" },
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
        onClick={() => window.location.href = link.path}
      >
        {link.name}
      </Typography>
    ));

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#5fb298",
          color: "#fff",
          boxShadow: "none",
        }}
      >
        <Toolbar className="flex justify-between">
          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src="/logo.jpeg"
              alt="Logo"
              style={{
                height: 55,
                width: 55,
                marginRight: 8,
                borderRadius: "50%",
                boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
              }}
            />
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#fff" }}>
              Order Food
            </Typography>
          </Box>

          {/* Desktop Links + Admin Dropdown */}
          <Box className="hidden md:flex gap-6 items-center">
            {renderLinks()}
            <Admin /> {/* Person icon + dropdown arrow */}
          </Box>

          {/* Mobile Menu Icon */}
          <Box className="md:hidden">
            <IconButton color="inherit" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>

        {/* Mobile Drawer */}
        {mobileOpen && (
          <Box className="flex flex-col items-center px-6 py-4 bg-[#5fb298] md:hidden">
            {renderLinks(true)}
            <Admin /> {/* Admin dropdown in mobile menu */}
          </Box>
        )}
      </AppBar>
    </>
  );
}
