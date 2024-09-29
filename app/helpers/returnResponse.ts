import { NextResponse as nextResponse } from "next/server";

export function returnResponse({
  statusCode,
  message,
  response,
}: {
  statusCode: number;
  message: string;
  response: unknown;
}) {
  return nextResponse.json({ message, response }, { status: statusCode });
}
