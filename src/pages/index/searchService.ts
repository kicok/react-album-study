import axios from "axios";
import type { ResDto } from "./types/card";

const clientId = "qwAyAqPMMbd4ghKqAZTexh1Tr06vAlKG8faelVc_qU0";
const API_URL = `https://api.unsplash.com/search/photos?client_id=${clientId}`;

export async function fetchImages(
  searchValue: string,
  pageValue: number,
  per_page: number
): Promise<ResDto> {
  const res = await axios.get(
    `${API_URL}&query=${searchValue}&page=${pageValue}&per_page=${per_page}`
  );

  return res.data;
}
