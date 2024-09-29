import axios, { AxiosError } from "axios";
import { NextRequest } from "next/server";
import { returnResponse } from "@/helpers/returnResponse";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("login data:", body);
    const response = await axios.post(
      process.env.BASE_API! + "/auth",
      { ...body },
      {
        headers: {
          "x-api-key": process.env.X_API_KEY!,
        },
      }
    );

    return returnResponse({
      message: "User logged in successfully!",
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
