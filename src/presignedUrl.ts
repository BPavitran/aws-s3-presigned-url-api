import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from "uuid";

const s3 = new S3Client({
  region: process.env.REGION,
});

export const generateUrls = async (
  fileName: string,
  contentType: string
) => {
  if (!fileName || !contentType) {
    throw new Error("fileName and contentType required");
  }

  const key = `uploads/${uuidv4()}-${fileName}`;

  const uploadCommand = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: key,
    ContentType: contentType,
  });

  const downloadCommand = new GetObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: key,
  });

  const uploadUrl = await getSignedUrl(s3, uploadCommand, {
    expiresIn: 900,
  });

  const downloadUrl = await getSignedUrl(s3, downloadCommand, {
    expiresIn: 900,
  });

  return {
    uploadUrl,
    downloadUrl,
    key,
  };
};