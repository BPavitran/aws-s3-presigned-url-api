import { APIGatewayProxyEvent } from "aws-lambda";
import { generateUrls } from "./presignedUrl";
import * as dotenv from "dotenv";
dotenv.config();

export const handler = async (event: APIGatewayProxyEvent) => {
  try {
    const body = event.body ? JSON.parse(event.body) : {};

    const { fileName, contentType } = body;

    const result = await generateUrls(fileName, contentType);

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: error.message,
      }),
    };
  }
};
