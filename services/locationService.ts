import api from "@/config/api";
import { State, LGA } from "@/types/location";

export const listStates = async (): Promise<State[]> => {
  const response = await api.get("/states");
  return response.data;
};

export const listLgas = async (state_id: number): Promise<LGA[]> => {
  const response = await api.get(`/lgas/${state_id}`);
  return response.data;
};

export const getState = async (id: number): Promise<State> => {
  const response = await api.get(`/states/${id}`);
  return response.data;
};

export const getLga = async (id: number): Promise<LGA> => {
  const response = await api.get(`/lgas/lga/${id}`);
  return response.data;
};

export const searchLocations = async (query: string): Promise<(State | LGA)[]> => {
  const response = await api.get(`/search?q=${query}`);
  return response.data;
};

export const listAllLgas = async (): Promise<LGA[]> => {
  const response = await api.get("/lgas");
  return response.data;
};

export const listStatesWithLgas = async (): Promise<State[]> => {
  const response = await api.get("/states-with-lgas");
  return response.data;
};
