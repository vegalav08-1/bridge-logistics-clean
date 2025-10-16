// Mock file functions
export function getPresignedGet(bucket: string, key: string): Promise<string> {
  // Mock implementation - returns a fake URL
  return Promise.resolve(`https://mock-s3.amazonaws.com/${bucket}/${key}`);
}

export function createS3Client() {
  return {
    getObject: () => Promise.resolve({}),
    putObject: () => Promise.resolve({}),
    deleteObject: () => Promise.resolve({}),
  };
}

export function deleteObject(bucket: string, key: string): Promise<void> {
  console.log(`Mock delete: ${bucket}/${key}`);
  return Promise.resolve();
}

export function uploadFile(bucket: string, key: string, file: any): Promise<string> {
  console.log(`Mock upload: ${bucket}/${key}`);
  return Promise.resolve(`https://mock-s3.amazonaws.com/${bucket}/${key}`);
}

export function processAttachment(attachmentId: string): Promise<any> {
  console.log(`Mock process attachment: ${attachmentId}`);
  return Promise.resolve({ processed: true });
}

export function updateAttachmentMetadata(attachmentId: string, metadata: any): Promise<any> {
  console.log(`Mock update metadata: ${attachmentId}`);
  return Promise.resolve({ updated: true });
}

export function createProcessingSystemCard(data: any): Promise<any> {
  console.log(`Mock create processing card`);
  return Promise.resolve({ id: `card_${Date.now()}`, ...data });
}
