import { toast } from 'react-toastify';

export const showToast = (
  type: 'info' | 'success' | 'warning' | 'error',
  message: string
) => {
  toast.dismiss();
  toast[type](message);
};
