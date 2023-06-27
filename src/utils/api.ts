import axios, { AxiosRequestHeaders } from "axios";

export type JsonStructure = {
  headers?: AxiosRequestHeaders;
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

export const getApi = async (endpoint: string, options: JsonStructure = {}) =>
  axios.get(`${import.meta.env.VITE_DOG_API_URL}${endpoint}`, {
    signal: newAbortSignal(
      import.meta.env.VITE_BASE_REQUEST_TIMEOUT_VALUE || 10000
    ),
    headers: { ...(await getHeader()), ...(options?.headers ?? {}) },
  });

export const postApi = async (
  endpoint: string,
  body: JsonStructure | FormData | JsonStructure[],
  options: JsonStructure = {}
) =>
  axios.post(`${import.meta.env.VITE_DOG_API_URL}${endpoint}`, body, {
    signal: newAbortSignal(
      import.meta.env.VITE_BASE_REQUEST_TIMEOUT_VALUE || 10000
    ),
    headers: { ...(await getHeader()), ...(options?.headers ?? {}) },
  });

export const patchApi = async (
  endpoint: string,
  body: JsonStructure | FormData | JsonStructure[],
  options: JsonStructure = {}
) =>
  axios.patch(`${import.meta.env.VITE_DOG_API_URL}${endpoint}`, body, {
    signal: newAbortSignal(
      import.meta.env.VITE_BASE_REQUEST_TIMEOUT_VALUE || 10000
    ),
    headers: { ...(await getHeader()), ...(options?.headers ?? {}) },
  });

export const putApi = async (
  endpoint: string,
  body: JsonStructure | FormData | JsonStructure[],
  options: JsonStructure = {}
) =>
  axios.put(`${import.meta.env.VITE_DOG_API_URL}${endpoint}`, body, {
    signal: newAbortSignal(
      import.meta.env.VITE_BASE_REQUEST_TIMEOUT_VALUE || 10000
    ),
    headers: { ...(await getHeader()), ...(options?.headers ?? {}) },
  });

export const deleteApi = async (
  endpoint: string,
  body?: JsonStructure | FormData | JsonStructure[],
  options: JsonStructure = {}
) =>
  axios.delete(`${import.meta.env.VITE_DOG_API_URL}${endpoint}`, {
    signal: newAbortSignal(
      import.meta.env.VITE_BASE_REQUEST_TIMEOUT_VALUE || 10000
    ),
    headers: { ...(await getHeader()), ...(options?.headers ?? {}) },
    data: body,
  });
