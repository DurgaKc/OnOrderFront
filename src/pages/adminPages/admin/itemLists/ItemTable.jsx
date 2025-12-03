import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  CircularProgress,
  Dialog,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getItems } from "../../../../api/ItemsApi";
import EditItems from "./EditItems";
import DeleteItems from "./DeleteItems";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function ItemTable() {
   const [id, setId] = useState(0);
   const [openEditDialog, setOpenEditDialog] = useState(false);
   const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

   // for edit dialog
  const handleOpenEditDialog = (id) => {
    setId(id);
    setOpenEditDialog(true);
  };
  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };
  //for delete dialog
  const handleOpenDeleteDialog = (id) => {
    setId(id);
    setOpenDeleteDialog(true);
  };
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  }
  const { category } = useParams(); // URL param
  const token = localStorage.getItem("token"); // get token

  // React Query fetch
  const {
    data: items = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["items", category], // cache by category
    queryFn: async () => {
      const allItems = await getItems(token);
      return allItems.filter(
        (item) => item.category.toLowerCase() === category.toLowerCase()
      );
    },
    enabled: !!category, // only run if category exists
  });

  return (
    <div className="space-y-4 px-25 pt-6">
      <Typography
        variant="h5"
        className="font-bold text-gray-800 text-center py-7"
      >
        {category?.charAt(0).toUpperCase() + category?.slice(1)} List
      </Typography>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <CircularProgress />
        </div>
      ) : isError ? (
        <Typography color="error" className="text-center py-6">
          Failed to load items. Please try again.
        </Typography>
      ) : (
        <TableContainer component={Paper} className="shadow-lg rounded-xl">
          <Table>
            <TableHead className="bg-gray-100">
              <TableRow>
                <TableCell className="font-bold text-lg">Picture</TableCell>
                <TableCell className="font-bold text-lg">Name</TableCell>
                <TableCell className="font-bold text-lg">
                  Main Ingredients
                </TableCell>
                <TableCell className="font-bold text-lg">Price (Rs)</TableCell>
                <TableCell className="font-bold text-lg">Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {items.length > 0 ? (
                items.map((item) => (
                  <TableRow key={item._id} className="hover:bg-gray-50">
                    <TableCell>
                      <img
                        src={`${backendUrl}/images/${item.image}`}
                        alt={item.fname}
                        className="w-20 h-16 rounded-md object-cover"
                      />
                    </TableCell>
                    <TableCell className="font-semibold">{item.fname}</TableCell>
                    <TableCell>{item.ingredients}</TableCell>
                    <TableCell className="font-medium">
                      Rs {item.price}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <IconButton color="primary" size="small"
                        onClick={()=>handleOpenEditDialog(item._id)}
                        >
                          <Edit />
                          
                        </IconButton>
                        <IconButton color="error" size="small"
                         onClick={()=>handleOpenDeleteDialog(item._id)}>
                          <Delete />
                        
                        </IconButton>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6">
                    No items found for this category.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {/* Edit dialog */}
      <Dialog
      open={openEditDialog}
      onClose={handleCloseEditDialog}
      maxWidth="md"
      >
       <EditItems
       id={id}
        onClose={handleCloseEditDialog}
       />
      </Dialog>
      {/* Delete dialog */}
      <Dialog
      open={openDeleteDialog}
      onClose={handleCloseDeleteDialog}
      maxWidth="md"
      >
    <DeleteItems
    id={id}
    onClose={handleCloseDeleteDialog}
    />
      </Dialog>
    </div>
  );
}
