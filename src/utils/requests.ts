import axios, { AxiosResponse } from "axios";
import cogoToast from "cogo-toast";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// =================================
export const GetRequest = async (url: string, token?: string) => {
  try {
    const res: AxiosResponse<any> = await axios.get(BASE_URL + url, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res;
  } catch (error) {
    cogoToast.error("Something went wrong", { hideAfter: 5 });
  }
};
