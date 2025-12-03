import React, { useState } from "react";
import {
  Box, Typography, TextField, Button, Paper, Select, MenuItem
} from "@mui/material";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { addOrder } from "../../../api/orderApi";

const Order = ({ onClose, food }) => {
  const [formData, setFormData] = useState({
    custname: "",
    table: "",
    quantity: 1,
    status: "Pending",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ React Query Mutation
  const orderMutation = useMutation({
    mutationFn: (newOrder) =>
      addOrder({
        ...newOrder,
        foodname: food?.name,
        price: food?.price,
      }),

    onSuccess: () => {
      toast.success("Order Submitted Successfully!");
      onClose();
    },
    onError: () => {
      toast.error("Failed to submit order!");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    orderMutation.mutate(formData);
  };

  const getStatusClasses = (status) => {
    switch (status) {
      case "Completed":
        return "!bg-green-700 !text-white";
      case "Pending":
        return "!bg-orange-500 !text-white";
      case "Cancelled":
        return "!bg-red-700 !text-white";
      default:
        return "";
    }
  };

  return (
    <Paper
      elevation={10}
      className="max-w-lg w-full p-10 rounded-7xl bg-gradient-to-b from-yellow-50 via-orange-50 to-red-50 shadow-2xl hover:scale-105 transition-transform duration-500"
    >
      <Typography variant="h5" className="text-center font-extrabold text-[#9a4c4c] pb-8 text-3xl md:text-4xl">
        Place Your Order: {food?.name} of Only Rs. {food?.price}
      </Typography>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Line 1: Customer Name + Table Number */}
        <Box className="flex gap-4">
          <TextField fullWidth label="Customer Name" name="custname" size="small" value={formData.custname} onChange={handleChange} required />
          <TextField fullWidth label="Table Number" name="table" size="small" type="number" value={formData.table} onChange={handleChange} required />
        </Box>

        {/* Line 2: Quantity + Status */}
        <Box className="flex gap-4">
          <TextField fullWidth label="Quantity" name="quantity" type="number" size="small" value={formData.quantity} onChange={handleChange} inputProps={{ min: 1 }} required />
          <Select fullWidth name="status" value={formData.status} onChange={handleChange} size="small" className={`!rounded-lg !font-semibold ${getStatusClasses(formData.status)}`}>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
            <MenuItem value="Cancelled">Cancelled</MenuItem>
          </Select>
        </Box>

        {/* Buttons */}
        <Box className="flex justify-center mt-4 gap-4">
          <Button type="button" variant="contained" color="error" onClick={onClose}>Cancel Order</Button>
          <Button type="submit" variant="contained" sx={{ backgroundColor: "#5fb298", "&:hover": { backgroundColor: "#499984" } }}>Confirm Order</Button>
        </Box>
      </form>
    </Paper>
  );
};

export default Order;
