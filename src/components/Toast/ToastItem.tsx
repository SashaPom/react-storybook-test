import React from "react";
import type { ToastInternal } from "./toastContext";
import "./Toast.css";

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M6 6l12 12M18 6L6 18"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ToastItem({
                            toast,
                            onClose,
                          }: {
  toast: ToastInternal;
  onClose: () => void;
}) {
  return (
    <div className="toast" data-type={toast.type} data-state={toast.state} role="status" aria-live="polite">
      <div className="toast-head">
        <div className="toast-title">{toast.title}</div>
        {toast.closable && (
          <button className="toast-close" onClick={onClose} aria-label="Close toast">
            <CloseIcon />
          </button>
        )}
      </div>
      {toast.message && <div className="toast-msg">{toast.message}</div>}
    </div>
  );
}
