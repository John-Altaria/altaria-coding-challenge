import axios, { AxiosError } from "axios";
import { returnResponse } from "@/helpers/returnResponse";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const queryParams = Object.fromEntries(searchParams.entries());
    const coord = queryParams.coord;

    const response = await axios.get(
      `${process.env.BASE_API!}/event?coord=${coord}`,
      {
        headers: {
          "x-api-key": process.env.X_API_KEY!,
          Authorization: request.headers.get("Authorization") || "",
        },
      }
    );

    return returnResponse({
      message: "Events fetched successfully!",
      response: await response.data,
      statusCode: 200,
    });
  } catch (e) {
    const response = (e as AxiosError<{ message: string }>).response;
    return returnResponse({
      message: response?.data?.message || "An error occurred!",
      response: response?.status,
      statusCode: response?.status || 400,
    });
  }
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const response = await axios.post(
      `${process.env.BASE_API!}/event`,
      payload,
      {
        headers: {
          "x-api-key": process.env.X_API_KEY!,
          Authorization: request.headers.get("Authorization") || "",
        },
      }
    );

    return returnResponse({
      message: "Event added successfully!",
      response: await response.data,
      statusCode: 201,
    });
  } catch (e) {
    const response = (e as AxiosError<{ message: string }>).response;
    return returnResponse({
      message: response?.data?.message || "An error occurred!",
      response: response?.status,
      statusCode: response?.status || 400,
    });
  }
}
