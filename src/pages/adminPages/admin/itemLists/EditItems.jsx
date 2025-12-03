import React, { useEffect, useState } from "react";
import {
  TextField,
  MenuItem,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
} from "@mui/material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getItemById, updateItem } from "../../../../api/ItemsApi";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const categories = ["Beverage", "Appetizer", "Dessert"];

const EditItems = ({ id, onClose }) => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    fname: "",
    category: "",
    price: "",
    image: null,
    ingredients: "",
  });

  const [preview, setPreview] = useState(null);

  // Fetch single item by ID
  const { data: oldData, isLoading } = useQuery({
    queryKey: ["item", id],
    queryFn: () => getItemById(id, token),
    enabled: !!id, // only fetch if id exists
  });

  // Prefill form when old data arrives
  useEffect(() => {
    if (oldData) {
      setFormData({
        fname: oldData.fname || "",
        category: oldData.category || "",
        price: oldData.price || "",
        image: oldData.image || null,
        ingredients: oldData.ingredients || "",
      });
      setPreview(oldData.image ? `${backendUrl}/images/${oldData.image}` : null);
    }
  }, [oldData]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files?.length) {
      setFormData({ ...formData, image: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Mutation for updating item
  const updateItemMutation = useMutation({
    mutationFn: (updatedData) => updateItem({ id, data: updatedData, token }),
    onSuccess: () => {
      toast.success("Item updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["items"] }); // refetch all items
      queryClient.invalidateQueries({ queryKey: ["item", id] }); // refetch single item
      onClose();
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to update item");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateItemMutation.mutate(formData);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <CircularProgress />
      </div>
    );
  }

  return (
    <Card className="w-full max-w-xl shadow-2xl rounded-3xl bg-gradient-to-br from-white via-orange-50 to-yellow-50">
      <CardContent className="p-8">
        <Typography
          variant="h4"
          className="text-center font-extrabold text-gray-600 py-8"
        >
          🍽️ Edit Food Item
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
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>

          {/* Price + Image */}
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
              {/* Show old image if no new file selected */}
              {preview && (
                <img
                  src={preview}
                  alt="preview"
                  className="w-20 h-16 rounded-md object-cover mt-2"
                />
              )}
            </Grid>
          </Grid>

          {/* Ingredients */}
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
              onClick={onClose}
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
              disabled={updateItemMutation.isLoading}
              className="!bg-orange-500 hover:!bg-orange-600 text-white py-3 rounded-xl text-lg font-semibold shadow-md"
            >
              {updateItemMutation.isLoading ? "Updating..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default EditItems;
