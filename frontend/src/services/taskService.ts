import api from "../api/axios";
import type { Task } from "../types/task";

export interface CreateTaskData {
  title: string;
  description?: string;
  status?: string;
  priority?: string;
}

export interface UpdateTaskData {
  title?: string;
  description?: string;
  status?: string;
  priority?: string;
}

export const getTasks = async (params?: {search?: string;status?: string;priority?: string}) => {
  try {
    const response = await api.get<Task[]>("/tasks", {params});
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTask = async (id: string) => {
  try {
    const response = await api.get<Task>(`/tasks/${id}`);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createTask = async (data: CreateTaskData) => {
  try {
    const response = await api.post<Task>("/tasks", data);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateTask = async (id: string, data: UpdateTaskData) => {
  try {
    const response = await api.patch<Task>(`/tasks/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteTask = async (id: string) => {
  try {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
