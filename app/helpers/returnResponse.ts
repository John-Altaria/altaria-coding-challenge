import { NextResponse as nextResponse } from "next/server";

export function returnResponse({
  NextResponse,
  statusCode,
  message,
  response,
}: {
  NextResponse: typeof nextResponse;
  statusCode: number;
  message: string;
  response: unknown;
}) {
  return NextResponse.json({ message, response }, { status: statusCode });
}
