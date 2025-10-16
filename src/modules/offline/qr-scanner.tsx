'use client';

import React from 'react';

interface QRScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScan: (result: string) => void;
  supportedFormats?: string[];
}

export function QRScannerModal({ isOpen, onClose, onScan }: QRScannerModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h2 className="text-xl font-semibold mb-4">QR Scanner</h2>
        <p className="text-gray-600 mb-4">QR Scanner is temporarily disabled for deployment.</p>
        <button
          onClick={onClose}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
}