import axios, { AxiosResponse } from "axios";
import cogoToast from "cogo-toast";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// =================================
export const GetRequest = async (url: string) => {
  try {
    const res: AxiosResponse<any> = await axios.get(BASE_URL + url, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res;
  } catch (error) {
    cogoToast.error("Something went wrong, Please refresh the page", {
      hideAfter: 5,
    });
  }
};

export const PostRequest = async (url: string, data?: any, token?: string) => {
  try {
    const res = await axios.post(
      BASE_URL + url,
      data && data,
      token && {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return res;
  } catch (error) {
    cogoToast.error(error?.response?.data?.err);
    return error;
  }
};
