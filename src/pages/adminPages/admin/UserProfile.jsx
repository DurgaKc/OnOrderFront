import { Box, Typography, Paper, Stack } from "@mui/material";
import { LocationOn, Phone, Email } from "@mui/icons-material";
import { motion } from "framer-motion";

export default function UserProfile() {
  const user = {
    restaurantName: "Sky Deck",
    description: "A cozy rooftop restaurant with a beautiful view.",
    contactNumber: "9876543210",
    location: "Kathmandu, Nepal",
    email: "sky112@gmail.com",
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
      bgcolor="#f0f4f8"
      p={2}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Paper
          elevation={6}
          sx={{
            p: 5,
            maxWidth: 500,
            width: "100%",
            borderRadius: 3,
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(255,255,255,0.85)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
          }}
        >
          {/* Restaurant Name */}
          <Typography
            variant="h3"
            fontWeight="700"
            gutterBottom
            sx={{
              letterSpacing: 1.2,
              fontFamily: "'Roboto Slab', serif",
              textAlign: "center",
              color: "#1e293b",
            }}
          >
            {user.restaurantName}
          </Typography>

          {/* Description */}
          <Typography
            variant="body1"
            sx={{
              mb: 3,
              textAlign: "center",
              fontStyle: "italic",
              color: "#475569",
              lineHeight: 1.6,
            }}
          >
            {user.description}
          </Typography>

          {/* Contact Info */}
          <Stack spacing={1.5}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Phone sx={{ color: "#5fb298" }} />
              <Typography variant="body1">{user.contactNumber}</Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <LocationOn sx={{ color: "#5fb298" }} />
              <Typography variant="body1">{user.location}</Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <Email sx={{ color: "#5fb298" }} />
              <Typography variant="body1">{user.email}</Typography>
            </Stack>
          </Stack>
        </Paper>
      </motion.div>
    </Box>
  );
}
