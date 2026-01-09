import React, { useMemo, useState } from "react";
import "./Input.css";

type InputType = "text" | "password" | "number";

export type InputProps = {
  type?: InputType;
  placeholder?: string;
  clearable?: boolean;
  onChange?: (value: string) => void;
};

function EyeIcon({ open }: { open: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      {open ? (
        <>
          <path
            d="M12 5c-7 0-10 7-10 7s3 7 10 7 10-7 10-7-3-7-10-7Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="2" />
        </>
      ) : (
        <>
          <path
            d="M2 12s3-7 10-7c2.4 0 4.4.8 6 1.9M22 12s-3 7-10 7c-2.2 0-4.1-.6-5.7-1.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M4 4l16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </>
      )}
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
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

export const Input: React.FC<InputProps> = ({
  type = "text",
  placeholder,
  clearable = false,
  onChange,
}) => {
  const [value, setValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const actualType = useMemo(() => {
    if (type !== "password") return type;
    return showPassword ? "text" : "password";
  }, [type, showPassword]);

  const canClear = clearable && value.length > 0;
  const canTogglePassword = type === "password";

  function setVal(next: string) {
    setValue(next);
    onChange?.(next);
  }

  return (
    <div className="inp-root">
      <div className="inp-wrap">
        <input
          className="inp"
          type={actualType}
          placeholder={placeholder}
          value={value}
          onChange={(e) => setVal(e.target.value)}
        />

        <div className="inp-actions">
          {canTogglePassword && (
            <button
              type="button"
              className="inp-btn"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((s) => !s)}
            >
              <EyeIcon open={showPassword} />
            </button>
          )}

          {canClear && (
            <button
              type="button"
              className="inp-btn"
              aria-label="Clear input"
              onClick={() => setVal("")}
            >
              <XIcon />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
