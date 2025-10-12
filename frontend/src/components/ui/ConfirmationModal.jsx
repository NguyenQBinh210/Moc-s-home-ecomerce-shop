import React from 'react';
import Button from './Button';

const ConfirmationModal = ({ 
  isOpen, 
  title, 
  message, 
  onConfirm, 
  onCancel, 
  confirmText = "Xóa",
  cancelText = "Hủy",
  isLoading = false,
  confirmButtonClass = "bg-red-600 hover:bg-red-700 text-white"
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 border border-gray-300 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {title}
        </h3>
        <p className="text-gray-600 mb-6">
          {message}
        </p>
        <div className="flex space-x-4">
          <Button
            onClick={onConfirm}
            disabled={isLoading}
            className={confirmButtonClass}
          >
            {isLoading ? "Đang xử lý..." : confirmText}
          </Button>
          <Button
            onClick={onCancel}
            variant="outline"
            disabled={isLoading}
          >
            {cancelText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
