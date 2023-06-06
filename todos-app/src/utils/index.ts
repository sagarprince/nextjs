import { toast } from "@/components/Toaster";

export function generateGUID(): any {
    return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
}

export function classNames(...args: any[]) {
    return args.filter(Boolean).join(' ')
}

export function showSuccessToast(message: string) {
    console.log(message);
    toast.success(message);
}

export function showErrorToast(message: string) {
    toast.error(message);
}