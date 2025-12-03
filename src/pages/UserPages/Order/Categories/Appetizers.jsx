import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Dialog,
} from "@mui/material";
import { FaStar } from "react-icons/fa";
import Order from "../Order";

const appetizers = [
  {
    id: 1,
    name: "Spring Rolls",
    image: "/Spring-Rolls.jpg",
    price: 170,
    rating: 4.1,
  },
  {
    id: 2,
    name: "French Fries",
    image: "/french-fries.jpg",
    price: 110,
    rating: 4.2,
  },
  {
    id: 3,
    name: "Chicken Wings",
    image: "/Chicken-wings.jpg",
    price: 100,
    rating: 4.0,
  },
  {
    id: 4,
    name: "Chicken Nachos",
    image: "/Chicken-nachos.jpg",
    price: 100,
    rating: 3.0,
  },
];

export default function Appetizers() {
  const [openOrderDialog, setOpenOrderDialog] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null); // store clicked food

  const handleOrderDialog = (item) => {
    setOpenOrderDialog(true);
    setSelectedFood(item); // set selected food

  };
  const handleCloseOrderDialog = () => setOpenOrderDialog(false);


  return (
    <Box className="min-h-screen bg-gradient-to-b from-yellow-50 via-orange-50 to-red-50 p-6">
      <Typography
        variant="h4"
        className="text-center font-extrabold text-[#b01010] pb-8 text-4xl md:text-5xl"
      >
        Appetizers
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {appetizers.map((item) => (
          <Grid item key={item.id}>
            <Card
              sx={{
                width: 300,
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 12px 25px rgba(0,0,0,0.25)",
                },
                cursor: "pointer",
              }}
            >
              {/* Image */}
              <Box sx={{ width: "100%", height: 180, overflow: "hidden" }}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Box>

              {/* Card Content */}
              <CardContent sx={{ backgroundColor: "#f0fdf4" }}>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  gutterBottom
                  align="center"
                  color="#1e293b"
                  className="text-lg md:text-xl"
                >
                  {item.name}
                </Typography>

                {/* Price and Order button horizontal */}
                <Box className="flex justify-between items-center mb-3 px-2">
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    color="#4b5563"
                    className="text-base md:text-lg"
                  >
                    Rs. {item.price}
                  </Typography>

                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#5fb298",
                      "&:hover": { backgroundColor: "#499984" },
                      textTransform: "none",
                      borderRadius: "12px",
                      px: 3,
                      py: 1,
                      fontSize: "0.9rem",
                    }}
                    onClick={() => handleOrderDialog(item)}
                  >
                    Order
                  </Button>
                </Box>

                {/* Ratings below */}
                <Box className="flex justify-center items-center mt-2">
                  {[...Array(5)].map((_, idx) => (
                    <FaStar
                      key={idx}
                      size={18}
                      className="mx-0.5"
                      color={idx < Math.floor(item.rating) ? "#facc15" : "#ccc"}
                    />
                  ))}
                  <Typography
                    variant="body1"
                    className="ml-2 text-gray-600 font-semibold text-sm md:text-base"
                  >
                    {item.rating.toFixed(1)}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog
        sx={{ backgroundColor: "rgba(255, 255, 250, 0.6)" }}
        open={openOrderDialog}
        onClose={handleCloseOrderDialog}
      >
        {selectedFood && (
          <Order
            food={selectedFood} // pass food to Order component
            onClose={handleCloseOrderDialog}
          />
        )}
      </Dialog>
    </Box>
  );
}
