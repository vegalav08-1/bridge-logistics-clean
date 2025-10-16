// Mock QR functions
export function generateShipmentQR(shipmentId: string): string {
  // Mock implementation - returns a fake QR code
  return `QR_CODE_${shipmentId}_${Date.now()}`;
}

export function generateQRCode(data: string): string {
  // Mock implementation - returns a fake QR code
  return `QR_${data}_${Date.now()}`;
}
