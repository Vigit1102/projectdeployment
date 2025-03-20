import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../Redux/axiosInastance";
import { UpdateUser } from "../Models/User";



export const fetchUser = createAsyncThunk('getUsers', async () => {
  const response = await axiosInstance.get('/user');
  
  return response.data;
});
export const createUser = createAsyncThunk('createUser', async (data) => {
  try {
    const user = await axiosInstance.post('/user', data);
    console.log("Create Data", user.data);
    return user.data;
  } catch (error) {
    return Promise.reject(error);
  }
})
export const deleteUser = createAsyncThunk('deleteUser', async (id:number) => {
  try {
    const user = await axiosInstance.delete(`/user/${id}`);
    return user.data;
  } catch (error) {
    return Promise.reject(error);
  }
})
export const updateUser = createAsyncThunk('updateUser',  async ({ id, update }: UpdateUser)  => {
  try {
    const user = await axiosInstance.put(`/user/${id}`, update);
    console.log("Update Data", user.data);
    return user.data;
  } catch (error) {
    return Promise.reject(error);
  }
})