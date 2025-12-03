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
            <Grid container spacing={2}>
              {/* Food Name */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Food Name"
                  name="fname"
                  size="small"
                  value={formData.fname}
                  onChange={handleChange}
                  variant="outlined"
                  required
                />
              </Grid>

              {/* Category */}
              <Grid item xs={12} md={6}>
                <TextField
                  select
                  fullWidth
                  label="Category"
                  name="category"
                  size="small"
                  value={formData.category || ""}
                  onChange={handleChange}
                  variant="outlined"
                  required
                >
                  <MenuItem value="">
                    <em>Select category</em>
                  </MenuItem>
                  {categories.map((cat, i) => (
                    <MenuItem key={i} value={cat}>
                      {cat}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>

            {/* Row 2: Price + Image */}
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Price (Rs.)"
                  name="price"
                  size="small"
                  value={formData.price}
                  onChange={handleChange}
                  variant="outlined"
                  required
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="file"
                  label="Upload Image"
                  size="small"
                  name="image"
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ accept: "image/*" }}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>

            {/* Row 3: Ingredients */}
            <TextField
              fullWidth
              label="Main Ingredients"
              name="ingredients"
              size="medium"
              value={formData.ingredients}
              onChange={handleChange}
              variant="outlined"
              required
              multiline
              rows={3}
            />

            {/* Buttons */}
            <div className="flex gap-4 mt-3">
              <Button
                onClick={() => navigate("/admin")}
                variant="outlined"
                fullWidth
                className="!border-red-400 !text-red-500 hover:!bg-red-50 py-3 rounded-xl text-lg font-semibold"
              >
                ✖ Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={mutation.isLoading}
                className="!bg-orange-500 hover:!bg-orange-600 text-white py-3 rounded-xl text-lg font-semibold shadow-md"
              >
                {mutation.isLoading ? "Adding..." : "➕ Add Item"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddItems;
