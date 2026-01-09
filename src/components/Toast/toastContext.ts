import { createContext } from "react";

export type ToastType = "success" | "error" | "warning" | "info";

export type ToastData = {
  id: string;
  title: string;
  message?: string;
  type: ToastType;
  durationMs: number;
  closable?: boolean;
};

export type ToastInternal = ToastData & { state: "open" | "closing" };

export type ToastContextValue = {
  toasts: ToastInternal[];
  push: (t: Omit<ToastData, "id">) => string;
  close: (id: string) => void;
  clear: () => void;
};

export const ToastContext = createContext<ToastContextValue | null>(null);
