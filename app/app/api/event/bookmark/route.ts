import { returnResponse } from "@/helpers/returnResponse";
import axios, { AxiosError } from "axios";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const response = await axios.post(
      `${process.env.BASE_API!}/event/bookmark`,
      { eventId: payload.eventId },
      {
        headers: {
          "x-api-key": process.env.X_API_KEY!,
          Authorization: request.headers.get("Authorization") || "",
        },
      }
    );

    return returnResponse({
      message: "Event bookmarked successfully!",
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
