import { AxiosResponse } from "axios";
import { getApi } from "utils/api";
import { stringify } from "utils/querystring";

export type ImageSizes = "thumb" | "small" | "med" | "full";

interface SearchDogProps {
  q?: string;
  page?: number;
  limit?: number;
}

interface AnimalMeasurement {
  imperial: string;
  metric: string;
}

export interface Dog {
  id: string;
  name: string;
  life_span: string;
  height: AnimalMeasurement;
  weight: AnimalMeasurement;
  reference_image_id: string;
  temperament: string;
  bred_for: string;
  breed_group: string;
}

export interface AnimalImage {
  id: string;
  url: string;
  width: number;
  height: number;
  breeds: Dog[];
}

export const searchDogByBreed = ({
  q = "",
  page = 0,
  limit = 10,
}: SearchDogProps): Promise<AxiosResponse<Dog[]>> => {
  return getApi(`/v1/breeds?${stringify({ q, page, limit })}`);
};

interface GetImageByIdProps {
  id?: string;
  size?: ImageSizes;
}

export const getImageById = ({
  id = "",
  size = "full",
}: GetImageByIdProps): Promise<AxiosResponse<AnimalImage>> => {
  return getApi(`/v1/images/${id}?${stringify({ size })}`);
};
