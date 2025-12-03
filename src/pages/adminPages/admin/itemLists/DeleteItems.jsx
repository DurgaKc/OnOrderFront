import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, DialogActions, DialogContent, Typography } from "@mui/material";
import { deleteItem } from "../../../../api/ItemsApi";
import toast from "react-hot-toast";

const DeleteItems = ({ id, onClose }) => {
  const queryClient = useQueryClient();

  // Mutation to delete item
  const deleteMutation = useMutation({
    mutationFn: async () => {
      const token = localStorage.getItem("token");
      if (!id) throw new Error("Item ID is required"); // ✅ Ensure ID exists
      return deleteItem({ id, token }); // ✅ Pass object with id and token
    },
    onSuccess: () => {
      // Invalidate queries to refresh the list
      queryClient.invalidateQueries({ queryKey: ["items"] });
      toast.success("Food Item deleted Successfully")
      onClose(); 
    },
    onError: (err) => {
      console.error("Error deleting item:", err);
      alert(err?.response?.data?.message || "Failed to delete item. Please try again.");
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  return (
    <DialogContent sx={{ maxWidth: 600 }}>
      <Typography>
        Are you sure you want to delete this food item? All associated data will also be permanently removed.
      </Typography>

      <DialogActions sx={{ pb: 2, pr: 2 }}>
        <Button variant="outlined" size="small" onClick={onClose}>
          Cancel
        </Button>

        <Button
          variant="outlined"
          size="small"
          sx={{ color: "red", borderColor: "red" }}
          onClick={handleDelete}
          disabled={deleteMutation.isLoading}
        >
          {deleteMutation.isLoading ? "Deleting..." : "Delete"}
        </Button>
      </DialogActions>
    </DialogContent>
  );
};

export default DeleteItems;
