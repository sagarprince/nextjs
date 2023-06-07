import { toast } from "@/components/Toaster";
import { ExternalToast } from "@/components/Toaster/types";

export function generateGUID(): any {
    return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
}

export function classNames(...args: any[]) {
    return args.filter(Boolean).join(' ')
}

export function dismissToast(toastId?: string | number | undefined) {
  toast.dismiss(toastId);
}

export function showToast(message: string, data?: ExternalToast): string | number {
  toast.dismiss();
  return toast(message, data);
}

export function showSuccessToast(message: string, data?: ExternalToast): string | number {
    return toast.success(message, data);
}

export function showErrorToast(message: string, data?: ExternalToast): string | number {
    return toast.error(message, data);
}

export function debounce(func: Function, delay: number) {
    let timerId: NodeJS.Timeout | null;
  
    return (...args: any[]) => {
      if (timerId) {
        clearTimeout(timerId);
      }
  
      timerId = setTimeout(() => {
        func.apply(null, args);
        timerId = null;
      }, delay);
    };
  }