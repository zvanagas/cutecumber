import { toastShowTime } from '@/constants/toast-show-time';
import { useState } from 'react';

export const useToast = () => {
  const [isShown, setIsShown] = useState(false);
  const [message, setMessage] = useState('');

  const show = (data: string) => {
    setIsShown(true);
    setMessage(data);
    setTimeout(() => setIsShown(false), toastShowTime);
  };

  const ToastContainer = () =>
    isShown && (
      <div className="absolute bottom-0 dark:text-white dark:border-t-white border-t dark:bg-slate-800 p-1 w-full text-center">
        {message}
      </div>
    );
  return { show, ToastContainer };
};
