import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

// =========================
//   ADD food items
// =========================
export const addItem = async ({ data, token }) => {
  const form = new FormData();

  // append fields from data
  form.append("fname", data.fname);
  form.append("category", data.category);
  form.append("price", data.price);
  form.append("ingredients", data.ingredients || "");

  // if image (file) exists
  if (data.image) {
    form.append("image", data.image); // image should be a File object
  }

  const res = await axios.post(`${backendUrl}/items/addItem`, form, {
    headers: {
      Authorization: `Bearer ${token}`, // if you use JWT
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

// =========================
//Fetch all food items
// =========================

  export const getItems = async (token) =>{
    const res = await axios.get(`${backendUrl}/items`,{
      headers:{
        Authorization:`Bearer ${token}`,
      },
    });
    return res.data;
  }

// =========================
// FETCH SINGLE ITEM BY ID
// =========================
export const getItemById = async (id, token) => {
  if (!id) throw new Error("Item ID is required");
  const res = await axios.get(`${backendUrl}/items/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      
    },
  });
  return res.data;
};

// =========================
// UPDATE ITEM
// =========================
export const updateItem = async ({ id, data, token }) => {
  if (!id) throw new Error("Item ID is required");

  const form = new FormData();
  form.append("fname", data.fname);
  form.append("category", data.category);
  form.append("price", data.price);
  form.append("ingredients", data.ingredients || "");

  // handle image
  if (data.image instanceof File) {
    form.append("image", data.image);          // new file uploaded
  } else if (data.image) {
    form.append("existingImage", data.image);  // keep old image
  }

  const res = await axios.put(`${backendUrl}/items/updateItem/${id}`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};


// =========================
// DELETE item
// =========================

export const deleteItem = async ({ id, token }) => {
  const res = await axios.delete(`${backendUrl}/items/deleteItem/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
