import { S3Client } from '@aws-sdk/client-s3'

export const getS3Client = () => {
  let s3ClientInstance

  if (!s3ClientInstance) {
    s3ClientInstance = new S3Client({
      endpoint: import.meta.env.VITE_S3_ENDPOINT,
      region: 'us-west-004',
    })
  }

  return s3ClientInstance
}
