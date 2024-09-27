import axios, { AxiosError } from "axios";
// import { verifyToken } from "@/helpers/jwtSecretGenerator";
import { NextRequest, NextResponse } from "next/server";
import { returnResponse } from "@/helpers/returnResponse";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("signup data:", body);
    // if (verifyToken(body.ssh as string)) {
    const response = await axios.post(
      process.env.BASE_API! + "/auth/signup",
      { ...body },
      {
        headers: {
          "x-api-key": process.env.X_API_KEY!,
        },
      }
    );

    return returnResponse({
      NextResponse,
      message: "User signed up successfully!",
      response: await response.data,
      statusCode: 201,
    });
    // } else {
    //   return returnResponse({
    //     NextResponse,
    //     message: 'Invalid token!',
    //     response: null,
    //     statusCode: 401,
    //   });
    // }
  } catch (e) {
    const response = (e as AxiosError<{ message: string }>).response;
    return returnResponse({
      NextResponse,
      message: response?.data?.message || "An error occurred!",
      response: response?.status,
      statusCode: response?.status || 400,
    });
  }
}
