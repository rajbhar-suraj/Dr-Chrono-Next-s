import axios from "axios";

const CERBO_BASE_URL = "https://sandbox.md-hq.com/api/v1";
const CERBO_USERNAME = process.env.CERBO_USERNAME!;
const CERBO_PASSWORD = process.env.CERBO_PASSWORD!;

export async function handleCerboRequest(
  method: "GET" | "POST" | "PUT" | "DELETE",
  resource: string,
  data?: any,
  params?: any
) {
  try {
    const response = await axios({
      method,
      url: `${CERBO_BASE_URL}/${resource}`,
      auth: {
        username: CERBO_USERNAME,
        password: CERBO_PASSWORD,
      },
      data,
      params,
    });
    return response.data;
  } catch (err: any) {
    console.error(err.response?.data || err.message);
    throw err;
  }
}
