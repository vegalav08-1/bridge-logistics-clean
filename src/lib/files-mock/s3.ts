// Mock S3 functions
export function createS3Client() {
  return {
    getObject: () => Promise.resolve({}),
    putObject: () => Promise.resolve({}),
    deleteObject: () => Promise.resolve({}),
  };
}

export function getPresignedGet(bucket: string, key: string): Promise<string> {
  // Mock implementation - returns a fake URL
  return Promise.resolve(`https://mock-s3.amazonaws.com/${bucket}/${key}`);
}

export function getPresignedPut(bucket: string, key: string): Promise<string> {
  // Mock implementation - returns a fake URL
  return Promise.resolve(`https://mock-s3.amazonaws.com/${bucket}/${key}`);
}

export function generateObjectKey(prefix: string, filename: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2);
  return `${prefix}/${timestamp}-${random}-${filename}`;
}

export function getObjectMetadata(bucket: string, key: string): Promise<any> {
  console.log(`Mock get metadata: ${bucket}/${key}`);
  return Promise.resolve({
    size: 1024,
    contentType: 'application/octet-stream',
    lastModified: new Date().toISOString()
  });
}
