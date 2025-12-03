import { Box, Typography, Paper } from "@mui/material";
import { motion } from "framer-motion";
import { FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { GiKnifeFork } from "react-icons/gi";

export default function ContactUs() {
  return (
    <Box className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-yellow-50 via-orange-50 to-red-50 px-4 py-12 overflow-hidden">
      {/* Animated floating food icons */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-10 text-4xl text-[#b01010] opacity-30"
      >
        🍔
      </motion.div>
      <motion.div
        animate={{ y: [0, 20, 0], rotate: [0, 10, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-10 text-3xl text-[#5fb298] opacity-30"
      >
        🍕
      </motion.div>
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, -10, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/3 text-3xl text-[#facc15] opacity-30"
      >
        🍟
      </motion.div>

      {/* Contact Card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
<Paper
  elevation={12}
  className="max-w-2xl w-full p-10 rounded-3xl bg-white shadow-2xl hover:scale-105 transition-transform duration-500"
>
  {/* Title */}
  <Typography
    variant="h3"
    className="font-extrabold text-[#b01010] text-center mb-8"
  >
    Contact Us
  </Typography>

  {/* Thank You Message */}
  <Typography
    variant="h6"
    className="text-gray-700 text-center mb-10"
  >
    Thank you for reaching out! We love hearing from you. Feel free to contact us with any questions or feedback.
  </Typography>

  {/* Address Section */}
  <Box className="flex items-start space-x-4 mb-8 bg-[#fff5f5] p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
    <Box className="flex-shrink-0 bg-[#b01010] text-white p-3 rounded-full flex items-center justify-center">
      <FaMapMarkerAlt className="text-xl" />
    </Box>
    <Box>
      <Typography variant="subtitle1" className="font-semibold text-gray-800 mb-1">
        Address
      </Typography>
      <Typography variant="body1" className="text-gray-600">
        SKYDECK RESTRO & BAR <br />
        Pasang Lamu Road, Nepalgunj-10, Banke
      </Typography>
    </Box>
  </Box>

  {/* Phone Section */}
  <Box className="flex items-start space-x-4 bg-[#f0fdf4] p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
    <Box className="flex-shrink-0 bg-[#5fb298] text-white p-3 rounded-full flex items-center justify-center">
      <FaPhoneAlt className="text-xl" />
    </Box>
    <Box>
      <Typography variant="subtitle1" className="font-semibold text-gray-800 mb-1">
        Phone
      </Typography>
      <Typography variant="body1" className="text-gray-600">
        +977 9709081041 <br />
        +977 9866212528
      </Typography>
    </Box>
  </Box>

  {/* Footer Message */}
  <Typography
    variant="body2"
    className="text-gray-400 text-center mt-10"
  >
    We look forward to serving you delicious meals soon! <GiKnifeFork className="inline text-[#f59e0b] ml-1" />
  </Typography>
</Paper>

      </motion.div>
    </Box>
  );
}
