import api from "./axiosInstance";

export interface Item {
  id: number;
  userId: number;
  title: string;
  description: string;
}

export const getItems = async (): Promise<Item[]> => {
  const response = await api.get("/items");
  return response.data;
};

export const createItem = async (
  title: string,
  description: string,
): Promise<Item> => {
  const response = await api.post("/items", { title, description });
  return response.data;
};

export const updateItem = async (
  id: number,
  title: string,
  description: string,
): Promise<Item> => {
  const response = await api.put(`/items/${id}`, { title, description });
  return response.data;
};

export const deleteItem = async (id: number): Promise<void> => {
  await api.delete(`/items/${id}`);
};
