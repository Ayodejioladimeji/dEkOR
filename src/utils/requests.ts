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
    console.log(error?.response?.data);
    // cogoToast.error(error?.response?.data?.message, {
    //   hideAfter: 5,
    // });
  }
};

export const GetRequests = async (url: string, token: string) => {
  try {
    const res: AxiosResponse<any> = await axios.get(BASE_URL + url, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });

    return res;
  } catch (error) {
    console.log(error?.response?.data);
    // cogoToast.error(error?.response?.data?.message, {
    //   hideAfter: 5,
    // });
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
    cogoToast.error(error?.response?.data?.message);
    return error;
  }
};

// ==========DELETE REQUEST=====================
export const DeleteRequest = async (url: string, token?: string) => {
  try {
    const res = await axios.delete(BASE_URL + url, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });

    return res;
  } catch (error: any) {
    cogoToast.error(error?.response?.data?.message);
    // if (error?.response?.status === 401) {
    //   localStorage.clear();
    //   window.location.href = "/auth/login";
    // }
    return error;
  }
};

// ==========PUT REQUEST=====================
export const PutRequest = async (url: string, data?: any, token?: string) => {
  try {
    const res = await axios.put(BASE_URL + url, data, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });

    return res;
  } catch (error: any) {
    cogoToast.error(error?.response?.data?.message);
    // if (error?.response?.status === 401) {
    //   localStorage.clear();
    //   window.location.href = "/auth/login";
    // }
    return error;
  }
};

// ==========PATCH REQUEST=====================
export const PatchRequest = async (url: string, data?: any, token?: string) => {
  try {
    const res = await axios.patch(BASE_URL + url, data, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });

    return res;
  } catch (error: any) {
    cogoToast.error(error?.response?.data?.message);
    // if (error?.response?.status === 401) {
    //   localStorage.clear();
    //   window.location.href = "/auth/login";
    // }
    return error;
  }
};
