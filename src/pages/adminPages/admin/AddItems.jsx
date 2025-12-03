import React, { useState } from "react";
import {
  TextField,
  MenuItem,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { addItem } from "../../../api/ItemsApi";
import toast from "react-hot-toast";

const AddItems = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    fname: "",
    category: "",
    price: "",
    image: null,
    ingredients: "",
  });

  // mutation for adding item
  const mutation = useMutation({
    mutationFn: (payload) => addItem(payload),
    onSuccess: (_, variables) => {
      toast.success("Food item added successfully!");

      // ✅ Redirect to that category page
      const selectedCategory = variables.data.category.toLowerCase();
      navigate(`/admin/item-lists/${selectedCategory}`);

      // reset form
      setFormData({
        fname: "",
        category: "",
        price: "",
        image: null,
        ingredients: "",
      });
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Error adding item");
    },
  });

  const categories = ["Beverage", "Appetizer", "Dessert"];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ data: formData, token });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-yellow-100 via-orange-100 to-red-100 px-6">
      <Card className="w-full max-w-xl shadow-2xl rounded-3xl bg-gradient-to-br from-white via-orange-50 to-yellow-50">
        <CardContent className="p-8">
          <Typography
            variant="h4"
            className="text-center font-extrabold text-gray-600 py-8"
          >
            🍽️ Add Food Item
          </Typography>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Row 1: Food Name + Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Food Name */}
              <div className="relative">
                <input
                  type="text"
                  name="fname"
                  value={formData.fname}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all peer"
                  placeholder=" "
                />
                <label className="absolute left-4 top-3 px-1 text-gray-500 transition-all duration-200 transform -translate-y-6 scale-75 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 bg-white pointer-events-none">
                  Food Name *
                </label>
              </div>

              {/* Category */}
              <div className="relative">
                <select
                  name="category"
                  value={formData.category || ""}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none peer"
                >
                  <option value="" disabled hidden></option>
                  {categories.map((cat, i) => (
                    <option key={i} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <label className="absolute left-4 top-3 px-1 text-gray-500 transition-all duration-200 transform -translate-y-6 scale-75 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 bg-white pointer-events-none">
                  Category *
                </label>
                {/* Dropdown arrow */}
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Row 2: Price + Image */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Price */}
              <div className="relative">
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all peer appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  placeholder=" "
                />
                <label className="absolute left-4 top-3 px-1 text-gray-500 transition-all duration-200 transform -translate-y-6 scale-75 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 bg-white pointer-events-none">
                  Price (Rs.) *
                </label>
              </div>

              {/* Image Upload */}
              <div className="relative">
                <div className="relative">
                  <input
                    type="file"
                    name="image"
                    onChange={handleChange}
                    accept="image/*"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
                  />
                  <label className="absolute left-4 top-3 px-1 text-gray-500 transition-all duration-200 transform -translate-y-6 scale-75 bg-white pointer-events-none">
                    Upload Image
                  </label>
                </div>
              </div>
            </div>

            {/* Row 3: Ingredients */}
            <div className="relative">
              <textarea
                name="ingredients"
                value={formData.ingredients}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all peer resize-none"
                placeholder=" "
              />
              <label className="absolute left-4 top-3 px-1 text-gray-500 transition-all duration-200 transform -translate-y-6 scale-75 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 bg-white pointer-events-none">
                Main Ingredients *
              </label>
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <button
                type="button"
                onClick={() => navigate("/admin")}
                className="w-full px-4 py-3 border-2 border-red-400 text-red-500 rounded-xl text-lg font-semibold hover:bg-red-50 transition-colors duration-200"
              >
                ✖ Cancel
              </button>
              <button
                type="submit"
                disabled={mutation.isLoading}
                className="w-full px-4 py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white rounded-xl text-lg font-semibold shadow-md transition-all duration-200"
              >
                {mutation.isLoading ? "Adding..." : "➕ Add Item"}
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddItems;
