import React, { useCallback, useMemo, useRef, useState } from "react";
import { ToastContext, type ToastData, type ToastInternal, type ToastContextValue } from "./toastContext";

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastInternal[]>([]);
  const timers = useRef(new Map<string, number>());

  const close = useCallback((id: string) => {
    setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, state: "closing" } : t)));

    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
      const tm = timers.current.get(id);
      if (tm) window.clearTimeout(tm);
      timers.current.delete(id);
    }, 220);
  }, []);

  const push = useCallback(
    (t: Omit<ToastData, "id">) => {
      const id = crypto.randomUUID?.() ?? String(Math.random());
      const next: ToastInternal = { ...t, id, state: "open" };
      setToasts((prev) => [next, ...prev].slice(0, 5)); // limit

      const tm = window.setTimeout(() => close(id), t.durationMs);
      timers.current.set(id, tm);

      return id;
    },
    [close]
  );

  const clear = useCallback(() => {
    setToasts([]);
    timers.current.forEach((tm) => window.clearTimeout(tm));
    timers.current.clear();
  }, []);

  const value: ToastContextValue = useMemo(
    () => ({ toasts, push, close, clear }),
    [toasts, push, close, clear]
  );

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}
