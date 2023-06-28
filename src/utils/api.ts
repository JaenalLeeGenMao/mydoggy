import axios, { RawAxiosRequestHeaders } from "axios";

export type JsonStructure = {
  headers?: RawAxiosRequestHeaders;
  [key: string]: unknown;
};

const getHeader = () => {
  return {
    "Content-Type": "application/json",
    "x-api-key": import.meta.env.VITE_DOG_API_KEY,
  };
};

const newAbortSignal = (timeoutMs?: number) => {
  const abortController = new AbortController();
  setTimeout(() => abortController.abort(), timeoutMs || 0);

  return abortController.signal;
};

const generateAxiosInstance = () =>
  axios.create({
    baseURL: `${import.meta.env.VITE_DOG_API_URL}`,
    signal: newAbortSignal(
      import.meta.env.VITE_BASE_REQUEST_TIMEOUT_VALUE || 10000
    ),
  });

export const getApi = async (endpoint: string, options: JsonStructure = {}) => {
  const axiosInstance = generateAxiosInstance();
  return axiosInstance({
    method: "get",
    url: `${endpoint}`,
    headers: { ...(await getHeader()), ...(options?.headers ?? {}) },
  });
};

export const postApi = async (
  endpoint: string,
  body: JsonStructure | FormData | JsonStructure[],
  options: JsonStructure = {}
) => {
  const axiosInstance = generateAxiosInstance();
  return axiosInstance({
    method: "post",
    url: `${endpoint}`,
    headers: { ...(await getHeader()), ...(options?.headers ?? {}) },
    data: body,
  });
};

export const patchApi = async (
  endpoint: string,
  body: JsonStructure | FormData | JsonStructure[],
  options: JsonStructure = {}
) => {
  const axiosInstance = generateAxiosInstance();
  return axiosInstance({
    method: "patch",
    url: `${endpoint}`,
    headers: { ...(await getHeader()), ...(options?.headers ?? {}) },
    data: body,
  });
};

export const putApi = async (
  endpoint: string,
  body: JsonStructure | FormData | JsonStructure[],
  options: JsonStructure = {}
) => {
  const axiosInstance = generateAxiosInstance();
  return axiosInstance({
    method: "put",
    url: `${endpoint}`,
    headers: { ...(await getHeader()), ...(options?.headers ?? {}) },
    data: body,
  });
};

export const deleteApi = async (
  endpoint: string,
  body?: JsonStructure | FormData | JsonStructure[],
  options: JsonStructure = {}
) => {
  const axiosInstance = generateAxiosInstance();
  return axiosInstance({
    method: "delete",
    url: `${endpoint}`,
    headers: { ...(await getHeader()), ...(options?.headers ?? {}) },
    data: body,
  });
};
