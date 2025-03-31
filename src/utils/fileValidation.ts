
/**
 * Validates if the file is a PDF
 * @param file File to validate
 * @returns Boolean indicating if file is valid
 */
export const isPdfFile = (file: File): boolean => {
  return file.type === 'application/pdf';
};

/**
 * Validates file size (max 10MB)
 * @param file File to validate
 * @returns Boolean indicating if file size is valid
 */
export const isValidFileSize = (file: File): boolean => {
  const maxSizeInBytes = 10 * 1024 * 1024; // 10MB
  return file.size <= maxSizeInBytes;
};

/**
 * Validates if a file is a valid PDF and within size limits
 * @param file File to validate
 * @returns Object containing validation result and error message
 */
export const validateFile = (file: File | null): { 
  isValid: boolean; 
  errorMessage: string | null;
} => {
  if (!file) {
    return { isValid: false, errorMessage: 'No file selected' };
  }

  if (!isPdfFile(file)) {
    return { isValid: false, errorMessage: 'Only PDF files are allowed' };
  }

  if (!isValidFileSize(file)) {
    return { isValid: false, errorMessage: 'File size exceeds 10MB limit' };
  }

  return { isValid: true, errorMessage: null };
};
