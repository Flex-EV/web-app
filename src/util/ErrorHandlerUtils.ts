import axios from 'axios';

interface ApiError {
  errors: { errorCode: string }[];
}

export const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const apiError = error.response?.data as ApiError;
    if (apiError?.errors?.length > 0) {
      return `Error Code: ${apiError.errors[0].errorCode}`;
    }
    return 'An unexpected error occurred.';
  }
  return 'An unexpected error occurred.';
};
