import React from "react";
import { useToast } from "./useToast";
import { ToastItem } from "./ToastItem";
import "./Toast.css";

export function ToastViewport() {
  const { toasts, close } = useToast();

  return (
    <div className="toast-viewport" aria-label="Notifications">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onClose={() => close(t.id)} />
      ))}
    </div>
  );
}
