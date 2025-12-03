import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  Box,
  Button,
} from "@mui/material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getOrders, updateOrderStatus } from "../../api/orderApi";

export default function Orders() {
  const queryClient = useQueryClient();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10); // default 10

  // Fetch orders
  const { data: orders, isLoading, error } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });

  // Mutation to update order status
  const statusMutation = useMutation({
    mutationFn: ({ orderId, status }) => updateOrderStatus(orderId, status),
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]);
    },
  });

  const handleStatusChange = (orderId, newStatus) => {
    statusMutation.mutate({ orderId, status: newStatus });
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

  if (isLoading) return <p>Loading orders...</p>;
  if (error) return <p>Error loading orders</p>;

  // Sort orders by createdAt (latest first)
  const sortedOrders = [...orders].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  // Pagination logic
  const totalPages = Math.ceil(sortedOrders.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedOrders = sortedOrders.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-yellow-100 via-orange-100 to-red-100 px-6">
      <Card className="w-full max-w-6xl shadow-2xl rounded-3xl bg-gradient-to-br from-white via-orange-50 to-yellow-50">
        <CardContent className="p-8">
          {/* Title */}
          <Typography
            variant="h4"
            className="text-center font-extrabold text-gray-700 pb-8 pt-4"
          >
            📋 Orders List
          </Typography>

          {/* Table */}
          <TableContainer component={Paper} className="rounded-2xl shadow-lg">
            <Table>
              <TableHead>
                <TableRow className="bg-orange-100">
                  <TableCell className="font-bold text-gray-700">S.No</TableCell>
                  <TableCell className="font-bold text-gray-700">Customer Name</TableCell>
                  <TableCell className="font-bold text-gray-700">Table No.</TableCell>
                  <TableCell className="font-bold text-gray-700">Items</TableCell>
                  <TableCell className="font-bold text-gray-700">Quantity</TableCell>
                  <TableCell className="font-bold text-gray-700">Price</TableCell>
                  <TableCell className="font-bold text-gray-700">Time</TableCell>
                  <TableCell className="font-bold text-gray-700">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedOrders.map((order, index) => (
                  <TableRow key={order._id} className="hover:bg-orange-50 transition-all">
                    {/* <TableCell>{order.orderId || order._id}</TableCell> */}
                    <TableCell>{(currentPage - 1) * rowsPerPage + index + 1}</TableCell>
                    <TableCell>{order.custname}</TableCell>
                    <TableCell>{order.table}</TableCell>
                    <TableCell>{order.foodname}</TableCell>
                    <TableCell>{order.quantity}</TableCell>
                    <TableCell>Rs. {order.price * order.quantity}</TableCell>
                    <TableCell>{new Date(order.createdAt).toLocaleString()}</TableCell>
                    <TableCell>
                      <Select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        size="small"
                        className={`!rounded-lg !font-semibold ${getStatusClasses(order.status)}`}
                      >
                        <MenuItem value="Pending">Pending</MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>
                        <MenuItem value="Cancelled">Cancelled</MenuItem>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination controls below the table */}
          <Box className="flex justify-between items-center mt-4">
            <Box>
              <Typography component="span" className="mr-2 font-semibold">
                Rows per page:
              </Typography>
              <Select
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value));
                  setCurrentPage(1); // reset to first page
                }}
                size="small"
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={100}>100</MenuItem>
              </Select>
            </Box>

            <Box>
              <Button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <Typography component="span" className="mx-2">
                {currentPage} / {totalPages}
              </Typography>
              <Button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
}
