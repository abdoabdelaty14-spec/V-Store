import API from "./api";

export const getProducts = async (limit = 12, skip = 0) => {
  const response = await API.get(
    `/products?limit=${limit}&skip=${skip}`
  );

  return response.data;
};

export const getCategories = async () => {
  const response = await API.get("/products/categories");

  return response.data;
};

export const getSingleProduct = async (id) => {
  const response = await API.get(`/products/${id}`);

  return response.data;
};

export const getProductsByCategory = async (category) => {
  const response = await API.get(
    `/products/category/${category}`
  );

  return response.data.products;
};