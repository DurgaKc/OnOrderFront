import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const addOrder = async ({ custname, table, foodname, price, quantity, status }) => {
  const res = await axios.post(`${backendUrl}/order/addOrder`, {
    custname,
    table,
    foodname,
    price,
    quantity,
    status,
  });
  return res.data;
};

export const getOrders = async () =>{
    const res = await axios.get(`${backendUrl}/order/getOrders`);
    return res.data;
}

export const updateOrderStatus = async (orderId, status) => {
  const res = await axios.put(`${backendUrl}/order/${orderId}/status`, { status });
  return res.data;
};