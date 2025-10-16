// Mock MIME functions
export function getMimeType(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase();
  const mimeTypes: Record<string, string> = {
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'gif': 'image/gif',
    'pdf': 'application/pdf',
    'txt': 'text/plain',
    'doc': 'application/msword',
    'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  };
  return mimeTypes[ext || ''] || 'application/octet-stream';
}

export function isImageMimeType(mimeType: string): boolean {
  return mimeType.startsWith('image/');
}

export function isPdfMimeType(mimeType: string): boolean {
  return mimeType === 'application/pdf';
}

export function getFileType(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase();
  const fileTypes: Record<string, string> = {
    'jpg': 'image',
    'jpeg': 'image',
    'png': 'image',
    'gif': 'image',
    'pdf': 'document',
    'txt': 'document',
    'doc': 'document',
    'docx': 'document',
  };
  return fileTypes[ext || ''] || 'unknown';
}
